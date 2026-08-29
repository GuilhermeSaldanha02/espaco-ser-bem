# Briefing visual — Espaço Ser Bem

## Cena de uso concreta

Duas cenas, uma página:

1. **Aluno/paciente em potencial**, no celular, achou o link no Instagram ou pesquisou "Pilates Jardim Oceania" no Google. Uma mão só, no meio de outra coisa (esperando algo, no intervalo do trabalho, na cama antes de dormir), pouca paciência, decisão rápida: "isso é sério e confiável?" → "onde fica?" → toca no WhatsApp. Não vai ler parágrafo longo.
2. **Profissional de saúde/terapia** avaliando alugar a sala de sublocação. Mais deliberado, provavelmente em desktop, olhando fotos do ambiente e condições antes de decidir — mas ainda assim conclui no WhatsApp.

O layout é mandado por isso: mobile-first, hierarquia escaneável, CTA de WhatsApp sempre alcançável, texto curto. Isso não é gosto, é a cena — não é negociável por preferência estética.

## Quem precisa se reconhecer

Moradoras/moradores de Jardim Oceania, Bessa, Aeroclube, Manaíra — bairro nobre-mas-de-bairro, não centro corporativo. Perfil provável: mulheres 25–55 anos, buscando cuidado pessoal e boutique, não "academia grande e barulhenta" (a própria empresa se posiciona assim, ver diretriz v8 seção 1). O negócio também se declara publicamente como acolhedor de comunidade LGBTQ+ e como empresa de empreendedoras — isso pede um tom caloroso e pessoal, não clínico-frio nem corporativo.

## Inventário de telas

Uma landing page (single scroll), sem múltiplas rotas. Seções previstas (ver `achados-levantamento-espaco-ser-bem.md` seção 8): Hero, Cuidado completo em um só lugar, Serviços (7 modalidades), Como funciona, Localização, Sublocação de sala (bloco secundário), FAQ, Rodapé.

## Escopo negativo visual

- Sem fotos de estoque de academia genérica (modelo sorrindo com halteres) — o negócio não é isso.
- Sem linguagem visual clínico-hospitalar (jaleco branco, cruz médica, verde hospitalar frio) — os serviços incluem saúde, mas o posicionamento é bem-estar/boutique, não clínica.
- Sem promessa visual de cura/tratamento (nenhum "antes e depois", nenhum ícone de diagnóstico).
- Sem estética SaaS corporativa fria (grid денse, neon técnico) — é a referência de acabamento (gcpro.com.br), não de tom.
- Sem depoimentos, preços ou fotos de alunos inventados (regra de conteúdo já vale para o visual: nenhum rosto/nome fictício).

## Viewports que valem

375px (mobile, prioridade) e 1440px (desktop). Não há tablet dedicado — testar que não quebra em 768px, mas não é foco de design.

## O que está TRAVADO

- **Paleta ancorada na logo real**: terracota/marrom escuro + rosa-blush claro + creme/off-white (ver `logo-referencia-baixa-res.jpg`). A direção pode variar tom e uso, mas não pode ignorar a identidade de marca já existente publicamente no Instagram.
- **CTA primário é WhatsApp** — "Agendar aula experimental" / "Falar pelo WhatsApp", sempre visível.
- **Mobile-first** — decisão já registrada na diretriz do cliente (v8, seção 9).
- **Nenhum conteúdo inventado** (preço, equipe, depoimento, foto de aluno) — onde faltar dado real, placeholder visível, nunca ficção (diretriz v8 seção 8).

## Referências olhadas de verdade

### 1. espacocare.com.br — "Care Fisioterapia" (Pilates Clínico + Fisioterapia, João Pessoa)

**Credencial:** concorrente direto — mesmo nicho (Pilates + Fisioterapia), mesma cidade.

**O que tirar:** confiança estrutural do hero (headline editorial grande: "Volte a se mover com confiança, não apenas sem dor"), fotografia real de ambiente com luz quente, navegação com seções claras (Método, Especialidades, Depoimentos, Equipe, Estrutura, Unidades), CTA de WhatsApp bem posicionado.

**O que NÃO copiar e por quê:** a paleta verde-escuro institucional e o peso corporativo — a Care é uma clínica maior, com múltiplas unidades, comunicando escala e autoridade clínica. O Espaço Ser Bem é pequeno, pessoal, declaradamente acolhedor e informal (bio do Instagram com emoji, tom de "atendimento personalizado"); copiar o verde-escuro institucional da Care emprestaria uma escala e um tom clínico que não é o do Ser Bem, e apagaria a identidade de marca (terracota/rosa) que já existe.

### 2. gcpro.com.br — ERP B2B

**Credencial:** nenhuma de nicho — é a referência de acabamento de UI pedida pelo usuário, não de conteúdo.

**O que tirar:** confiança de grid, escala tipográfica ousada, execução limpa de fundo escuro (se uma direção escura for escolhida), uso de um único acento de cor de forma consistente.

**O que NÃO copiar e por quê:** o tom inteiro — frio, técnico, corporativo B2B, acento verde-neon "software". É o oposto de um espaço de bem-estar íntimo com uma logo de traço manual/orgânico. Copiar o tom do gcpro tornaria o site do Ser Bem genérico ("parece demo de SaaS"), justamente o erro que este portão existe para evitar.

## Próximo passo

Renderizar 2–3 direções distintas do Hero (+ um bloco de apoio) usando essas travas, para escolha do dono antes de qualquer tela completa.
