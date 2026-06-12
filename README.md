# ✝️ Bot Cristão para Discord

<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/2881/2881142.png" width="100" alt="Bot Cristão Logo">
</p>

<p align="center">
  <strong>Mensagens diárias • Versículos • Reflexões • Node.js • Docker</strong>
</p>

---

Este projeto é um **Bot Cristão para Discord**, desenvolvido com o propósito de unir **fé e tecnologia**. Ele oferece uma forma automatizada e interativa de levar a Palavra de Deus para comunidades, enviando versículos bíblicos com reflexões devocionais diárias.

> "E conhecereis a verdade, e a verdade vos libertará." — João 8:32

---

## ⭐ Recursos Principais

*   📖 **Versículos Diários:** Envio automático de versículos com reflexões (configurável via Cron).
*   💡 **Reflexões Contextualizadas:** Cada versículo acompanha uma breve meditação para o dia a dia.
*   ✨ **Comandos de Barra (Slash Commands):** Interface moderna com `/versiculo`, `/configurar_canal`, etc.
*   ☁️ **Persistência com Supabase:** Configurações de servidores salvas de forma segura e escalável.
*   📊 **Sistema de Monitoramento:** Logs centralizados em um canal do Discord para fácil administração.
*   🐳 **Containerização:** Pronto para deploy rápido com Docker e Docker Compose.

---

## 🚀 Como Começar

### 1. Requisitos Próximos
*   Node.js 20+ ou Docker
*   Conta no [Supabase](https://supabase.com/) (Gratuito)
*   Aplicativo no [Discord Developer Portal](https://discord.com/developers/applications)

### 2. Configuração do Bot no Discord
1.  Crie um novo App no Portal do Discord.
2.  Na aba **Bot**, ative as **Privileged Gateway Intents** (Presença, Membros e Conteúdo de Mensagem).
3.  Defina as permissões necessárias:
    *   *Ver Canais, Enviar Mensagens, Inserir Links, Ver Histórico*.

### 3. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto seguindo o modelo:

```env
DISCORD_TOKEN=seu_token_aqui
DISCORD_CLIENT_ID=id_do_app
DISCORD_LOG_CHANNEL_ID=id_do_canal_de_logs
PRIMARY_GUILD_ID=id_do_servidor_principal

# Banco de Dados (Supabase)
SUPABASE_URL=sua_url_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_secret
SUPABASE_GUILD_CONFIG_TABLE=guild_configs

# Configurações de Sistema
PORT=3000
TZ=America/Sao_Paulo
NODE_ENV=production
```

---

## 🛠️ Instalação e Execução

### Com Docker (Recomendado)
```bash
docker compose up -d --build
```

### Manualmente
```bash
npm install
npm start
```

---

## 💬 Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `/versiculo` | Recebe um versículo aleatório com uma reflexão. |
| `/configurar_canal` | Define em qual canal o bot enviará as mensagens automáticas. |
| `/status_canal` | Mostra a configuração atual do servidor. |
| `/desativar_canal` | Pausa os envios automáticos no servidor. |
| `/ping` | Verifica a latência e o status do bot. |

---

## 📈 Roadmap (Próximos Passos)

- [ ] **🙏 Pedidos de Oração:** Sistema para membros solicitarem e interagirem com orações.
- [ ] **📚 Planos de Leitura:** Cronogramas diários para leitura completa da Bíblia.
- [ ] **🖼️ Cards Visuais:** Geração de imagens automáticas com o versículo do dia.
- [ ] **🔍 Busca por Palavra:** Encontrar versículos específicos via comando.
- [ ] **🌐 Dashboard:** Painel administrativo web para controle de múltiplos servidores.

---

## 🤝 Contribuição

Contribuições são o que tornam a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 🙏 Propósito
Este bot nasceu para transformar a tecnologia em uma ferramenta de edificação. Que cada linha de código sirva para espalhar fé, esperança e o amor de Cristo em todas as comunidades do Discord.

---

## 📜 Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
<p align="center">
  Desenvolvido com ☕ e Fé por <strong>Forcoder</strong>
</p>
