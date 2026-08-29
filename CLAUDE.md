# CLAUDE.md — `espaco-ser-bem`

> Contexto do produto e da stack. Protocolo de trabalho: `AGENTS.md`.

**Protocolo de trabalho — leia `AGENTS.md` na abertura de toda sessão.** É a camada compartilhada com os outros agentes deste repositório. Este arquivo cobre só produto e stack.

Responda sempre em **pt-BR** e instrua todo subagente a responder em pt-BR — a preferência não é herdada.

---

## O que é este projeto

Landing page do **Espaço Ser Bem**, espaço de bem-estar multidisciplinar (Pilates, Fisioterapia, Ventosaterapia, Massoterapia, Drenagem linfática, Nutrição, Psicologia) no Jardim Oceania, João Pessoa. Para quem chega pelo Instagram/Google e decide no celular. Peça-assinatura: o hero com a entrada animada e o CTA de WhatsApp sempre alcançável.

## Stack

> **TODO:** nunca passou por Stack Grill formal — decisão pragmática, não interview registrada. HTML + CSS + JS puro, sem framework, sem build step. Deploy: Vercel (projeto `espaco-ser-bem`, conta `audicon`/guilherme), auto-deploy a cada push na `main`. Repositório: `GuilhermeSaldanha02/espaco-ser-bem` (privado).

## Comandos

```bash
python -m http.server 8080   # roda local em http://localhost:8080 — não tem npm install nem build
```

## As regras que este projeto não perdoa

- **`overflow-x` só no `body`, nunca no `<html>`.** Já quebrou o menu mobile e todo elemento `position:fixed` da página (ver commit `fix: menu mobile sumia ao rolar a página`) — overflow no html muda o containing block de fixed pro documento inteiro em vez do viewport.
- **Nenhum dado de negócio inventado** (preço, equipe, horário completo, CNPJ) — o que falta confirmar está em `docs/achados-levantamento-espaco-ser-bem.md`.
- **Bump manual do `?v=` no `<link>`/`<script>` a cada edição de `style.css`/`script.js`** — sem isso, cache do navegador serve versão antiga durante teste local.


---

## Padrões

Conduta permanente vive em `.claude/skills/` e em `AGENTS.md`, acionada automaticamente.

## Equipe de agentes

Definida em `.claude/agents/` — 1 arquivo por papel, com `model` e `tools` explícitos. `model` explícito em **todo** spawn; nunca herdar o default.
