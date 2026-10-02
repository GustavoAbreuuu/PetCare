# PETCARE+

É um projeto que está sendo desenvolvido através de um guia estruturado de IA utilizando Codex. Este repositório demonstra a metodologia de desenvolvimento autônomo guiado por **ExecPlans** (`PLANS.md`) 

## **Como os Requisitos (** **srs.txt** **) são Executados Passo a Passo via ExecPlans (** **PLANS.md** **)**

Este repositório exemplifica o fluxo completo de desenvolvimento de software onde **requisitos de negócio (** **srs.txt** **)** são consumidos por um agente de inteligência artificial (Codex) e transformados em um sistema funcional e validado através de um **ExecPlan vivo (** **PLANS.md** **)**, respeitando as diretrizes globais do projeto (`PLANS.md`).

## **Entrada de Requisitos (** **srs.txt** **)**

O arquivo `srs.txt` (Software Requirements Specification) é a fonte inicial de verdade do negócio. Ele contém a descrição em linguagem natural ou semi-estruturada do que o sistema precisa fazer (por exemplo: rotas HTTP esperadas, regras de autenticação, telas de frontend, banco de dados desejado e integrações).

## Tradução dos Requisitos em um ExecPlan Vivo **(** **srs.txt** **Para** **PLANS.md** **)**

O agente Codex lê as especificações de `srs.txt` e as traduz em um **documento de design autossuficiente (** **PLANS.md** **)**. Se o plano estiver em estágio inicial, a IA completa e estrutura os requisitos brutos nas seguintes seções técnicas:

* **Purpose / Big Picture:** Define o objetivo final do sistema e o valor entregue ao usuário a partir dos requisitos de `srs.txt`.
* **Plan of Work &amp; Concrete Steps:** Mapeia a arquitetura técnica necessária (ex.: MSC, Prisma ORM, JWT, Docker) e lista os comandos exatos de terminal e caminhos completos de arquivos a serem criados.
* **Progress:** Transforma as funcionalidades solicitadas em `srs.txt` em um *checklist* técnico e verificável de tarefas (`[ ]`).
* **Validation and Acceptance:** Estabelece os critérios de aceite baseados nos requisitos (ex.: chamadas `curl` para testar cada endpoint solicitado no `srs.txt`).

* ## Ciclo de Execução Incremental e Autônoma

Com o `PLANS.md` devidamente preenchido a partir dos requisitos de `srs.txt`, o Codex entra no loop contínuo de implementação:

* **Identificação da Tarefa:** Seleciona o próximo item pendente (`[ ]`) no capítulo *Progress*.
* **Escrita e Configuração:** Cria/edita arquivos de código, configura schemas de banco de dados, variáveis de ambiente (`.env`) e dependências conforme o especificado.
* **Validação Observável:** Executa comandos reais de validação (compilação, migrations do banco, início de servidores ou chamadas HTTP a endpoints).
* **Atualização do Documento Vivo:**
* Marca as tarefas concluídas com `[x]` no **Progress**.
* Registra decisões arquiteturais no **Decision Log**.
* Documenta imprevistos e soluções técnicas em **Surprises &amp; Discoveries**.

## Validação Final e Retrospectiva

O ciclo se encerra apenas quando:

* Todas as funcionalidades descritas em `srs.txt` foram implementadas, testadas e marcadas como concluídas (`[x]`) no `PLANS.md`.
* Todos os critérios de aceite foram confirmados com evidências reais no terminal.
* O capítulo **Outcomes &amp; Retrospective** é preenchido com o resumo dos entregáveis, garantindo que o sistema atende integralmente aos requisitos originais.
