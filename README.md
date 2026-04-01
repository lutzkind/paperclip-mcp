# paperclip-mcp

MCP server for the [Paperclip](https://paperclip.ing) AI agent orchestration platform. Supports both V1 and V2 features.

## Tools

### Companies & Agents
| Tool | Description |
|------|-------------|
| `list_companies` | List all companies |
| `get_company` | Get company details |
| `get_dashboard` | Dashboard overview (agents, tasks, spend) |
| `create_company` | Create a new company |
| `list_agents` | List agents in a company |
| `get_agent` | Get agent details |
| `create_agent` | Hire a new agent |
| `update_agent` | Update agent config |
| `pause_agent` | Pause an agent's heartbeat |
| `resume_agent` | Resume a paused agent |
| `get_agent_skills` | Get agent SKILLS.md / instructions bundle |
| `update_agent_skills_file` | Write a file to agent's instructions bundle |
| `delete_agent_skills_file` | Delete a file from agent's instructions bundle |
| `invoke_agent_heartbeat` | Manually trigger an agent |
| `get_org_chart` | Get company org chart |

### Tasks, Goals & Projects
| Tool | Description |
|------|-------------|
| `list_issues` | List tasks with filters |
| `get_issue` | Get task details |
| `create_issue` | Create a new task |
| `update_issue` | Update a task |
| `delete_issue` | Delete a task |
| `add_issue_comment` | Comment on a task (use @agent to notify) |
| `list_goals` | List company goals |
| `create_goal` | Create a goal |
| `update_goal` | Update a goal |
| `delete_goal` | Delete a goal |
| `list_approvals` | List approval requests |
| `get_approval` | Get approval details |
| `approve_request` | Approve a pending request |
| `reject_request` | Reject a pending request |
| `request_revision` | Request changes before approving |
| `list_projects` | List projects |
| `create_project` | Create a project |
| `delete_project` | Delete a project |

### Memory (V2)
| Tool | Description |
|------|-------------|
| `list_agent_memories` | List an agent's persistent memories (global + project-scoped) |
| `create_agent_memory` | Add a memory entry for an agent |
| `update_agent_memory` | Update a memory's content, category or confidence |
| `delete_agent_memory` | Delete a memory entry |

### MCP Servers (V2)
| Tool | Description |
|------|-------------|
| `list_mcp_servers` | List MCP servers configured for a company |
| `create_mcp_server` | Add an MCP server (stdio, sse, or http) — set scope=agent to assign to one agent |
| `sync_mcp_servers` | Import MCP servers from Claude Code settings automatically |
| `update_mcp_server` | Update an MCP server config or enable/disable it |
| `delete_mcp_server` | Remove an MCP server |
| `exclude_mcp_from_agent` | Prevent a specific agent from accessing a company MCP |
| `remove_mcp_exclusion` | Re-enable a previously excluded MCP for an agent |

### Skills (V2)
| Tool | Description |
|------|-------------|
| `list_skills` | List company-level reusable skill bundles |
| `get_skill` | Get skill details |
| `create_skill` | Create a new skill |
| `update_skill_file` | Write/update a file inside a skill bundle (e.g. SKILL.md) |
| `import_skills` | Import skills from a GitHub URL |
| `delete_skill` | Delete a skill |
| `install_skill_update` | Install a pending upstream update to a skill |

### KPIs & Analytics (V2)
| Tool | Description |
|------|-------------|
| `get_agent_kpis` | Get KPI records for an agent (completion, tokens, cost, errors) |
| `get_agent_kpi_trends` | Get trend comparison over recent runs |
| `get_company_analytics` | Company-wide analytics across all agents |
| `list_observations` | List KPI observations (human or agent notes on performance) |
| `create_observation` | Record an observation about agent performance |
| `delete_observation` | Delete an observation |

### Experiments (V2)
| Tool | Description |
|------|-------------|
| `list_experiments` | List A/B experiments for an agent |
| `create_experiment` | Create an A/B experiment (hypothesis + two approaches) |
| `update_experiment` | Record results or conclude with a winning approach |
| `delete_experiment` | Delete an experiment |

### Routines (V2)
| Tool | Description |
|------|-------------|
| `list_routines` | List scheduled routines for a company |
| `create_routine` | Create a cron-scheduled routine assigned to an agent |
| `delete_routine` | Delete a routine |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PAPERCLIP_URL` | Your Paperclip instance URL |
| `PAPERCLIP_EMAIL` | Board operator email |
| `PAPERCLIP_PASSWORD` | Board operator password |

## Deployment (Docker + SSE bridge)

```bash
# Build the image
docker build -t paperclip-mcp:latest .

# Run with SSE bridge (port 3028)
docker run -d --name mcp-paperclip \
  --restart unless-stopped \
  --network o4080ws0og8w00ogs08co4cc \
  -e COMMAND="node /app/paperclip-mcp/dist/index.js" \
  -e PORT=3000 \
  -e PAPERCLIP_URL=https://paperclip.yourdomain.com \
  -e PAPERCLIP_EMAIL=your@email.com \
  -e PAPERCLIP_PASSWORD=yourpassword \
  -p 3028:3000 \
  paperclip-mcp:latest node /app/server.js

docker cp /root/server.js mcp-paperclip:/app/server.js
docker restart mcp-paperclip
```

## Client Configuration

### Claude Code (~/.claude.json)
```json
{
  "mcpServers": {
    "paperclip": {
      "type": "sse",
      "url": "http://localhost:3028/sse"
    }
  }
}
```

### Gemini CLI (~/.gemini/settings.json)
```json
{
  "mcpServers": {
    "paperclip": {
      "type": "sse",
      "url": "http://localhost:3028/sse"
    }
  }
}
```

### VS Code Copilot (.vscode/mcp.json)
```json
{
  "servers": {
    "paperclip": {
      "type": "sse",
      "url": "http://localhost:3028/sse"
    }
  }
}
```

### Codex
```json
{
  "mcpServers": {
    "paperclip": {
      "type": "sse",
      "url": "http://localhost:3028/sse"
    }
  }
}
```
