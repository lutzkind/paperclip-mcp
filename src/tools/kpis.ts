import { api } from "../client.js";

export const kpiTools = [
  {
    name: "get_agent_kpis",
    description: "Get KPI scores and self-improvement data for an agent (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        from: { type: "string", description: "ISO date start (optional)" },
        to: { type: "string", description: "ISO date end (optional)" },
        projectId: { type: "string", description: "Filter by project UUID (optional)" },
      },
      required: ["agentId"],
    },
    handler: async ({ agentId, from, to, projectId }: { agentId: string; from?: string; to?: string; projectId?: string }) => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (projectId) params.set("projectId", projectId);
      const qs = params.toString();
      return api(`/agents/${agentId}/kpis${qs ? `?${qs}` : ""}`);
    },
  },
  {
    name: "get_agent_kpi_trends",
    description: "Get KPI trend data for an agent over recent runs (V2)",
    inputSchema: {
      type: "object",
      properties: {
        agentId: { type: "string", description: "Agent UUID" },
        windowSize: { type: "number", description: "Number of runs to average over (default 10)" },
      },
      required: ["agentId"],
    },
    handler: async ({ agentId, windowSize }: { agentId: string; windowSize?: number }) => {
      const qs = windowSize ? `?windowSize=${windowSize}` : "";
      return api(`/agents/${agentId}/kpis/trends${qs}`);
    },
  },
  {
    name: "get_company_analytics",
    description: "Get company-wide analytics and KPI observations across all agents (V2)",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/analytics`),
  },
];
