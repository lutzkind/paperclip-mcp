import { api } from "../client.js";

export const observationTools = [
  {
    name: "list_observations",
    description: "List KPI observations for a company — human or agent notes on agent performance (V2)",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/analytics/observations`),
  },
  {
    name: "create_observation",
    description: "Record a KPI observation about one or more agents — used in the self-improvement loop (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        observation: { type: "string", description: "What was observed about agent performance" },
        agentIds: { type: "string", description: "JSON array of agent UUIDs this applies to" },
        observerType: { type: "string", enum: ["human", "agent", "system"], description: "Who made this observation" },
        observerAgentId: { type: "string", description: "Observer agent UUID (when observerType=agent)" },
        actionTaken: { type: "string", description: "Action taken in response (optional)" },
        actionNotes: { type: "string", description: "Notes on the action taken (optional)" },
      },
      required: ["companyId", "observation", "agentIds", "observerType"],
    },
    handler: async ({ companyId, agentIds, ...rest }: { companyId: string; agentIds: string; [k: string]: unknown }) =>
      api(`/companies/${companyId}/analytics/observations`, {
        method: "POST",
        body: { ...rest, agentIds: JSON.parse(agentIds) },
      }),
  },
  {
    name: "delete_observation",
    description: "Delete a KPI observation (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        observationId: { type: "string", description: "Observation UUID" },
      },
      required: ["companyId", "observationId"],
    },
    handler: async ({ companyId, observationId }: { companyId: string; observationId: string }) =>
      api(`/companies/${companyId}/analytics/observations/${observationId}`, { method: "DELETE" }),
  },
];
