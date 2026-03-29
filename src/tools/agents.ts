import { api } from "../client.js";

export const agentTools = [
  {
    name: "list_agents",
    description: "List all agents in a company",
    inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID" } }, required: ["companyId"] },
    handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}/agents`),
  },
  {
    name: "get_agent",
    description: "Get full details of a specific agent",
    inputSchema: { type: "object", properties: { agentId: { type: "string", description: "Agent UUID or slug" }, companyId: { type: "string", description: "Company UUID (for slug lookup)" } }, required: ["agentId"] },
    handler: async ({ agentId, companyId }: { agentId: string; companyId?: string }) => api(`/agents/${agentId}${companyId ? `?companyId=${companyId}` : ""}`),
  },
  {
    name: "create_agent",
    description: "Create a new agent (hire an AI employee)",
    inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID" }, name: { type: "string", description: "Agent name" }, title: { type: "string", description: "Job title" }, adapterType: { type: "string", enum: ["claude_code_local", "codex_local", "cursor_local", "opencode_local", "gemini_cli_local"], description: "Adapter type" }, instructions: { type: "string", description: "Agent instructions" }, budgetMonthlyCents: { type: "number", description: "Monthly budget in cents" }, reportsToAgentId: { type: "string", description: "Manager agent UUID" } }, required: ["companyId", "name", "adapterType"] },
    handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) => api(`/companies/${companyId}/agents`, { method: "POST", body }),
  },
  {
    name: "update_agent",
    description: "Update agent name, title, instructions or budget",
    inputSchema: { type: "object", properties: { agentId: { type: "string" }, name: { type: "string" }, title: { type: "string" }, instructions: { type: "string" }, budgetMonthlyCents: { type: "number" } }, required: ["agentId"] },
    handler: async ({ agentId, ...body }: { agentId: string; [k: string]: unknown }) => api(`/agents/${agentId}`, { method: "PATCH", body }),
  },
  {
    name: "pause_agent",
    description: "Pause an agent — stops heartbeat",
    inputSchema: { type: "object", properties: { agentId: { type: "string", description: "Agent UUID" } }, required: ["agentId"] },
    handler: async ({ agentId }: { agentId: string }) => api(`/agents/${agentId}/pause`, { method: "POST" }),
  },
  {
    name: "resume_agent",
    description: "Resume a paused agent",
    inputSchema: { type: "object", properties: { agentId: { type: "string", description: "Agent UUID" } }, required: ["agentId"] },
    handler: async ({ agentId }: { agentId: string }) => api(`/agents/${agentId}/resume`, { method: "POST" }),
  },
  {
    name: "get_agent_skills",
    description: "Get agent SKILLS.md / instructions bundle",
    inputSchema: { type: "object", properties: { agentId: { type: "string" }, companyId: { type: "string" } }, required: ["agentId"] },
    handler: async ({ agentId, companyId }: { agentId: string; companyId?: string }) => api(`/agents/${agentId}/instructions-bundle${companyId ? `?companyId=${companyId}` : ""}`),
  },
  {
    name: "update_agent_skills_file",
    description: "Write or update a file in the agent's instructions bundle (SKILLS.md etc). Gives agents business context.",
    inputSchema: { type: "object", properties: { agentId: { type: "string", description: "Agent UUID" }, path: { type: "string", description: "File path e.g. SKILLS.md" }, content: { type: "string", description: "Markdown content" } }, required: ["agentId", "path", "content"] },
    handler: async ({ agentId, path, content }: { agentId: string; path: string; content: string }) => api(`/agents/${agentId}/instructions-bundle/file`, { method: "PUT", body: { path, content } }),
  },
  {
    name: "delete_agent_skills_file",
    description: "Delete a file from agent's instructions bundle",
    inputSchema: { type: "object", properties: { agentId: { type: "string" }, path: { type: "string" } }, required: ["agentId", "path"] },
    handler: async ({ agentId, path }: { agentId: string; path: string }) => api(`/agents/${agentId}/instructions-bundle/file?path=${encodeURIComponent(path)}`, { method: "DELETE" }),
  },
  {
    name: "invoke_agent_heartbeat",
    description: "Manually trigger an agent heartbeat",
    inputSchema: { type: "object", properties: { agentId: { type: "string", description: "Agent UUID" } }, required: ["agentId"] },
    handler: async ({ agentId }: { agentId: string }) => api(`/agents/${agentId}/heartbeat/invoke`, { method: "POST" }),
  },
  {
    name: "get_org_chart",
    description: "Get company org chart",
    inputSchema: { type: "object", properties: { companyId: { type: "string", description: "Company UUID" } }, required: ["companyId"] },
    handler: async ({ companyId }: { companyId: string }) => api(`/companies/${companyId}/org`),
  },
];
