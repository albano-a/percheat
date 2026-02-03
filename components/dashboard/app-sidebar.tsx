"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  FileCode,
  ChevronLeft,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Query } from "appwrite";
import { tables } from "@/lib/appwrite";
import { useAuth } from "@/context/auth-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSnippetId = searchParams.get("id");

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) return;
      try {
        const response = await tables.listRows({
          databaseId: "codeSnippets",
          tableId: "snippets",
          queries: [Query.equal("userId", user.$id)],
        });
        setSnippets(response.rows);
      } catch (error) {
        console.error("Failed to fetch snippets", error);
      }
    };

    fetchSnippets();
  }, [user]);

  const languageOptions = useMemo(() => {
    const unique = new Set(
      snippets
        .map((snippet) => snippet?.language?.toLowerCase())
        .filter((language) => typeof language === "string" && language.length),
    );
    return ["all", ...Array.from(unique).sort()];
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    let next = [...snippets];

    if (languageFilter !== "all") {
      next = next.filter(
        (snippet) => snippet?.language?.toLowerCase() === languageFilter,
      );
    }

    if (normalizedSearch) {
      next = next.filter((snippet) => {
        const haystack = [
          snippet?.title,
          snippet?.description,
          Array.isArray(snippet?.tags) ? snippet.tags.join(" ") : "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedSearch);
      });
    }

    if (sortBy === "alpha") {
      next.sort((a, b) =>
        String(a?.title || "").localeCompare(String(b?.title || "")),
      );
    } else if (sortBy === "alpha-desc") {
      next.sort((a, b) =>
        String(b?.title || "").localeCompare(String(a?.title || "")),
      );
    } else if (sortBy === "oldest") {
      next.sort(
        (a, b) =>
          new Date(a?.$createdAt || 0).getTime() -
          new Date(b?.$createdAt || 0).getTime(),
      );
    } else {
      next.sort(
        (a, b) =>
          new Date(b?.$createdAt || 0).getTime() -
          new Date(a?.$createdAt || 0).getTime(),
      );
    }

    return next;
  }, [snippets, languageFilter, searchTerm, sortBy]);

  const handleDelete = async (snippetId: string) => {
    if (!user) return;
    setDeletingId(snippetId);
    try {
      await tables.deleteRow({
        databaseId: "codeSnippets",
        tableId: "snippets",
        rowId: snippetId,
      });
      setSnippets((prev) =>
        prev.filter((snippet) => snippet.$id !== snippetId),
      );
      if (currentSnippetId === snippetId) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to delete snippet", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-secondary text-sidebar-primary-foreground">
                  <ChevronLeft className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Back to Home</span>
                  <span className="">SnippetVault</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-2">
            <SidebarGroupLabel>My Snippets</SidebarGroupLabel>
            <Button variant="ghost" size="icon" asChild className="h-6 w-6">
              <Link href="/create-snippet">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Snippet</span>
              </Link>
            </Button>
          </div>
          <SidebarGroupContent>
            <div className="space-y-2 px-2 pb-2">
              <Input
                placeholder="Search snippets"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div className="flex gap-2">
                <Select
                  value={languageFilter}
                  onValueChange={setLanguageFilter}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language === "all"
                          ? "All languages"
                          : language.charAt(0).toUpperCase() +
                            language.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="alpha">A → Z</SelectItem>
                    <SelectItem value="alpha-desc">Z → A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SidebarMenu>
              {filteredSnippets.map((snippet) => (
                <SidebarMenuItem key={snippet.$id}>
                  <div className="flex items-center gap-2">
                    <SidebarMenuButton
                      asChild
                      isActive={currentSnippetId === snippet.$id}
                      className="flex-1"
                    >
                      <Link href={`/dashboard?id=${snippet.$id}`}>
                        <FileCode className="mr-2 h-4 w-4" />
                        <span className="truncate">{snippet.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          aria-label={`Actions for ${snippet.title}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/create-snippet?id=${snippet.$id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => handleDelete(snippet.$id)}
                          disabled={deletingId === snippet.$id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </SidebarMenuItem>
              ))}
              {filteredSnippets.length === 0 && (
                <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                  No snippets found.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-border/60 px-3 py-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>
                {user.email?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs uppercase text-muted-foreground">
                Signed in
              </p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Not signed in</div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
