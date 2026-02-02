"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ID, tables } from "@/lib/appwrite";
import { useAuth } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SnippetForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "python",
    content: "",
    tags: "",
    isPublic: false,
  });

  const languages = [
    "python",
    "javascript",
    "typescript",
    "java",
    "c",
    "cpp",
    "csharp",
    "go",
    "rust",
    "html",
    "css",
    "sql",
    "json",
    "markdown",
    "text",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      await tables.createRow({
        databaseId: "codeSnippets",
        tableId: "snippets",
        rowId: ID.unique(),
        data: {
          title: formData.title,
          description: formData.description,
          language: formData.language,
          content: formData.content,
          tags: tagsArray,
          isPublic: formData.isPublic,
          userId: user.$id,
        },
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create Snippet</h2>
        <p className="text-muted-foreground">
          Share your knowledge or save it for later.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          required
          placeholder="e.g. Quick Sort Implementation"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="What does this snippet do?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <select
          id="language"
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="bg-background">
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Code Content</Label>
        <Textarea
          id="content"
          required
          placeholder="// Your code here..."
          className="font-mono min-h-50"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          placeholder="algorithm, sorting, helper"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          checked={formData.isPublic}
          onChange={(e) =>
            setFormData({ ...formData, isPublic: e.target.checked })
          }
        />
        <Label htmlFor="isPublic">Make Public</Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Snippet"}
      </Button>
    </form>
  );
}
