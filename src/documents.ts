import * as vscode from 'vscode';
import { isConfigFile, isProxyFile } from './helpers';
import { updateConfigDiagnostics, updateDiagnostics } from './diagnostics';

export const registerDocumentListeners = (context: vscode.ExtensionContext, collection: vscode.DiagnosticCollection) => {
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(document => {
            if (isProxyFile(document)) {
                updateDiagnostics(context, document, collection);
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
            }
            if (!isConfigFile(document)) {
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
                return;
            } else {
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', true);
                updateConfigDiagnostics(context, document, collection);
            }
        })
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            if (!isConfigFile(event.document) || !isProxyFile(event.document)) {
                collection.delete(event.document.uri);
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
                return;
            }
            if (isConfigFile(event.document)) {
                updateConfigDiagnostics(context, event.document, collection);
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', true);
                return;
            }
            if (isProxyFile(event.document)) {
                updateDiagnostics(context, event.document, collection);
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
            }
        })
    );

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(e => {
            if (!e) {
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
                return;
            };
            isConfigFile(e.document) ?
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', true) :
                vscode.commands.executeCommand('setContext', 'isDevProxyConfigFile', false);
        })
    );
};