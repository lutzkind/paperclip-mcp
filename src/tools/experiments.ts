import { api } from "../client.js";

export const experimentTools = [
  {
    name: "list_experiments",
    description: "List A/B experiments for an agent — used to test different approaches and find what works best (V2)",
    inputSchema: {
      type: "object",
      properties: { agentId: { type: "string", description: "Agent UUID" } },
      required: ["agentId"],
    },
    handler: async ({ agentId }: { agentId: string }) =>
      api(`/agents/${agentId}/experiments`),
  },
  {
    name: "create_experiment",
    description: "Create an A/B experiment for an agent to test two different approaches (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        hypothesis: { type: "string", description: "What you're testing e.g. 'Approach A will reduce errors'" },
        approachA: { type: "string", description: "Description of approach A (current/control)" },
        approachB: { type: "string", description: "Description of approach B (variant)" },
        taskType: { type: "string", description: "Type of task this experiment applies to (optional)" },
      },
      required: ["agentId", "hypothesis", "approachA", "approachB"],
    },
    handler: async ({ agentId, ...body }: { agentId: string; [k: string]: unknown }) =>
      api(`/agents/${agentId}/experiments`, { method: "POST", body }),
  },
  {
    name: "update_experiment",
    description: "Update an experiment — record run results or conclude it with a winning approach (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        experimentId: { type: "string", description: "Experiment UUID" },
        status: { type: "string", enum: ["running", "concluded", "abandoned"], description: "Update status" },
        winningApproach: { type: "string", enum: ["A", "B"], description: "Winning approach when concluding" },
        changeNotes: { type: "string", description: "Notes on what changed / what was learned" },
      },
      required: ["agentId", "experimentId"],
    },
    handler: async ({ agentId, experimentId, ...body }: { agentId: string; experimentId: string; [k: string]: unknown }) =>
      api(`/agents/${agentId}/experiments/${experimentId}`, { method: "PATCH", body }),
  },
  {
    name: "delete_experiment",
    description: "Delete an experiment (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        experimentId: { type: "string", description: "Experiment UUID" },
      },
      required: ["agentId", "experimentId"],
    },
    handler: async ({ agentId, experimentId }: { agentId: string; experimentId: string }) =>
      api(`/agents/${agentId}/experiments/${experimentId}`, { method: "DELETE" }),
  },
];
