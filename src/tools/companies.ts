import { api } from "../client.js";

export const companyTools = [
  { name: "list_companies", description: "List all Paperclip companies in this instance", inputSchema: { type: "object", properties: {}, required: [] }, handler: async () => api("/companies") },
  { name: "get_company", description: "Get details of a specific company", inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID or slug" } }, required: ["companyId"] }, handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}`) },
  { name: "get_dashboard", description: "Get dashboard overview (agents, tasks, spend, approvals)", inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID" } }, required: ["companyId"] }, handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}/dashboard`) },
  { name: "create_company", description: "Create a new company", inputSchema: { type: "object", properties: { name: { type: "string", description: "Company name" }, budgetMonthlyCents: { type: "number", description: "Monthly budget in cents" } }, required: ["name"] }, handler: async (args: { name: string; budgetMonthlyCents?: number }) => api("/companies", { method: "POST", body: args }) },
];
