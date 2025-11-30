**Contexto:**
Você é um Engenheiro de Software Sênior especialista em desenvolvimento web moderno. Eu preciso que você crie o código (ou a estrutura completa de projeto) para um aplicativo de gestão de times de futebol para amigos ("Pelada"). O foco é simplicidade de uso, visual intuitivo e um algoritmo justo de balanceamento de times. o nome do app é "Fut Cricket".

**Stack Tecnológica Sugerida:**
- Frontend: React (Next.js)
- Estilização: Tailwind CSS
- Ícones: Lucide-React ou Emojis (conforme especificado abaixo)
- Estado/Persistência: Firebase Realtime Database. Foi escolhido por ser um banco de dados em tempo real que é mais fácil de usar e manter. Já foi disponibilizado um projeto Firebase para o app, sua configuração está disponível no arquivo firebase-config.js.

**Funcionalidades Detalhadas:**

**1. Módulo de Cadastro de Jogadores (Player Registry)**
Crie uma tela de formulário para adicionar jogadores à base de dados.
- **Campos:**
  - `Nome` (Texto)
  - `Tipo`: Seleção entre "Mensalista" ou "Diarista".
  - `Avatar`: Será gerado automaticamente com as iniciais do nome.
- **Avaliação de Skills (Rating 1 a 5):**
  O formulário deve conter 5 sliders ou inputs de 1 a 5 para os seguintes atributos, obrigatoriamente representados nesta orgem e pelos ícones visuais abaixo:
  - **Velocidade:** Ícone de bonequinho correndo (🏃 ou Lucide `Zap`/`PersonRunning`)
  - **Vigor Físico:** Ícone de braço musculoso (💪 or Lucide `Biceps`/`Dumbbell`)
  - **Inteligência:** Ícone de cérebro (🧠 or Lucide `Brain`)
  - **Visão de Jogo:** Ícone de óculos/olhos (👓 or Lucide `Glasses`/`Eye`)
  - **Técnica:** Ícone de bola de futebol (⚽ or Lucide `Trophy`/`Activity`)
- **Listagem:** Exibir uma tabela ou cards com os jogadores já cadastrados, 
  - Exibir a média geral (Overall) de cada um baseada nas 5 skills. 
  - Cada jogador cadastrado poderá ser selecionado para edição de suas skills, nome ou tipo (mensalista/diarista) ou exclusão.

**2. Módulo de Sorteio de Times (Match Setup)**
Uma tela para configurar a partida do dia.
- **Seleção de Data:** Input de data para o jogo.
- **Quantidade de Times:** Input numérico (ex: 2, 3 ou 4 times).
- **Seleção de Presença:** Uma lista de check-box com todos os jogadores cadastrados para marcar quem vai jogar hoje.
- **Ação:** Botão "Sortear Times".

**3. Algoritmo de Balanceamento (Lógica Crítica)**
Ao clicar em "Sortear Times", o app deve executar um algoritmo que:
1. Calcula o "Score Total" de cada jogador (soma ou média das 5 skills).
2. Distribui os jogadores selecionados entre o número de times escolhido (ex: Time A, Time B).
3. **Objetivo:** Minimizar a diferença entre a soma dos Scores Totais de cada time. Os times devem ficar o mais equilibrados possível matematicamente.
4. Exibir o resultado na tela separando os jogadores por time e mostrando a "Força Total" de cada time para comparação.
5. Uma vez com os times gerados, será possível sortear os times novamente sempre trazendo resultados diferentes.

**Requisitos de Interface (UI/UX):**
- Design mobile-first (responsivo).
- Use cartões visuais para os jogadores.
- Feedback visual claro das skills (ex: barras de progresso ou estrelas ao lado dos ícones).

**Saída Esperada:**
Gere todo o código do app, a lógica do algoritmo de balanceamento em uma função separada e a estrutura de dados (interfaces/types) necessária.
