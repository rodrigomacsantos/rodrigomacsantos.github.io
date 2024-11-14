// Array para armazenar os produtos no cesto
let cestoItems = [];

// Função para formatar preço
const formatPrice = (price) => `${price.toFixed(2)} €`;

// Função para adicionar produto ao cesto
function adicionarAoCesto(product) {
    cestoItems.push(product);
    atualizarCesto();
}

// Função para remover produto do cesto
function removerDoCesto(productId) {
    const index = cestoItems.findIndex(item => item.id === productId);
    if (index > -1) {
        cestoItems.splice(index, 1);
        atualizarCesto();
    }
}

// Função para atualizar a exibição do cesto
function atualizarCesto() {
    const cestoContainer = document.getElementById('cesto-items');
    const totalElement = document.getElementById('preco-total');
    
    // Limpa o conteúdo atual do cesto
    cestoContainer.innerHTML = '';
    
    // Adiciona cada item do cesto
    cestoItems.forEach(item => {
        const cestoItem = document.createElement('article');
        cestoItem.className = 'cesto-item';
        cestoItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="/api/placeholder/100/100" alt="${item.title}">
            <p class="produto-preco">Custo total: ${formatPrice(item.price)}</p>
            <button class="remover-do-cesto" onclick="removerDoCesto(${item.id})">
                - Remover do Cesto
            </button>
        `;
        cestoContainer.appendChild(cestoItem);
    });
    
    // Atualiza o preço total
    const total = cestoItems.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = `Custo total: ${formatPrice(total)}`;
}

// Função para criar os cards dos produtos
function criarProdutoCard(product) {
    const article = document.createElement('article');
    article.innerHTML = `
        <img src="/api/placeholder/200/200" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="produto-preco">Custo total: ${formatPrice(product.price)}</p>
        <p class="produto-descricao">${product.description}</p>
        <button class="adicionar-ao-cesto" onclick="adicionarAoCesto(${JSON.stringify(product).replace(/"/g, '&quot;')})">
            + Adicionar ao Cesto
        </button>
    `;
    return article;
}

// Carrega os produtos na página
window.onload = function() {
    const produtosContainer = document.getElementById('produtos-grid');
    
    // Dados dos produtos (normalmente viriam de uma API)
    const produtos = ${JSON.stringify(produtos, null, 2)};
    
    // Cria e adiciona os cards dos produtos
    produtos.forEach(product => {
        produtosContainer.appendChild(criarProdutoCard(product));
    });
};