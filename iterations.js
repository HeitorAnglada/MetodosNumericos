function bisectionMethod(f, a, b, tol, iterations) {
    if (f(a) * f(b) >= 0) {
        throw new Error("A função não muda de sinal no intervalo fornecido.");
    }

    let iterationCount = 0;
    while (Math.abs(b - a) / 2 > tol) {
        let midpoint = (a + b) / 2;

        iterations.push(`Iteração ${++iterationCount}: a = ${a.toFixed(4)}, b = ${b.toFixed(4)}, midpoint = ${midpoint.toFixed(4)}, f(midpoint) = ${f(midpoint).toFixed(4)}`);

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

function suggestIntervals(f, a, b) {
    let possibleIntervals = [];
    for (let i = a; i < b; i++) {
        if (f(i) * f(i + 1) <= 0) {
            possibleIntervals.push([i, i + 1]);
        }
    }
    return possibleIntervals;
}

function calculateRoot() {
    const functionInput = document.getElementById("function").value;
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    const tol = parseFloat(document.getElementById("tolerance").value);

    const f = new Function('x', 'return ' + functionInput);

    const showIterationsCheckbox = document.getElementById("showIterationsCheckbox");
    const iterationsContainer = document.getElementById("iterationsContainer");
    const iterationsPre = document.getElementById("iterations");

    if (b - a > 1) {
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
            const iterations = [];
            const root = bisectionMethod(f, a, b, tol, iterations);

            document.getElementById("result").textContent = "Raiz aproximada: " + root;

            if (showIterationsCheckbox.checked) {
                iterationsContainer.style.display = "block";
                iterationsPre.textContent = iterations.join("\n");
            } else {
                iterationsContainer.style.display = "none";
            }

        } catch (error) {
            document.getElementById("result").textContent = "Erro: " + error.message;
            iterationsContainer.style.display = "none"; // Oculta a caixa de iterações em caso de erro
        }
    }
}
