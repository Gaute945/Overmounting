# Overmounting
[![GitHub Stars](https://img.shields.io/github/stars/mrbobai/Overmounting?style=flat-square)](https://github.com/mrbobai/Overmounting/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/mrbobai/Overmounting?style=flat-square)](https://github.com/mrbobai/Overmounting/network/members)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-closed/mrbobai/Overmounting?style=flat-square&color=green)](https://github.com/your-username/your-repository/pulls)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/mrbobai/Overmounting?style=flat-square)](https://github.com/your-username/your-repository/pulls)
[![GitHub issues](https://img.shields.io/github/issues/mrbobai/Overmounting?style=flat-square)](https://github.com/your-username/your-repository/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/mrbobai/Overmounting?style=flat-square)](https://github.com/mrbobai/Overmounting/issues?q=is%3Aissue+is%3Aclosed)
[![Discord Bot CI/CD](https://github.com/mrbobai/Overmounting/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/mrbobai/Overmounting/actions/workflows/node.js.yml)

**Look In Issues Tab For TODO List / Feature Requests**

> Overmounting is a discord bot made by the Undermounting team!<br>
> [You can invite and use the bot with this link](https://discord.com/oauth2/authorize?client_id=1095385301834289312&permissions=2048&scope=bot%20applications.commands)   
> [Join our Discord Server](https://discord.gg/mc5JWZ9px3)

# 🛠️ Development Setup Guide
Welcome to the Overmounting bot repository! This guide will walk you through setting up your local development environment to contribute to or run the Overmounting Discord bot.

### 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**
- **Git**

### 📥 Clone the Repository
```bash
git clone https://github.com/Gaute945/Overmounting.git
```
or
```bash
gh repo clone Gaute945/Overmounting
```

### 📦 Install Dependencies
```bash
npm install
```

### 🔧 Configuration
Create a .env file In the project root to store your environment variables.   
Add the following variables to your .env file:
```ini
DISCORD_TOKEN=your_discord_bot_token
APP_ID=your_app_id
GUILD_ID=your_guild_id
```
Your Discord Token and App Id is found in the [Discord Developer Portal](https://discord.dev/)
Guild Id is for your development server and found by right-clicking a server in the discord app and pressing "Copy Server ID" or in the url on web clients

### 🚀 Running the Bot Locally

To start the bot locally, use [index.js](index.js)
```
node index.js
```
If you're changing commands then you need to registre the commands using [deploy-commands.js](deploy-commands.js)
```
node deploy-commands.js
```
