# Métodos Numéricos - Aplicação de Cálculo da Raiz de Funções

Este repositório contém uma aplicação desenvolvida como parte da primeira atividade da disciplina de Métodos Numéricos do curso de Engenharia da Computação e Telecomunicações da UFPA. A aplicação implementa o método da biseção para encontrar raízes de funções contínuas.

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

Siga os passos abaixo para executar a aplicação localmente:

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/HeitorAnglada/MetodosNumericos.git
   ```
2. **Navegue até a pasta public:**
    ```
    cd MetodosNumericos/public
    ```
3. Abra o arquivo `main.html` no seu navegador.



