const funInput = document.getElementById("function");
const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputTol = document.getElementById("tolerance");

// criando elementos
const showIterationsCheckbox = document.getElementById("showIterationsCheckbox");
const iterationsContainer = document.getElementById("iterationsContainer");
const iterationsPre = document.getElementById("iterations");


// inicializando variáveis
let iterations = [];
let functionInput = funInput.value;
let a = parseFloat(inputA.value);
let b = parseFloat(inputB.value);
let tol = parseFloat(inputTol.value);
let f = new Function('x', 'return ' + functionInput);

// adicionando evento de mudança no checkbox
showIterationsCheckbox.addEventListener("change", function() {
    showIterations(this.checked);
});

// adicionando evento de mudança nos inputA
inputA.addEventListener("change", e => {
    a = parseFloat(e.target.value);
});

// adicionando evento de mudança nos inputB
inputB.addEventListener("change", e => {
    b = parseFloat(e.target.value);
});

// adicionando evento de mudança nos inputTol
inputTol.addEventListener("change", e => {
    tol = parseFloat(e.target.value);
});

// adicionando evento de mudança na função
funInput.addEventListener("change", e => {
    functionInput = e.target.value;
    f = new Function('x', 'return ' + functionInput);
});

/**
 * Toggles the display of the iterations container based on the `show` parameter.
 * If `show` is true, the iterations container is displayed. Otherwise, it is hidden.
 *
 * @param {boolean} show - Indicates whether to show or hide the iterations container.
 */
function showIterations(show) {
    // If show is true, display the iterations container.
    if (show) {
        // Set the display style of the iterations container to "block", making it visible.
        iterationsContainer.style.display = "block";
        // Set the text content of the iterations container to the joined iterations array,
        // with each iteration on a new line.
        iterationsPre.textContent = iterations.join("\n");
    }
    // If show is false, hide the iterations container.
    else {
        // Set the display style of the iterations container to "none", making it invisible.
        iterationsContainer.style.display = "none";
    }
}

/**
 * Encontra a raiz de uma função usando o método da bissecção.
 *
 * @param {function} f - A função para encontrar a raiz.
 * @param {number} a - O limite inferior do intervalo.
 * @param {number} b - O limite superior do intervalo.
 * @param {number} tol - A tolerância para a aproximação.
 * @return {number} A raiz aproximada da função.
 */
function bisectionMethod(f, a, b, tol, maxIterations = 1000) {
    // Verifica se a função muda de sinal no intervalo
    if (f(a) * f(b) >= 0) {
        throw new Error("A função não muda de sinal no intervalo fornecido.");
    }

    // Inicializa o contador de iterações
    let iterationCount = 0;

    // Enquanto o comprimento do intervalo for maior que a tolerância e o número de iterações for menor que o máximo,
    // executa o loop de iteração
    while (Math.abs(b - a) / 2 > tol && iterationCount < maxIterations) {
        // Calcula o ponto médio do intervalo
        let midpoint = (a + b) / 2;

        // Adiciona o registro da iteração atual na matriz de iterações
        iterations = [...iterations, `Iteração ${++iterationCount}: a = ${a.toFixed(4)}, b = ${b.toFixed(4)}, midpoint = ${midpoint.toFixed(4)}, f(midpoint) = ${f(midpoint).toFixed(4)}`];

        // Verifica se o valor absoluto da função no ponto médio é menor que uma tolerância muito pequena
        if (Math.abs(f(midpoint)) < 1e-10) {
            // Se sim, retorna o ponto médio como a raiz aproximada
            return midpoint;
        } else if (f(a) * f(midpoint) < 0) {
            // Se a função muda de sinal entre o ponto médio e o limite inferior,
            // atualiza o limite superior para o ponto médio
            b = midpoint;
        } else {
            // Se a função muda de sinal entre o ponto médio e o limite superior,
            // atualiza o limite inferior para o ponto médio
            a = midpoint;
        }
    }

    // Se o número máximo de iterações for atingido, lança um erro
    if (iterationCount >= maxIterations) {
        throw new Error("O número máximo de iterações foi atingido. A convergência pode não ter ocorrido.");
    }

    // Se a tolerância for alcançada, retorna o ponto médio como a raiz proximada
    return (a + b) / 2;
}

/**
 * Encontra todos os intervalos dentro do intervalo dado onde a função f muda de sinal.
 *
 * Essa função itera sobre o intervalo [a, b] e verifica se a função f muda de sinal em cada
 * ponto. Se a função muda de sinal, o intervalo é adicionado na matriz de intervalos.
 *
 * @param {function} f - A função para verificar mudanças de sinal.
 * @param {number} a - O limite inferior do intervalo.
 * @param {number} b - O limite superior do intervalo.
 * @return {Array<Array<number>>} Uma matriz de intervalos onde a função f muda de sinal.
 */
function suggestIntervals(f, a, b) {
    // Inicializa a matriz de intervalos
    let possibleIntervals = [];

    // Itera sobre o intervalo
    for (let i = a; i < b; i++) {
        // Verifica se a função muda de sinal no ponto atual
        if (f(i) * f(i + 1) <= 0) {
            // Se sim, adiciona o intervalo na matriz de intervalos
            possibleIntervals.push([i, i + 1]);
        }
    }

    // Retorna a matriz de intervalos
    return possibleIntervals;
}

/**
 * Calcula a raiz de uma função dada dentro de um intervalo especificado.
 *
 * Se o intervalo for muito grande, sugere possíveis intervalos onde a função muda de sinal.
 * Caso contrário, utiliza o método da bissecção para encontrar a raiz aproximada.
 *
 * @return {number} A raiz aproximada da função, ou uma mensagem de erro se o cálculo falhar.
 */
function calculateRoot() {
    // Verifica se o intervalo é muito grande
    if (Math.abs(b - a) > 1) {
        // Encontra todos os intervalos possíveis dentro do intervalo dado
        let possibleIntervals = suggestIntervals(f, a, b);

        if (possibleIntervals.length === 0) {
            // Mostra mensagem de erro se nenhum intervalo válido for encontrado
            document.getElementById("result").textContent = "Nenhum intervalo válido encontrado. Tente outro intervalo inicial.";
        } else {
            // Mostra os intervalos possíveis
            let intervalsString = possibleIntervals.map(interval => `[${interval[0]}, ${interval[1]}]`).join(", ");
            document.getElementById("result").textContent = "Possíveis intervalos: " + intervalsString;
        }

        // Oculta a caixa de iterações se o intervalo for grande
        iterationsContainer.style.display = "none"; 
    } else {
        try {
            // Utiliza o método da bissecção para encontrar a raiz aproximada
            const root = bisectionMethod(f, a, b, tol);

            // Mostra a raiz aproximada encontrada
            document.getElementById("result").textContent = "Raiz aproximada: " + root;

            // Mostra as iterações se o checkbox estiver marcado
            if (showIterationsCheckbox.checked) {
                showIterations(true);
            }

        } catch (error) {
            // Mostra mensagem de erro se o cálculo falhar
            document.getElementById("result").textContent = "Erro: " + error.message;
            // Oculta a caixa de iterações em caso de erro
            iterationsContainer.style.display = "none"; 
        }
    }
}
