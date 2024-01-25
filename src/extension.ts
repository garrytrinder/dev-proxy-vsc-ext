import * as vscode from 'vscode';
import parse from 'json-to-ast';
import { pluginDocs, pluginSnippets } from './constants';
import { getASTNode, getRangeFromASTNode, isConfigFile } from './helpers';
import { pluginLensProvider } from './codelens';

export const activate = (context: vscode.ExtensionContext) => {
  const collection = vscode.languages.createDiagnosticCollection('Dev Proxy');

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(document => {
      if (!isConfigFile(document)) {
        return;
      }
      updateDiagnostics(document, collection);
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(event => {
      if (!isConfigFile(event.document)) {
        collection.delete(event.document.uri);
        return;
      }
      updateDiagnostics(event.document, collection);
    })
  );

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      { scheme: 'file', language: 'json' },
      pluginLensProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'dev-proxy-toolkit.openPluginDoc',
      pluginName => {
        const target = vscode.Uri.parse(pluginDocs[pluginName].url);
        vscode.env.openExternal(target);
      }
    )
  );
};

const updateDiagnostics = (
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection
): void => {
  let diagnostics: vscode.Diagnostic[] = [];

  const documentNode = parse(document.getText()) as parse.ObjectNode;

  // check if urlsToWatch is empty
  const urlsToWatchNode = getASTNode(
    documentNode.children,
    'Identifier',
    'urlsToWatch'
  );

  const hasGlobalUrlsToWatch = urlsToWatchNode;
  const isGlobalUrlsToWatchEmpty = hasGlobalUrlsToWatch && (urlsToWatchNode.value as parse.ArrayNode).children.length === 0;

  if (!hasGlobalUrlsToWatch) {
    diagnostics.push(
      new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        'No global urlsToWatch. Use --urls-to-watch option, or add urlsToWatch array to plugins.',
        vscode.DiagnosticSeverity.Information
      )
    );
  }
  if (isGlobalUrlsToWatchEmpty) {
    diagnostics.push(
      new vscode.Diagnostic(
        getRangeFromASTNode(urlsToWatchNode.key),
        'Add at least one global urlToWatch, use --urls-to-watch option, or add urlsToWatch array to plugins.',
        vscode.DiagnosticSeverity.Warning
      )
    );
  }

  // check validity of plugins
  const pluginsNode = getASTNode(
    documentNode.children,
    'Identifier',
    'plugins'
  );
  const pluginNodes = pluginsNode && (pluginsNode.value as parse.ArrayNode)
    .children as parse.ObjectNode[];
  const hasPlugins = pluginsNode;
  const isPluginsEmpty = hasPlugins && (pluginsNode.value as parse.ArrayNode).children.length === 0;

  if (!hasPlugins) {
    diagnostics.push(
      new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        'No plugins. Add at least one plugin.',
        vscode.DiagnosticSeverity.Error
      )
    );
  }

  if (isPluginsEmpty) {
    diagnostics.push(
      new vscode.Diagnostic(
        getRangeFromASTNode(pluginsNode.key),
        'Add at least one plugin',
        vscode.DiagnosticSeverity.Warning
      )
    );
  } else if (pluginNodes) {
    // does the plugin have a config section?
    pluginNodes.forEach((pluginNode: parse.ObjectNode) => {
      const pluginNameNode = getASTNode(
        pluginNode.children,
        'Identifier',
        'name'
      );
      const pluginName = (pluginNameNode?.value as parse.LiteralNode)
        .value as string;
      const enabledNode = getASTNode(
        pluginNode.children,
        'Identifier',
        'enabled'
      );
      const isEnabled = (enabledNode?.value as parse.LiteralNode)
        .value as boolean;
      const pluginSnippet = pluginSnippets[pluginName];
      const requiresConfig = pluginSnippet.config
        ? pluginSnippet.config.required
        : false;

      const configSectionNode = getASTNode(
        pluginNode.children,
        'Identifier',
        'configSection'
      );

      if (configSectionNode) {
        // check to see if the config section is in the document
        const configSectionName = (
          configSectionNode?.value as parse.LiteralNode
        ).value as string;
        const configSection = getASTNode(
          documentNode.children,
          'Identifier',
          configSectionName
        );
        if (!configSection) {
          diagnostics.push(
            new vscode.Diagnostic(
              getRangeFromASTNode(configSectionNode.value),
              `${configSectionName} config section is missing. Use '${pluginSnippet.config?.name}' snippet to create one.`,
              isEnabled
                ? vscode.DiagnosticSeverity.Error
                : vscode.DiagnosticSeverity.Warning
            )
          );
        }
      }

      if (requiresConfig) {
        // check to see if the plugin has a config section        
        if (!configSectionNode) {
          // there is no config section defined on the plugin instance
          diagnostics.push(
            new vscode.Diagnostic(
              getRangeFromASTNode(pluginNode),
              `${pluginName} requires a config section.`,
              isEnabled
                ? vscode.DiagnosticSeverity.Error
                : vscode.DiagnosticSeverity.Warning
            )
          );
        }
      }
    });
  }

  collection.set(document.uri, diagnostics);
};

export const deactivate = () => { };
