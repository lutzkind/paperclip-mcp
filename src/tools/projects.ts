import { api } from "../client.js";

export const projectTools = [
  { name: "list_projects", description: "List all projects in a company", inputSchema: { type: "object", properties: { companyId: { type: "string" } }, required: ["companyId"] }, handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}/projects`) },
  { name: "create_project", description: "Create a new project", inputSchema: { type: "object", properties: { companyId: { type: "string" }, name: { type: "string", description: "Project name" } }, required: ["companyId", "name"] }, handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) => api(`/companies/${companyId}/projects`, { method: "POST", body }) },
  { name: "delete_project", description: "Delete a project", inputSchema: { type: "object", properties: { projectId: { type: "string" } }, required: ["projectId"] }, handler: async ({ projectId }: { projectId: string }) => api(`/projects/${projectId}`, { method: "DELETE" }) },
];
