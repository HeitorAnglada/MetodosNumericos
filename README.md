# Métodos Numéricos - Aplicação de Cálculo da Raiz de Funções

Este repositório contém uma aplicação desenvolvida como parte da primeira atividade da disciplina de Métodos Numéricos do curso de Engenharia da Computação e Telecomunicações da UFPA. A aplicação implementa o método da biseção para encontrar raízes de funções contínuas.

### Ferramentas usadas no projeto

<div style="display: inline_block"><br>
  <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DC3A?style=for-the-badge&logo=javascript&logoColor=white">
  <img align="center" alt="Docker" src="https://img.shields.io/badge/Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white">
  <img align="center" alt="Node.js" src="https://img.shields.io/badge/Node.js-5F8D4E?style=for-the-badge&logo=node.js&logoColor=white">
  <img align="center" alt="HTML" src="https://img.shields.io/badge/HTML_5-E14D2A?style=for-the-badge&logo=HTML5&logoColor=white">
  <img align="center" alt="CSS" src="https://img.shields.io/badge/CSS-0081B4?style=for-the-badge&logo=css3&logoColor=white"> 
  <img align="center" alt="Express.js" src="https://img.shields.io/badge/Express.js-61876E?style=for-the-badge&logo=express&logoColor=white"> 
</div>

## Descrição

O método da biseção é uma técnica de aproximação numérica utilizada para encontrar raízes de funções contínuas. Este método se baseia no Teorema do Valor Intermediário, que afirma que, se uma função contínua muda de sinal em um intervalo \([a, b]\), então existe pelo menos uma raiz dentro desse intervalo.

**Passos do Método da Biseção:**

1. **Escolha do Intervalo:** Selecione um intervalo \([a, b]\) tal que \(f(a)\) e \(f(b)\) tenham sinais opostos.
2. **Cálculo do Ponto Médio:** Calcule o ponto médio \(c = \frac{a + b}{2}\).
3. **Avaliação do Sinal:** Verifique o sinal de \(f(c)\):
   - Se \(f(c) = 0\), então \(c\) é a raiz.
   - Se \(f(a)\) e \(f(c)\) têm o mesmo sinal, substitua \(a\) por \(c\).
   - Caso contrário, substitua \(b\) por \(c\).
4. **Repetição:** Repita os passos até que o intervalo seja suficientemente pequeno, o que indicará que a raiz foi aproximada com precisão.

## Como Executar

Siga um dos métodos abaixo para executar a aplicação localmente:

### 1. Via HTML ![HTML](https://img.icons8.com/color/48/000000/html-5.png)

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/HeitorAnglada/MetodosNumericos.git
   ```
2. **Navegue até a pasta public:**
    ```
    cd MetodosNumericos/public
    ```
3. Abra o arquivo `main.html` no seu navegador.

### 2. Via NodeJS ![NodeJS](https://img.icons8.com/color/48/000000/nodejs.png)

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/HeitorAnglada/MetodosNumericos.git
   ```
2. **Navegue até a pasta do projeto:**
    ```bash
    cd MetodosNumericos
    ```
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute a aplicação:

   ```bash
   node server.js
   ```
   Saida:

   ```bash
   Server listening on port 8081
   ```
   Acesso a aplicação: http://localhost:8081

### 3. Via Docker ![Docker](https://img.icons8.com/color/48/000000/docker.png)

Docker pode ser usado para construir e executar o container.

Tem duas formas de construir e executar o container um a imagem já construída pelo GitHub e o outro utilizando o Docker build.

#### 3.1. Via GitHub

1. **Baixa a imagem:**

   ```bash
   docker pull heitoranglada/metodosnumericos:main
   ```

2. **Executa o container:**

   ```bash
   docker -d run -p 8081:8081 heitoranglada/metodosnumericos:main
   ```

   Acesso a aplicação: http://localhost:8081

#### 3.2. Via Docker

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/HeitorAnglada/MetodosNumericos.git
   ```
2. **Navegue até a pasta do projeto:**
    ```bash
    cd MetodosNumericos
    ```
3. Construa o container:

   ```bash
   docker build -t metodosnumericos .
   ```

4. Execute o container:

   ```bash
   docker -d run -p 8081:8081 metodosnumericos
   ```

   Acesso a aplicação: http://localhost:8081

## Tela da Aplicação ##
![Tela da Aplicação](/image/CapturadeTela.png)

## Diagrama de Blocos ##
![Driagrama de Blocos](/image/Diagrama.png)


