import { api } from "../client.js";

export const issueTools = [
  {
    name: "list_issues",
    description: "List issues/tasks for a company with optional filters",
    inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID" }, status: { type: "string", enum: ["backlog", "todo", "in_progress", "in_review", "done", "cancelled"] }, assigneeAgentId: { type: "string" }, projectId: { type: "string" }, q: { type: "string", description: "Search query" } }, required: ["companyId"] },
    handler: async ({ companyId, ...params }: { companyId: string; [k: string]: unknown }) => {
      const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]).toString();
      return api(`/companies/${companyId}/issues${qs ? `?${qs}` : ""}`);
    },
  },
  {
    name: "get_issue",
    description: "Get details of a specific issue/task",
    inputSchema: { type: "object", properties: { issueId: { type: "string", description: "Issue UUID or identifier e.g. LUX-1" } }, required: ["issueId"] },
    handler: async ({ issueId }: { issueId: string }) => api(`/issues/${issueId}`),
  },
  {
    name: "create_issue",
    description: "Create a new task and optionally assign to an agent",
    inputSchema: { type: "object", properties: { companyId: { type: "string" }, title: { type: "string" }, description: { type: "string" }, priority: { type: "string", enum: ["critical", "high", "medium", "low"] }, status: { type: "string", enum: ["backlog", "todo", "in_progress"] }, assigneeAgentId: { type: "string" }, projectId: { type: "string" } }, required: ["companyId", "title"] },
    handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) => api(`/companies/${companyId}/issues`, { method: "POST", body }),
  },
  {
    name: "update_issue",
    description: "Update an issue title, description, status, priority or assignment",
    inputSchema: { type: "object", properties: { issueId: { type: "string" }, title: { type: "string" }, description: { type: "string" }, status: { type: "string", enum: ["backlog", "todo", "in_progress", "in_review", "done", "cancelled"] }, priority: { type: "string", enum: ["critical", "high", "medium", "low"] }, assigneeAgentId: { type: "string" } }, required: ["issueId"] },
    handler: async ({ issueId, ...body }: { issueId: string; [k: string]: unknown }) => api(`/issues/${issueId}`, { method: "PATCH", body }),
  },
  {
    name: "delete_issue",
    description: "Delete an issue/task",
    inputSchema: { type: "object", properties: { issueId: { type: "string" } }, required: ["issueId"] },
    handler: async ({ issueId }: { issueId: string }) => api(`/issues/${issueId}`, { method: "DELETE" }),
  },
  {
    name: "add_issue_comment",
    description: "Add a comment to an issue. @mention an agent to trigger them.",
    inputSchema: { type: "object", properties: { issueId: { type: "string" }, body: { type: "string", description: "Markdown comment. @agentSlug to notify." } }, required: ["issueId", "body"] },
    handler: async ({ issueId, body }: { issueId: string; body: string }) => api(`/issues/${issueId}/comments`, { method: "POST", body: { body } }),
  },
];
