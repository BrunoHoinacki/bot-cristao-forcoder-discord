# ✝️ Bot Cristão para Discord

### *Mensagens diárias • Versículos • Reflexões • Node.js + Express + Docker*

Este projeto é um **Bot Cristão para Discord**, desenvolvido em **Node.js**, com uma API em **Express**, agendamentos automáticos de versículos e deploy em **Docker**.
O propósito é unir **fé e tecnologia**, oferecendo um bot que envia versículos bíblicos com breves reflexões, além de comandos interativos.

---

## ⭐ Recursos do Bot

* 📖 **Versículo diário automático** (cron às 08:00 — ajustável)
* 💡 **Reflexões curtas baseadas na Bíblia**
* ✨ **Slash commands** (`/versiculo`, `/configurar_canal`, etc.)
* ⚙️ **Servidor Express para healthcheck e triggers manuais**
* 🐳 **Deploy completo com Docker + Docker Compose**
* 🏗️ Arquitetura organizada (comandos, eventos, serviços, jobs)
* 📊 **Monitoramento de Logs**: Sistema de logs centralizado em canal do Discord.
* ☁️ **Persistência com Supabase**: Configurações salvas em banco de dados para multi-servidor.

---

# 🛠️ 1. Criando o bot no Discord Developer Portal

Siga este passo a passo para criar o app, gerar o token e permitir que o bot entre em seu servidor.

### 1. Acesse o portal
➡️ [https://discord.com/developers/applications](https://discord.com/developers/applications)

### 2. Crie um novo aplicativo
* Clique em **New Application**
* Nomeie como desejar (ex: **Bot Cristão**)

### 3. Vá em **Bot** → **Add Bot**

### 4. Ative permissões importantes
Ainda na aba **Bot**:
* **Public Bot** (opcional)
* **Presence Intent**
* **Server Members Intent**
* **Message Content Intent** ✔️

### 5. Pegue o **TOKEN DO BOT**
* Em **Bot** → clique **Reset Token**

### 6. Defina as permissões do Bot
Para que os logs e o envio de mensagens funcionem, o bot precisa de permissões explícitas no servidor/canal:
* **Ver Canais**
* **Enviar Mensagens**
* **Inserir Links** (Essencial para os Embeds e Logs)
* **Ver Histórico de Mensagens**

---

# 📁 2. Estrutura do Projeto

```
bot-cristao-discord/
├─ .env
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
└─ src/
   ├─ index.js
   ├─ server.js
   ├─ discord/
   │  ├─ client.js
   │  ├─ commands/           # Comandos de mensagem (!ping)
   │  ├─ slashCommands/      # Comandos de barra (/versiculo)
   │  └─ events/             # ready, interactionCreate, messageCreate, etc.
   ├─ jobs/
   │  └─ dailyVerseJob.js    # Cron jobs (agendamentos)
   ├─ services/
   │  ├─ discordLogService.js # Sistema de logs centralizado no Discord
   │  ├─ guildConfigService.js # Gestão de banco (Supabase/JSON)
   │  └─ bibleService.js
   └─ utils/
      ├─ logger.js           # Logger de console
      └─ messageHelper.js    # Formatador de Embeds e Botões
```

---

# ⚙️ 3. Configurando o `.env`

Crie o arquivo `.env` na raiz:

```env
DISCORD_TOKEN=SEU_TOKEN_AQUI
DISCORD_CLIENT_ID=ID_DO_APP
DISCORD_LOG_CHANNEL_ID=ID_DO_CANAL_DE_LOGS
PRIMARY_GUILD_ID=ID_DO_SERVIDOR_PRINCIPAL
SUPABASE_URL=SUA_URL_DO_SUPABASE
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY_DO_SUPABASE
SUPABASE_GUILD_CONFIG_TABLE=guild_configs
PORT=3000
TZ=America/Sao_Paulo
NODE_ENV=development
```

---

# 🚀 10. Próximos Passos (Roadmap)

O projeto está em constante evolução. Nossos próximos objetivos são:

1.  **🙏 Sistema de Pedidos de Oração:** Canal dedicado para pedidos com contador de pessoas orando.
2.  **📚 Planos de Leitura:** Envio diário de cronogramas de leitura bíblica.
3.  **🖼️ Gerador de Imagens:** Criar cartões de versículos estilizados automaticamente.
4.  **🔍 Busca Bíblica:** Comando `/buscar` para localizar versículos por palavras-chave.
5.  **🌐 Painel Web:** Interface simples para o administrador ver em quantos servidores o bot está.

---

# 🙏 11. Propósito

Este bot nasceu com um objetivo simples: **usar tecnologia para espalhar fé, esperança e edificação.**

---

# 📜 Licença

MIT – livre para modificar, estudar e usar.
