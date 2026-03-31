import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { companyTools } from "./tools/companies.js";
import { agentTools } from "./tools/agents.js";
import { issueTools } from "./tools/issues.js";
import { goalTools } from "./tools/goals.js";
import { approvalTools } from "./tools/approvals.js";
import { projectTools } from "./tools/projects.js";
import { memoryTools } from "./tools/memories.js";
import { mcpServerTools } from "./tools/mcp-servers.js";
import { skillTools } from "./tools/skills.js";
import { kpiTools } from "./tools/kpis.js";
import { routineTools } from "./tools/routines.js";

const allTools = [
  ...companyTools,
  ...agentTools,
  ...issueTools,
  ...goalTools,
  ...approvalTools,
  ...projectTools,
  ...memoryTools,
  ...mcpServerTools,
  ...skillTools,
  ...kpiTools,
  ...routineTools,
];

const server = new McpServer({ name: "paperclip-mcp", version: "2.0.0" });

for (const tool of allTools) {
  const props = (tool.inputSchema.properties ?? {}) as Record<
    string,
    { type: string; description?: string; enum?: string[] }
  >;
  const required: string[] = (tool.inputSchema as { required?: string[] }).required ?? [];

  const zodShape: Record<string, z.ZodTypeAny> = {};
  for (const [key, val] of Object.entries(props)) {
    let zodType: z.ZodTypeAny;
    if (val.enum) {
      zodType = z.enum(val.enum as [string, ...string[]]);
    } else if (val.type === "number") {
      zodType = z.number();
    } else {
      zodType = z.string();
    }
    if (val.description) zodType = zodType.describe(val.description);
    if (!required.includes(key)) zodType = zodType.optional();
    zodShape[key] = zodType;
  }

  server.tool(
    tool.name,
    tool.description,
    zodShape,
    async (args: Record<string, unknown>) => {
      try {
        const result = await tool.handler(args as never);
        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
      } catch (err) {
        return { content: [{ type: "text" as const, text: `Error: ${(err as Error).message}` }], isError: true };
      }
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
