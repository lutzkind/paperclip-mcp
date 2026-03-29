import { api } from "../client.js";

export const goalTools = [
  { name: "list_goals", description: "List all goals for a company", inputSchema: { type: "object", properties: { companyId: { type: "string" } }, required: ["companyId"] }, handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}/goals`) },
  { name: "create_goal", description: "Create a new goal", inputSchema: { type: "object", properties: { companyId: { type: "string" }, title: { type: "string" }, description: { type: "string" }, parentGoalId: { type: "string" } }, required: ["companyId", "title"] }, handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) => api(`/companies/${companyId}/goals`, { method: "POST", body }) },
  { name: "update_goal", description: "Update a goal", inputSchema: { type: "object", properties: { goalId: { type: "string" }, title: { type: "string" }, description: { type: "string" } }, required: ["goalId"] }, handler: async ({ goalId, ...body }: { goalId: string; [k: string]: unknown }) => api(`/goals/${goalId}`, { method: "PATCH", body }) },
  { name: "delete_goal", description: "Delete a goal", inputSchema: { type: "object", properties: { goalId: { type: "string" } }, required: ["goalId"] }, handler: async ({ goalId }: { goalId: string }) => api(`/goals/${goalId}`, { method: "DELETE" }) },
];
