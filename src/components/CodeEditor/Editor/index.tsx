import MonacoEditor, { OnMount } from "@monaco-editor/react";

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
}
    `;

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });
  };

  return (
    <MonacoEditor
      height="100%"
      path={"guang.tsx"}
      language={"typescript"}
      onMount={handleEditorMount}
      value={code}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}
