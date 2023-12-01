async function handleSearch() {
    const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();

    // Obtendo a lista de alimentos
    const alimentos = await fetchAlimentos(); // Alterado para aguardar a resposta

    // Filtrando os alimentos com base no termo de busca
    const resultados = alimentos.filter(alimento =>
        alimento.nome.toLowerCase().includes(searchTerm)
    );

    displayResults(resultados);
}

async function fetchAlimentos() {
    try {
        const response = await fetch('https://jsonserver.samaranegabriel.repl.co/alimentos');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar os alimentos da API:", error);
        return [];
    }
}

function displayResults(resultados) {
    const resultsDiv = document.getElementById('results');

    if (resultados.length === 0) {
        resultsDiv.innerHTML = 'Nenhum alimento encontrado.';
        return;
    }

    const html = resultados.map(alimento => `
    <div>
        <h3>${alimento.nome}</h3>
        <p>Quantidade: ${alimento.quantidade}</p>
        <p>Lote: ${alimento.lote}</p>
    </div>
    `).join('');

    resultsDiv.innerHTML = html;
}