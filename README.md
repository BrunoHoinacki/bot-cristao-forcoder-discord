# ✝️ Bot Cristão para Discord

<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/2881/2881142.png" width="100" alt="Bot Cristão Logo">
</p>

<p align="center">
  <strong>Mensagens diárias • Versículos • Reflexões • WhatsApp (n8n) • Node.js • Docker</strong>
</p>

---

Este projeto é um **Bot Cristão para Discord**, desenvolvido com o propósito de unir **fé e tecnologia**. Ele oferece uma forma automatizada e interativa de levar a Palavra de Deus para comunidades, enviando versículos bíblicos com reflexões devocionais diárias, além de integração com WhatsApp via n8n.

> "E conhecereis a verdade, e a verdade vos libertará." — João 8:32

---

## ⭐ Recursos Principais

*   📖 **Versículos Diários:** Envio automático de versículos com reflexões no Discord e WhatsApp.
*   💡 **Reflexões Contextualizadas:** Cada versículo acompanha uma breve meditação para o dia a dia.
*   ✨ **Comandos de Barra (Slash Commands):** Interface moderna com `/versiculo`, `/configurar_canal`, etc.
*   🔔 **Sistema de Anúncios Automáticos:** Cronogramas integrados para divulgação, ensino e bençãos.
*   ☁️ **Persistência com Supabase:** Configurações de servidores salvas de forma segura e escalável.
*   📊 **Monitoramento de Logs:** Logs centralizados em um canal do Discord para fácil administração.
*   🐳 **Containerização:** Pronto para deploy rápido com Docker e Docker Compose.

---

## ⏰ Cronograma de Mensagens (Anúncios)

O bot possui um sistema de agendamento automático para manter a comunidade engajada:

| Horário | Tipo de Mensagem | Conteúdo |
| :--- | :--- | :--- |
| `08:00, 12:00, 18:00`* | **Devocional Diário** | Versículo + Reflexão (Discord & WhatsApp) |
| `10:00` | **Divulgação** | Convite para compartilhar o bot |
| `15:00` | **Ensino** | Explicação sobre as funções do bot |
| `17:00` | **Parceria** | Divulgação dos serviços Forcoder |
| `A cada 4h` | **Benção Aleatória** | Mensagem de ânimo para um membro online |

*\* Horário do devocional customizável via variável `CRON_SCHEDULE`.*

---

## 📲 Integração WhatsApp (via n8n)

Além do Discord, o bot pode replicar os devocionais para grupos de WhatsApp através de um webhook do **n8n**.

*   **Configuração:** Basta definir `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_TOKEN` e `WHATS_GROUP_JID` no seu `.env`.
*   **Formatação:** As mensagens no WhatsApp são formatadas com markdown específico para a plataforma.

---

## 🚀 Como Começar

### 1. Requisitos
*   Node.js 20+ ou Docker
*   Conta no [Supabase](https://supabase.com/) (Gratuito)
*   Aplicativo no [Discord Developer Portal](https://discord.com/developers/applications)

### 2. Variáveis de Ambiente (`.env`)

```env
DISCORD_TOKEN=seu_token_aqui
DISCORD_CLIENT_ID=id_do_app
DISCORD_LOG_CHANNEL_ID=id_do_canal_de_logs
PRIMARY_GUILD_ID=id_do_servidor_principal

# Banco de Dados (Supabase)
SUPABASE_URL=sua_url_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_secret
SUPABASE_GUILD_CONFIG_TABLE=guild_configs

# Integração WhatsApp (n8n)
N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/...
N8N_WEBHOOK_TOKEN=seu_token_n8n
WHATS_GROUP_JID=123456789@g.us

# Configurações de Sistema
CRON_SCHEDULE=0 8,12,18 * * *
PORT=3000
TZ=America/Sao_Paulo
NODE_ENV=production
```

---

## 💬 Comandos e Endpoints

### Slash Commands (Discord)
| Comando | Descrição |
| :--- | :--- |
| `/versiculo` | Recebe um versículo aleatório com uma reflexão. |
| `/configurar_canal` | Define o canal de envio automático (Discord). |
| `/status_canal` | Mostra a configuração atual do servidor. |
| `/desativar_canal` | Pausa os envios automáticos no servidor. |

### API Trigger (Manual)
*   `POST /trigger/daily-verse`: Dispara manualmente o devocional para todos os canais configurados e WhatsApp.

---

## 📈 Roadmap (Próximos Passos)

- [ ] **🙏 Pedidos de Oração:** Sistema para membros solicitarem e interagirem com orações.
- [ ] **📚 Planos de Leitura:** Cronogramas diários para leitura completa da Bíblia.
- [ ] **🖼️ Cards Visuais:** Geração de imagens automáticas com o versículo do dia.
- [ ] **🌐 Dashboard:** Painel administrativo web para controle de múltiplos servidores.

---

## 🙏 Propósito
Este bot nasceu para transformar a tecnologia em uma ferramenta de edificação. Que cada linha de código sirva para espalhar fé, esperança e o amor de Cristo em todas as comunidades.

---

## 📜 Licença
Distribuído sob a licença MIT. Desenvolvido com ☕ e Fé por **Forcoder**.
