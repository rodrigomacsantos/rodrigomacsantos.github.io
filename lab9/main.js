// Verifica se já existe uma chave 'produtos-selecionados' no localStorage
if(!localStorage.getItem('produtos-selecionados')){
    // Se não existir, cria um array vazio no localStorage para armazenar os produtos
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Função para criar um elemento de produto na página de listagem de produtos
function criarProduto(produto){
    // Cria um elemento <article> para conter todas as informações do produto
    const article = document.createElement(`article`);    
    
    // Cria um elemento <h3> para o título do produto
    const title = document.createElement(`h3`);         
    // Define o texto do título como o título do produto
    title.textContent = produto.title;
    // Adiciona o título ao elemento article
    article.append(title);
    
    // Cria um elemento <img> para a imagem do produto
    const image = document.createElement(`img`);          
    // Define o src da imagem como a URL da imagem do produto
    image.src = produto.image;
    // Adiciona a imagem ao elemento article
    article.append(image);
    
    // Cria um elemento <h4> para o preço do produto
    const price = document.createElement(`h4`);
    // Define o texto do preço, adicionando o símbolo de euro
    price.textContent = produto.price + " €";
    // Adiciona o preço ao elemento article
    article.append(price);
    
    // Cria um elemento <p> para a descrição do produto
    const description = document.createElement(`p`);
    // Define o texto da descrição
    description.textContent = produto.description;
    // Adiciona a descrição ao elemento article
    article.append(description);
    
    // Cria um botão para adicionar o produto ao carrinho
    const button = document.createElement(`button`);
    // Define o texto do botão
    button.textContent = "+ Adicionar ao Cesto"
    // Adiciona o botão ao elemento article
    article.append(button);
    
    // Adiciona um evento de clique no botão para adicionar o produto ao carrinho
    button.addEventListener("click", () => {
        // Recupera a lista de produtos atual do localStorage
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));        
        
        // Adiciona o produto atual à lista de produtos
        lista.push(produto);
        
        // Salva a lista atualizada no localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));
        
        // Chama a função para atualizar a visualização do cesto
        atualizaCesto();
    });
    
    // Retorna o elemento article completo
    return article;
}

// Função para carregar todos os produtos na página
function carregarProdutos(produtos){
    // Percorre cada produto no array de produtos
    produtos.forEach(produto => {
        // Encontra a seção de produtos no documento
        const section = document.getElementById("produtos");   
        // Adiciona cada produto criado à seção de produtos
        section.append(criarProduto(produto));  
    });
}

// Função para criar um produto no cesto de compras
function criarProdutoCesto(produto){
    // Cria um elemento <article> para o produto no cesto
    const article = document.createElement(`article`); 
    
    // Cria um elemento <h3> para o título do produto
    const title = document.createElement(`h3`);         
    // Define o texto do título
    title.textContent = produto.title;
    // Adiciona o título ao elemento article
    article.append(title);
    
    // Cria um elemento <img> para a imagem do produto
    const image = document.createElement(`img`);          
    // Define o src da imagem
    image.src = produto.image;
    // Adiciona a imagem ao elemento article
    article.append(image);
    
    // Cria um elemento <h4> para o preço do produto
    const price = document.createElement(`h4`);
    // Define o texto do preço, adicionando o símbolo de euro
    price.textContent = produto.price + " €";
    // Adiciona o preço ao elemento article
    article.append(price);
    
    // Cria um botão para remover o produto do cesto
    const button = document.createElement(`button`);
    // Define o texto do botão
    button.textContent = "- Remover do Cesto"
    // Adiciona o botão ao elemento article
    article.append(button);
    
    // Adiciona um evento de clique no botão para remover o produto do cesto
    button.addEventListener("click", () => {
        // Recupera a lista de produtos atual do localStorage
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados')); 
        
        // Encontra o índice do produto a ser removido comparando os IDs
        const indice = lista.findIndex(item => item.id === produto.id);
        
        // Remove o produto da lista usando o índice encontrado
        const retirado = lista.splice(indice, 1);
        
        // Salva a lista atualizada no localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));
        
        // Encontra a seção do cesto no documento
        const section = document.getElementById("cesto");  
        // Remove o elemento article do cesto
        section.removeChild(article);
        
        // Atualiza a visualização do cesto
        atualizaCesto();
    });
    
    // Retorna o elemento article completo
    return article;
}

// Função para atualizar a visualização do cesto de compras
function atualizaCesto(){
    // Encontra a seção do cesto no documento
    const section = document.getElementById("cesto"); 
    
    // Limpa o conteúdo atual do cesto
    section.innerHTML = "";
    
    // Inicializa a variável para calcular o custo total como zero
    let somaTotal = 0;
    
    // Recupera a lista de produtos do localStorage
    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));
    
    // Percorre cada produto na lista
    lista.forEach(produto => {          
        // Adiciona cada produto ao cesto
        section.append(criarProdutoCesto(produto)); 
        // Soma o preço do produto ao custo total
        somaTotal += produto.price;
    })
    
    // Atualiza o elemento de custo total, formatando para duas casas decimais
    document.getElementById("custoTotal").textContent = somaTotal.toFixed(2) + " €";
}   

// Adiciona um evento para carregar produtos e atualizar o cesto quando o DOM for completamente carregado
addEventListener("DOMContentLoaded", () => {
    // Chama a função para carregar todos os produtos
    carregarProdutos(produtos);
    // Chama a função para atualizar o cesto
    atualizaCesto();
})