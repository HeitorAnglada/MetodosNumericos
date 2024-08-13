function bisectionMethod(f, a, b, tol) {
    if (f(a) * f(b) >= 0) { // se os sinais forem iguais resultado positivo, intervalo inválido
        throw new Error("A função não muda de sinal no intervalo fornecido.");
    }

    // se os sinais são diferentes resultado negativo, intervalo válido
    while (Math.abs(b - a)/2 > tol) {
        let midpoint = (a + b) / 2; // ponto médio do novo intervalo
        if (f(midpoint) === 0) { // raiz encontrada
            return midpoint;
        } else if (f(a) * f(midpoint) < 0) { // se o f(a) multiplicado pela raiz for negativo o intervalo é válido, logo o B é substituido pelo midpoint 
            b = midpoint;
        } else {
            a = midpoint; // e o f(a) multiplicado pela raiz for positivo o intervalo é inválido, logo o A é substituido pelo midpoint
        }
    }
    return (a + b) / 2; 
}

function suggestIntervals(f, a, b) { // caso intervalo seja muito grande, função que sugere novos intervalos dentro do intervalo
    let possibleIntervals = [];
    for (let i = a; i < b; i++) { // verifica todos os sub intervalos de tamanho 1
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

    if (Math.abs(b - a) > 1) {
        let possibleIntervals = suggestIntervals(f, a, b);

        if (possibleIntervals.length === 0) {
            document.getElementById("sugest").textContent = "Nenhum intervalo válido encontrado. Tente outro intervalo inicial.";
        } else {
            let intervalsString = possibleIntervals.map(interval => `[${interval[0]}, ${interval[1]}]`).join(", ");
            document.getElementById("sugest").textContent = "Intervalo(s) menor(es) encontrado(s): " + intervalsString;
        }
    } 
    try {
        const root = bisectionMethod(f, a, b, tol);
        document.getElementById("result").textContent = "Raiz aproximada: " + root;
    } catch (error) {
        document.getElementById("result").textContent = "Erro: " + error.message;
    }
    
}
