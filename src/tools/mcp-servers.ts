import { api } from "../client.js";

export const mcpServerTools = [
  {
    name: "list_mcp_servers",
    description: "List MCP servers configured for a company (V2)",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/mcp-servers`),
  },
  {
    name: "create_mcp_server",
    description: "Add an MCP server to a company so agents can use it (V2). Use transportType=stdio for local commands, or sse/http for URL-based servers.",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        name: { type: "string", description: "Human-readable name" },
        description: { type: "string", description: "Optional description" },
        transportType: { type: "string", enum: ["stdio", "sse", "http"], description: "Transport type" },
        command: { type: "string", description: "Command to run (required for stdio)" },
        args: { type: "string", description: "JSON array of args e.g. [\"--port\",\"3000\"]" },
        env: { type: "string", description: "JSON object of env vars" },
        transportUrl: { type: "string", description: "URL for sse/http transport" },
        scope: { type: "string", enum: ["company", "agent"], description: "company = all agents, agent = specific agent" },
        agentId: { type: "string", description: "Agent UUID (when scope=agent)" },
      },
      required: ["companyId", "name", "transportType"],
    },
    handler: async ({ companyId, args, env, ...rest }: { companyId: string; args?: string; env?: string; [k: string]: unknown }) =>
      api(`/companies/${companyId}/mcp-servers`, {
        method: "POST",
        body: {
          ...rest,
          ...(args !== undefined && { args: JSON.parse(args) }),
          ...(env !== undefined && { env: JSON.parse(env) }),
        },
      }),
  },
  {
    name: "sync_mcp_servers",
    description: "Sync MCP servers into Paperclip from the Claude Code settings on the host (V2). Imports all configured MCP servers automatically.",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/mcp-servers/sync`, { method: "POST" }),
  },
  {
    name: "update_mcp_server",
    description: "Update an MCP server configuration (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        serverId: { type: "string", description: "MCP server UUID" },
        name: { type: "string" },
        description: { type: "string" },
        command: { type: "string" },
        args: { type: "string", description: "JSON array" },
        env: { type: "string", description: "JSON object" },
        transportType: { type: "string", enum: ["stdio", "sse", "http"] },
        transportUrl: { type: "string" },
        enabled: { type: "string", enum: ["true", "false"] },
      },
      required: ["companyId", "serverId"],
    },
    handler: async ({ companyId, serverId, args, env, enabled, ...rest }: { companyId: string; serverId: string; args?: string; env?: string; enabled?: string; [k: string]: unknown }) =>
      api(`/companies/${companyId}/mcp-servers/${serverId}`, {
        method: "PATCH",
        body: {
          ...rest,
          ...(args !== undefined && { args: JSON.parse(args) }),
          ...(env !== undefined && { env: JSON.parse(env) }),
          ...(enabled !== undefined && { enabled: enabled === "true" }),
        },
      }),
  },
  {
    name: "delete_mcp_server",
    description: "Remove an MCP server from a company (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        serverId: { type: "string", description: "MCP server UUID" },
      },
      required: ["companyId", "serverId"],
    },
    handler: async ({ companyId, serverId }: { companyId: string; serverId: string }) =>
      api(`/companies/${companyId}/mcp-servers/${serverId}`, { method: "DELETE" }),
  },
];
