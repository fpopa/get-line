const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand("fpopa.getLine", addLineIndex);

	function addLineIndex () {
		const editor = vscode.window.activeTextEditor;

		if (! editor) {
			return;
		}

		const selections = editor.selections;

		editor.edit(textEdit => {
			selections.forEach(selection => {
				// will parametrize this function so that the fetched line index ca be 0-indexd
				const lineIndex = String(selection.start.line + 1);

				textEdit.insert(
					new vscode.Position(selection.start.line, 0),
					`${lineIndex}: `
				);
			});
		});
	}

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
