# PROGRESS.md — `espaco-ser-bem`

> Estado de trabalho. Atualizar é a **ação final obrigatória de toda tarefa**. Acima de ~300 linhas, arquivar concluídos em `PROGRESS-archive.md`.

## ESTADO ATUAL

> Bloco de handoff entre agentes. **Sobrescrever a cada sessão**, nunca acumular. Formato: `AGENTS.md` §3.

- **Última sessão:** 2026-08-29 · agente: claude · branch: `main`
- **Em andamento:** site já construído e no ar antes da diretriz ser importada — PRD/ADR/SDD ainda não passaram pelo processo formal (scaffold veio depois do código, não antes)
- **Não commitado:** —
- **Bloqueado / a decidir:** confirmar com o responsável do Espaço Ser Bem: preço da aula experimental, grade completa de horários, nomes/formação da equipe, CNPJ — lista completa em `docs/achados-levantamento-espaco-ser-bem.md`
- **Próximo passo:** rodar `projeto-retomada` pra auditar o que já existe contra o padrão da diretriz (o scaffold criou o esqueleto, não reescreveu nem validou o código já no ar)
- **Para o outro agente saber:** landing page HTML/CSS/JS puro, sem build, deploy automático via Vercel a cada push na `main` (`espaco-ser-bem.vercel.app`). `BRIEFING-VISUAL.md` já preenchido com conteúdo real. `PRD.md`, `ADR.md`, `SDD.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `KNOWLEDGE.md`, `DESIGN.md`, `QA.md` ainda são esqueleto vazio — não inventar conteúdo neles, seguir a skill `projeto-retomada`.

---

## Fases

`[AFK]` = pode fechar sozinho · `[HITL]` = exige o dono. Tarefa que muda contrato de módulo, cruza módulos ou toca a peça-assinatura → HITL.

Toda tarefa nasce com seu **CHECK EXECUTÁVEL** definido e um campo de evidência.

> **TODO:** a Fase 1 é a fatia vertical da peça-assinatura. O resto orbita ela.

