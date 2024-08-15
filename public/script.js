const funInput = document.getElementById("function");
const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputTol = document.getElementById("tolerance");


const showIterationsCheckbox = document.getElementById("showIterationsCheckbox");
const iterationsContainer = document.getElementById("iterationsContainer");
const iterationsPre = document.getElementById("iterations");

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
function bisectionMethod(f, a, b, tol) {
    if (f(a) * f(b) >= 0) {
        throw new Error("A função não muda de sinal no intervalo fornecido.");
    }

    let iterationCount = 0;
    while (Math.abs(b - a) / 2 > tol) {
        let midpoint = (a + b) / 2;

        iterations = [...iterations, `Iteração ${++iterationCount}: a = ${a.toFixed(4)}, b = ${b.toFixed(4)}, midpoint = ${midpoint.toFixed(4)}, f(midpoint) = ${f(midpoint).toFixed(4)}`]; 
        if (f(midpoint) === 0) {
            return midpoint;
        } else if (f(a) * f(midpoint) < 0) {
            b = midpoint;
        } else {
            a = midpoint;
        }
    }

    return (a + b) / 2;
}

/**
 * Encontra todos os intervalos dentro do intervalo dado onde a função f muda de sinal.
 *
 * @param {function} f - A função para verificar mudanças de sinal.
 * @param {number} a - O limite inferior do intervalo.
 * @param {number} b - O limite superior do intervalo.
 * @return {Array<Array<number>>} Uma matriz de intervalos onde a função f muda de sinal.
 */
function suggestIntervals(f, a, b) {
    let possibleIntervals = [];
    for (let i = a; i < b; i++) {
        if (f(i) * f(i + 1) <= 0) {
            possibleIntervals.push([i, i + 1]);
        }
    }
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
    if (Math.abs(b - a) > 1) {
        let possibleIntervals = suggestIntervals(f, a, b);

        if (possibleIntervals.length === 0) {
            document.getElementById("result").textContent = "Nenhum intervalo válido encontrado. Tente outro intervalo inicial.";
        } else {
            let intervalsString = possibleIntervals.map(interval => `[${interval[0]}, ${interval[1]}]`).join(", ");
            document.getElementById("result").textContent = "Possíveis intervalos: " + intervalsString;
        }

        iterationsContainer.style.display = "none"; // Oculta a caixa de iterações se o intervalo for grande
    } else {
        try {
            const root = bisectionMethod(f, a, b, tol);

            document.getElementById("result").textContent = "Raiz aproximada: " + root;

            if (showIterationsCheckbox.checked) {
                showIterations(true);
            }

        } catch (error) {
            document.getElementById("result").textContent = "Erro: " + error.message;
            iterationsContainer.style.display = "none"; // Oculta a caixa de iterações em caso de erro
        }
    }
}
