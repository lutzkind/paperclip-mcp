import { api } from "../client.js";

export const memoryTools = [
  {
    name: "list_agent_memories",
    description: "List persistent memories for an agent (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        scope: { type: "string", enum: ["global", "project"], description: "Filter by scope" },
        projectId: { type: "string", description: "Filter by project UUID" },
        category: { type: "string", description: "Filter by category" },
      },
      required: ["agentId"],
    },
    handler: async ({ agentId, scope, projectId, category }: { agentId: string; scope?: string; projectId?: string; category?: string }) => {
      const params = new URLSearchParams();
      if (scope) params.set("scope", scope);
      if (projectId) params.set("projectId", projectId);
      if (category) params.set("category", category);
      const qs = params.toString();
      return api(`/agents/${agentId}/memories${qs ? `?${qs}` : ""}`);
    },
  },
  {
    name: "create_agent_memory",
    description: "Create a persistent memory for an agent (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        scope: { type: "string", enum: ["global", "project"], description: "global or project-scoped" },
        projectId: { type: "string", description: "Project UUID (required when scope=project)" },
        category: { type: "string", description: "Category e.g. 'preference', 'fact', 'skill'" },
        title: { type: "string", description: "Short title for the memory" },
        content: { type: "string", description: "Memory content (markdown)" },
        source: { type: "string", description: "Source e.g. 'human', 'self', 'observation'" },
        confidence: { type: "string", description: "Confidence 0.0–1.0 (default 0.7)" },
      },
      required: ["agentId", "scope", "category", "title", "content", "source"],
    },
    handler: async ({ agentId, ...body }: { agentId: string; [k: string]: unknown }) =>
      api(`/agents/${agentId}/memories`, { method: "POST", body }),
  },
  {
    name: "update_agent_memory",
    description: "Update an agent memory's title, content, category or confidence (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        memoryId: { type: "string", description: "Memory UUID" },
        title: { type: "string" },
        content: { type: "string" },
        category: { type: "string" },
        confidence: { type: "string", description: "0.0–1.0" },
      },
      required: ["agentId", "memoryId"],
    },
    handler: async ({ agentId, memoryId, ...body }: { agentId: string; memoryId: string; [k: string]: unknown }) =>
      api(`/agents/${agentId}/memories/${memoryId}`, { method: "PATCH", body }),
  },
  {
    name: "delete_agent_memory",
    description: "Delete a persistent memory from an agent (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        memoryId: { type: "string", description: "Memory UUID" },
      },
      required: ["agentId", "memoryId"],
    },
    handler: async ({ agentId, memoryId }: { agentId: string; memoryId: string }) =>
      api(`/agents/${agentId}/memories/${memoryId}`, { method: "DELETE" }),
  },
];
