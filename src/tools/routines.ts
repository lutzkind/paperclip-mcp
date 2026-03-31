import { api } from "../client.js";

export const routineTools = [
  {
    name: "list_routines",
    description: "List scheduled routines for a company (V2). Routines are recurring tasks assigned to agents.",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/routines`),
  },
  {
    name: "create_routine",
    description: "Create a scheduled routine assigned to an agent (V2). Use cron syntax for schedule.",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        name: { type: "string", description: "Routine name" },
        description: { type: "string", description: "What the routine does" },
        assigneeAgentId: { type: "string", description: "Agent UUID to run the routine" },
        schedule: { type: "string", description: "Cron expression e.g. '0 9 * * 1-5'" },
        prompt: { type: "string", description: "Instructions to give the agent when routine runs" },
        projectId: { type: "string", description: "Project UUID to associate with (optional)" },
      },
      required: ["companyId", "name", "assigneeAgentId", "schedule", "prompt"],
    },
    handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) =>
      api(`/companies/${companyId}/routines`, { method: "POST", body }),
  },
  {
    name: "delete_routine",
    description: "Delete a scheduled routine (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        routineId: { type: "string", description: "Routine UUID" },
      },
      required: ["companyId", "routineId"],
    },
    handler: async ({ companyId, routineId }: { companyId: string; routineId: string }) =>
      api(`/companies/${companyId}/routines/${routineId}`, { method: "DELETE" }),
  },
];
