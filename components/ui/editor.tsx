"use client";

import { useTheme } from "next-themes";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  [key: string]: any; // Accepts all props from Editor
}

export function CodeEditor(props: CodeEditorProps) {
  const { theme } = useTheme();

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    // Fetch the mocha theme
    const response1 = await fetch("/mocha_monaco.json");
    const response2 = await fetch("/latte_monaco.json");
    const mochaTheme = await response1.json();
    const latteTheme = await response2.json();
    // https://vsctim.vercel.app/
    // Define the mocha theme
    monaco.editor.defineTheme("mocha", mochaTheme);

    // Define light theme (keep existing or customize)
    monaco.editor.defineTheme("latte", latteTheme);

    // Set theme based on current theme
    const currentTheme = theme === "dark" ? "mocha" : "latte";
    monaco.editor.setTheme(currentTheme);
  };

  return <Editor onMount={handleEditorDidMount} {...props} />;
}
