# Espaço Ser Bem

Landing page de conversão para **Espaço Ser Bem** (Jardim Oceania, João Pessoa/PB),
espaço de bem-estar multidisciplinar: Pilates, Fisioterapia, Ventosaterapia,
Massoterapia, Drenagem linfática, Nutrição e Psicologia — além de sublocação
de sala para profissionais autônomos.

HTML + CSS + JavaScript puro, sem build step, sem framework e sem dependências.

Estética: acolhedora e pessoal, ancorada na identidade real da marca
(logo em terracota/blush já usada no [@espacoserbem](https://instagram.com/espacoserbem)).
Títulos em DM Serif Display, corpo em Manrope.

---

## Rodar localmente

Qualquer servidor estático serve. Exemplos:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Depois abra `http://localhost:8080`. Não precisa de `npm install` nem build.

---

## Estrutura

- `index.html`, `style.css`, `script.js` — a landing page.
- `assets/logo.jpg` — logomarca real do cliente (captura em resolução média a partir do Instagram; pedir arquivo em alta/vetor pro cliente antes da entrega final).
- `docs/` — material de levantamento usado para escrever o conteúdo:
  - `diretrizes-v8.md` — ficha original recebida do responsável pelo projeto.
  - `achados-levantamento-espaco-ser-bem.md` — achados adicionais (Instagram logado, Google Maps, escopo real dos serviços e da sublocação).
  - `BRIEFING-VISUAL.md` — briefing de direção visual (cena de uso, referências olhadas, travas de marca).

---

## Regra de conteúdo

Nenhum dado no site foi inventado — preço, equipe, horário completo da semana,
CNPJ e fotos reais do espaço ainda não estão confirmados publicamente e por
isso não aparecem. Ver `docs/achados-levantamento-espaco-ser-bem.md` para a
lista do que falta confirmar com o responsável antes da publicação final.

---

## Subir (hospedagem estática)

Funciona em qualquer host estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages).
O formulário de contato já vem com os atributos do **Netlify Forms**
(`data-netlify="true"` + campo `form-name` oculto) — funciona automaticamente
se a hospedagem for a Netlify; em outro host, o formulário precisa de outro
backend ou serviço de formulário (ex.: Formspree).
