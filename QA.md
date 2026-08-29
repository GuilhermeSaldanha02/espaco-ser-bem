# QA.md — Registro Incremental de Verificação

Um item verificado num commit (`SHA`) continua válido enquanto nenhum arquivo da área dele mudar. Antes de auditar, calcule e rode só o obsoleto:

```bash
node scripts/qa-obsoletos.mjs
```

Regras: skill `qa-registro`. Prova crua em `qa/evidencias/<ID>/` — `print.png`, `console.txt`, `rede.txt`.

---

## 1. Mapa de Áreas

| Área | Caminhos (glob, separados por espaço) |
|---|---|

> Derive da estrutura real de pastas. Área **visual** é transversal: se a prova do item é aparência, registre-o nela, não só na área da rota.

---

## 2. Estado por Item

| ID | Área | O que prova | Resultado | SHA | Data | Evidência |
|---|---|---|---|---|---|---|

> Vazio de propósito — **não invente itens.** Preenche na primeira auditoria de verdade.

---

## 3. Automatizados

| ID | Spec |
|---|---|
