# clay-cli

Search your [Clay.earth](https://clay.earth) contacts from the terminal.

## Installation

### Homebrew (macOS)

```bash
brew tap chandlerroth/tap
brew install clay-cli
```

### Manual Installation

Download the latest release from [GitHub Releases](https://github.com/chandlerroth/clay-cli/releases):

```bash
# macOS Apple Silicon
curl -L https://github.com/chandlerroth/clay-cli/releases/latest/download/clay-darwin-arm64.tar.gz | tar xz
sudo mv clay-darwin-arm64 /usr/local/bin/clay

# macOS Intel
curl -L https://github.com/chandlerroth/clay-cli/releases/latest/download/clay-darwin-x64.tar.gz | tar xz
sudo mv clay-darwin-x64 /usr/local/bin/clay

# Linux x64
curl -L https://github.com/chandlerroth/clay-cli/releases/latest/download/clay-linux-x64.tar.gz | tar xz
sudo mv clay-linux-x64 /usr/local/bin/clay
```

### Build from Source

Requires [Bun](https://bun.sh):

```bash
git clone https://github.com/chandlerroth/clay-cli.git
cd clay-cli
bun install
bun build index.ts --compile --outfile clay
sudo mv clay /usr/local/bin/
```

## Setup

Get your Clay refresh token and save it:

```bash
clay auth <your-refresh-token>
```

This stores your token in `~/.clay-cli/config.json`. Access tokens are refreshed automatically.

## Usage

```bash
# Search all contacts
clay all

# Search by name, title, or organization
clay "John"
clay title:"founder"
clay organization:"Anthropic"

# Exact phrase match
clay "Mount Sinai"

# Exclude terms
clay all -"The New Yorker"

# Date filters
clay "last week"
clay "added this month"

# Pagination & sorting
clay all --limit 50 --page 2
clay all --sort lastName --desc

# Output raw JSON
clay all --json

# Non-interactive mode (for scripts/agents)
clay all --non-interactive
```

See [docs/search-query-language.md](docs/search-query-language.md) for the full query syntax.

## Commands

| Command | Description |
|---------|-------------|
| `clay <query>` | Search contacts (interactive by default) |
| `clay note <contactId> <text>` | Add a note to a contact |
| `clay auth <token>` | Save your Clay refresh token |

## Development

```bash
# Run in development
bun run index.ts all

# Build binary
bun build index.ts --compile --outfile clay
```
