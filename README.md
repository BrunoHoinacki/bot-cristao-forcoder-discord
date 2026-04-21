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

---

# 🛠️ 1. Criando o bot no Discord Developer Portal

Siga este passo a passo para criar o app, gerar o token e permitir que o bot entre em seu servidor.

### 1. Acesse o portal

➡️ [https://discord.com/developers/applications](https://discord.com/developers/applications)

### 2. Crie um novo aplicativo

* Clique em **New Application**
* Nomeie como desejar (ex: **Bot Cristão**)

### 3. Vá em **Bot** → **Add Bot**

* Confirme “Yes, do it!”
* O bot será criado.

### 4. Ative permissões importantes

Ainda na aba **Bot**:

Ative:

* **Public Bot** (opcional)
* **Presence Intent**
* **Server Members Intent**
* **Message Content Intent** ✔️ *necessário para ler mensagens*

### 5. Pegue o **TOKEN DO BOT**

* Em **Bot** → clique **Reset Token**
* Copie e cole no seu `.env` como:

```
DISCORD_TOKEN=SEU_TOKEN_AQUI
```

> ⚠️ Nunca exponha o token no Git!

### 6. Crie o link para adicionar o bot ao servidor

Vá em **OAuth2 → URL Generator**:

Marque:

* **bot**
* **applications.commands**

Em **Bot Permissions**, selecione:

* Send Messages
* Read Message History
* View Channels
* Use Slash Commands

Copie o link gerado, cole no navegador e escolha o servidor onde o bot irá entrar.

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
   │  ├─ commands/
   │  │  ├─ ping.js
   │  │  └─ versiculo.js
   │  └─ events/
   │     ├─ ready.js
   │     └─ messageCreate.js
   ├─ jobs/
   │  └─ dailyVerseJob.js
   ├─ services/
   │  ├─ bibleService.js
   │  └─ reflectionService.js
   └─ utils/
      └─ logger.js
```

---

# ⚙️ 3. Configurando o `.env`

Crie o arquivo `.env` na raiz:

```env
DISCORD_TOKEN=SEU_TOKEN_AQUI
DISCORD_CLIENT_ID=ID_DO_APP
PORT=3000
TZ=America/Sao_Paulo
NODE_ENV=development
```

Depois de adicionar o bot ao servidor, configure o canal com:

```bash
/configurar_canal canal:#nome-do-canal
```

---

# ▶️ 4. Rodando o projeto (sem Docker)

Instale as dependências:

```bash
npm install
```

Inicie:

```bash
npm run dev
```

O bot aparecerá como online no seu servidor.

---

# 🐳 5. Rodando com Docker

## Build

```bash
docker compose build
```

## Start

```bash
docker compose up -d
```

## Logs

```bash
docker logs -f bot-cristao-discord
```

---

# ⏰ 6. Versículo diário (cron)

O job está em `src/jobs/dailyVerseJob.js`.

Por padrão:

```
0 8 * * *
```

Executa todos os dias às **08:00** (TZ configurado no container).

Para testar manualmente:

```bash
curl -X POST http://localhost:3000/trigger/daily-verse
```

Exemplo:
```bash
0 8 * * * → envia às 08:00
0 */2 * * * → a cada 2 horas
*/5 * * * * → a cada 5 minutos (para testes)
```
---

# 💬 7. Comandos disponíveis

### `/ping`

Testa se o bot está vivo.
Resposta:

> 🏓 Pong! Estou vivo e orando em background.

### `/versiculo`

Retorna um versículo aleatório com reflexão devocional.

Exemplo:

```
📖 João 8:32
> E conhecereis a verdade, e a verdade vos libertará.

💡 A verdade de Cristo não é só uma ideia — é uma pessoa.
```

### `/configurar_canal`

Define o canal de envio automático para aquele servidor.

### `/status_canal`

Mostra qual canal está configurado no servidor.

### `/desativar_canal`

Desativa os envios automáticos naquele servidor.

---

# 🌐 8. API Express

Endpoints:

### `GET /health`

Retorna status do serviço.

### `POST /trigger/daily-verse`

Envia manualmente o versículo diário para o canal configurado.

---

# 📦 9. Deploy em VPS (guia rápido)

1. Instale Docker + Docker Compose
2. Clone o repositório
3. Crie o `.env`
4. Rode:

```bash
docker compose up -d --build
```

5. O bot ficará online 24/7.

---

# 🤝 10. Contribuindo

Pull requests são bem-vindos!
Este projeto pode crescer para:

* Devocionais automáticos por tema
* Pedidos de oração
* Mensagens motivacionais
* Registro de estudos bíblicos
* Sistema de discipulado digital

---

# 🙏 11. Propósito

Este bot nasceu com um objetivo simples:
**usar tecnologia para espalhar fé, esperança e edificação.**

Que este projeto seja útil para igrejas, comunidades e criadores que desejam transformar o Discord num espaço ainda mais saudável e espiritual.

---

# 📜 Licença

MIT – livre para modificar, estudar e usar.
