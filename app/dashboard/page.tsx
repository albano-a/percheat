"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { tables } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCopy, FaCheck } from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamically import CodeEditor to reduce initial bundle size
const CodeEditor = dynamic(
  () =>
    import("@/components/ui/editor").then((mod) => ({
      default: mod.CodeEditor,
    })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  },
);

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get("id");
  const [snippet, setSnippet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!snippetId) {
        setSnippet(null);
        return;
      }
      setLoading(true);
      try {
        const doc = await tables.getRow({
          databaseId: "codeSnippets",
          tableId: "snippets",
          rowId: snippetId,
        });
        setSnippet(doc);
      } catch (error) {
        console.error("Failed to fetch snippet", error);
        setSnippet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [snippetId]);

  const handleCopy = () => {
    if (!snippet?.content) return;
    navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!snippetId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
        <p className="text-lg">
          Select a snippet from the sidebar to view details.
        </p>
        <p className="text-sm">Or create a new one to get started.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-64" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-7 w-full max-w-md" />
          <div className="flex flex-wrap gap-2 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-100 w-full rounded-lg" />
      </div>
    );
  }

  if (!snippet) {
    return <div className="p-8">Snippet not found.</div>;
  }

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{snippet.title}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 rounded-full border bg-muted font-mono">
              {snippet.language}
            </span>
            {snippet.isPublic && (
              <span className="text-xs px-2 py-1 rounded-full border bg-primary/10 border-primary text-primary font-medium">
                Public
              </span>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-lg">{snippet.description}</p>
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {snippet.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="relative group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 px-3"
            onClick={handleCopy}
          >
            {copied ? (
              <FaCheck className="mr-2 h-3 w-3 text-primary" />
            ) : (
              <FaCopy className="mr-2 h-3 w-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <CodeEditor
          height="500px"
          language={snippet.language.toLowerCase()}
          value={snippet.content}
          options={{
            fontSize: 18,
            minimap: { enabled: false },
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
}
