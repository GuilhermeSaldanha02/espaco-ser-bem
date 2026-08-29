# AGENTS.md — protocolo de trabalho

Lido automaticamente por **Antigravity, Claude Code e Cursor**. É a camada compartilhada entre agentes: **ninguém precisa ler a diretriz completa para trabalhar aqui.** Regra específica de uma ferramenta vive no arquivo dela (`GEMINI.md`, `CLAUDE.md`) — nunca neste.

Responda sempre em **pt-BR**.

---

## 1. Abertura de sessão — antes de qualquer edição

Outro agente pode ter mexido aqui desde a sua última vez. Um comando:

```bash
node scripts/estado.mjs
```

Ele mostra quem commitou o quê (pelo trailer `Agente:`), se sobrou trabalho não commitado, e o bloco **ESTADO ATUAL** do `PROGRESS.md`.

**Working tree sujo = PARE e pergunte ao dono.** Pode ser trabalho em andamento do outro agente; commitar ou descartar por cima destrói contexto que não é seu.

Stack, comandos e contexto do produto: `CLAUDE.md`.

---

## 2. Fechamento de sessão — é a ação final, não opcional

1. **Reescrever o bloco ESTADO ATUAL** do `PROGRESS.md`.
2. **Atualizar o `QA.md`** se você verificou ou quebrou algum item.
3. **Commitar** com o trailer de autoria (§4).
4. Dizer ao dono **o que ele deve VER ou FAZER** para confirmar.

Sem isso, o próximo agente começa cego e refaz trabalho já feito — o desperdício mais caro que existe aqui.

---

## 3. O bloco ESTADO ATUAL

Fica no topo do `PROGRESS.md` e é **sobrescrito** a cada sessão. Não acumula: o histórico é o resto do arquivo e o `git log`.

```markdown
## ESTADO ATUAL
- **Última sessão:** AAAA-MM-DD · agente: <claude|antigravity> · branch: <nome>
- **Em andamento:** <o que ficou pela metade>
- **Não commitado:** <arquivos soltos e por quê>
- **Bloqueado / a decidir:** <o que trava, ou "nada">
- **Próximo passo:** <a próxima ação concreta>
- **Para o outro agente saber:** <o que muda o trabalho de quem chega depois>
```

A última linha é a que faz a orquestração funcionar. Escreva-a pensando em quem chega depois **sem o seu contexto** — não em você mesmo daqui a cinco minutos.

---

## 4. Git

- **Nunca commitar direto na `main`.** Sair dela: `feat/`, `fix/`, `chore/`, `refactor/`. Integração por PR.
- **Conventional Commits em pt-BR:** `<tipo>: <Descrição imperativa com inicial maiúscula>`, sem ponto final, ≤ 72 caracteres.
- **Trailer de autoria em todo commit** — é o que faz o `git log` responder "quem fez o quê" a custo zero:

  ```
  Agente: <claude|antigravity>
  ```

  Para filtrar depois: `git log --grep="Agente: "`.
- **Uma mudança lógica por commit.** Refatoração e feature nunca no mesmo commit — o diff passa a mentir e o `git bisect` deixa de servir.
- **Pré-commit bloqueante:** formatação, lint e type-check. Teste, se existir.
- **Antes do PR:** `git status --short`, `git diff --stat`, `git diff --check`.
- **Push:** só da sua própria branch. Nunca force-push em branch compartilhada.
- **Windows, restaurar binário:** `git checkout <SHA> -- caminho` — nunca `git show > arquivo` (o CRLF corrompe).

---

## 5. Os portões que não se pulam

- **Alegação não é prova.** "Consertei", "build limpo" e "deve funcionar" não fecham tarefa. Rodar o comando e ler a saída; se a mudança é visual, abrir no navegador e olhar, em viewport mobile.
- **"Passou na minha máquina" ≠ "passa em ambiente limpo".** Diretório gerado que o `.gitignore` esconde (`.next/`, `dist/`, cache de tipos) mascara falha. Quando o resultado importa, apague o gerado e rode de novo.
- **Quem implementa não se audita.** Print, vídeo e walkthrough gerados por quem escreveu o código entram no `QA.md` como **`ALEGADO`**. Viram **`PASSOU`** só depois da passada do outro agente, em contexto limpo.
- **Procurar antes de escrever.** Isto já existe neste projeto ou na lib já instalada? O erro mais frequente de agente não é escrever errado — é escrever de novo.
- **Menos código é melhor código.** O volume é o preditor mais forte de decadência arquitetural, em qualquer linguagem. Não é licença para código espremido: é para não criar o que já existe.
- **Nunca inventar dado de negócio.** Faltou informação real: TODO visível e pergunta ao dono. Nunca ficção plausível.
- **Valor de design tem fonte única.** Cor, espaçamento e tipografia vivem no arquivo de token. Nenhum valor cravado dentro de componente.
- **Mudança de escopo não acontece em silêncio.** Pedido fora do combinado: dizer que está fora, avaliar o impacto e só então implementar.
- **Pedido estrutural não vira retoque.** Se o pedido é redesenhar, desenhe a composição inteira antes de fatiar.

---

## 6. Onde está cada coisa

| Preciso de | Leia |
|---|---|
| O que está em andamento agora | `PROGRESS.md` → bloco **ESTADO ATUAL** |
| Stack, comandos, contexto do produto | `CLAUDE.md` |
| Escopo, critérios de aceitação | `PRD.md` |
| Decisões de arquitetura e fitness functions | `ADR.md` · estado atual em `ARCHITECTURE.md` |
| Por que uma decisão foi tomada | `DECISIONS.md` (busque a seção — nunca o arquivo inteiro) |
| Regras visuais e tokens | `DESIGN.md` · a entrada da decisão em `BRIEFING-VISUAL.md` |
| Glossário do domínio, pesquisa, lições | `KNOWLEDGE.md` (por seção) |
| O que já foi verificado e em que commit | `QA.md` — skill `qa-registro` |
| Spec técnica | `SDD.md` |

Arquivos de histórico e spec longa são grandes de propósito — **busque a seção, nunca leia inteiro.**

---

## 7. Antes de auditar qualquer coisa

```bash
node scripts/qa-obsoletos.mjs
```

Devolve **só os itens do `QA.md` que ficaram obsoletos** desde o commit em que foram verificados. Audite essa fila, não a lista inteira: item cuja área não mudou continua válido, e reauditá-lo não produz informação nenhuma. Regras completas na skill `qa-registro`.
