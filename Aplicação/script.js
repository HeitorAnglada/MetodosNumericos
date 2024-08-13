function bisectionMethod(f, a, b, tol) {
    if (f(a) * f(b) >= 0) {
        throw new Error("A função não muda de sinal no intervalo fornecido.");
    }

    while (Math.abs(b - a) > tol) {
        let midpoint = (a + b) / 2;
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

function calculateRoot() {
    const functionInput = document.getElementById("function").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const tol = parseFloat(document.getElementById("tolerance").value);

    const f = new Function('x', 'return ' + functionInput);

    try {
        const root = bisectionMethod(f, a, b, tol);
        document.getElementById("result").textContent = "Raiz aproximada: " + root;
    } catch (error) {
        document.getElementById("result").textContent = "Erro: " + error.message;
    }
}
