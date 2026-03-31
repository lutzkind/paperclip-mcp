import { api } from "../client.js";

export const skillTools = [
  {
    name: "list_skills",
    description: "List company skills (reusable instruction bundles agents can be assigned) (V2)",
    inputSchema: {
      type: "object",
      properties: { companyId: { type: "string", description: "Company UUID" } },
      required: ["companyId"],
    },
    handler: async ({ companyId }: { companyId: string }) =>
      api(`/companies/${companyId}/skills`),
  },
  {
    name: "get_skill",
    description: "Get details of a specific skill (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        skillId: { type: "string", description: "Skill UUID or slug" },
      },
      required: ["companyId", "skillId"],
    },
    handler: async ({ companyId, skillId }: { companyId: string; skillId: string }) =>
      api(`/companies/${companyId}/skills/${skillId}`),
  },
  {
    name: "create_skill",
    description: "Create a new company skill (reusable instructions) (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        name: { type: "string", description: "Skill name" },
        slug: { type: "string", description: "URL-safe identifier" },
        description: { type: "string", description: "What this skill does" },
      },
      required: ["companyId", "name"],
    },
    handler: async ({ companyId, ...body }: { companyId: string; [k: string]: unknown }) =>
      api(`/companies/${companyId}/skills`, { method: "POST", body }),
  },
  {
    name: "update_skill_file",
    description: "Write or update a file inside a skill bundle (e.g. SKILL.md) (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        skillId: { type: "string", description: "Skill UUID" },
        path: { type: "string", description: "File path e.g. SKILL.md" },
        content: { type: "string", description: "Markdown content" },
      },
      required: ["companyId", "skillId", "path", "content"],
    },
    handler: async ({ companyId, skillId, path, content }: { companyId: string; skillId: string; path: string; content: string }) =>
      api(`/companies/${companyId}/skills/${skillId}/files`, { method: "PATCH", body: { path, content } }),
  },
  {
    name: "import_skills",
    description: "Import skills from a GitHub repo URL or other source (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        source: { type: "string", description: "GitHub URL or skill registry source" },
      },
      required: ["companyId", "source"],
    },
    handler: async ({ companyId, source }: { companyId: string; source: string }) =>
      api(`/companies/${companyId}/skills/import`, { method: "POST", body: { source } }),
  },
  {
    name: "delete_skill",
    description: "Delete a company skill (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        skillId: { type: "string", description: "Skill UUID" },
      },
      required: ["companyId", "skillId"],
    },
    handler: async ({ companyId, skillId }: { companyId: string; skillId: string }) =>
      api(`/companies/${companyId}/skills/${skillId}`, { method: "DELETE" }),
  },
  {
    name: "install_skill_update",
    description: "Install a pending update to a skill from its source repository (V2)",
    inputSchema: {
      type: "object",
      properties: {
        companyId: { type: "string", description: "Company UUID" },
        skillId: { type: "string", description: "Skill UUID" },
      },
      required: ["companyId", "skillId"],
    },
    handler: async ({ companyId, skillId }: { companyId: string; skillId: string }) =>
      api(`/companies/${companyId}/skills/${skillId}/install-update`, { method: "POST" }),
  },
];
