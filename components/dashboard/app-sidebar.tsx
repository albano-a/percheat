"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Home, FileCode, ChevronLeft } from "lucide-react";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState<any[]>([]);
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
                  <span className="">PerCheat</span>
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
            <SidebarMenu>
              {snippets.map((snippet) => (
                <SidebarMenuItem key={snippet.$id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentSnippetId === snippet.$id}
                  >
                    <Link href={`/dashboard?id=${snippet.$id}`}>
                      <FileCode className="mr-2 h-4 w-4" />
                      <span className="truncate">{snippet.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {snippets.length === 0 && (
                <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                  No snippets found.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
