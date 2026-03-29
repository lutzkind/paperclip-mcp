# paperclip-mcp

MCP server for the [Paperclip](https://paperclip.ing) AI agent orchestration platform.

## Tools

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

### Claude Code (~/.claude/settings.json)
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
