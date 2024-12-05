// Verifica se já existe um item no localStorage com a chave 'produtos-selecionados'.
// Caso não exista, inicializa com um array vazio.
if(!localStorage.getItem('produtos-selecionados')){
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Declaração de um array vazio para armazenar os produtos.
let produtos = [];

// Faz uma requisição para buscar os produtos da API.
fetch("https://deisishop.pythonanywhere.com/products/")
.then(response => response.json()) // Converte a resposta em JSON.
.then(data => {
    console.log(data); // Log dos dados no console para debug.
    produtos = data; // Atribui os produtos recebidos à variável `produtos`.
    carregarProdutos(produtos); // Chama a função para carregar os produtos na interface.
});

// Função para criar o elemento HTML de um produto.
function criarProduto(produto){
    const article = document.createElement(`article`); // Cria um elemento <article>.

    const title = document.createElement(`h3`); // Cria um elemento <h3> para o título.
    title.textContent = produto.title; // Define o título do produto.
    article.append(title); // Adiciona o título ao article.

    const image = document.createElement(`img`); // Cria um elemento <img> para a imagem do produto.
    image.src = produto.image; // Define o caminho da imagem.
    article.append(image); // Adiciona a imagem ao article.

    const price = document.createElement(`h4`); // Cria um elemento <h4> para o preço.
    price.textContent = produto.price + " €"; // Define o texto com o preço.
    article.append(price); // Adiciona o preço ao article.

    const description = document.createElement(`p`); // Cria um elemento <p> para a descrição.
    description.textContent = produto.description; // Define o texto da descrição.
    article.append(description); // Adiciona a descrição ao article.

    const button = document.createElement(`button`); // Cria um botão.
    button.textContent = "+ Adicionar ao Cesto"; // Define o texto do botão.
    article.append(button); // Adiciona o botão ao article.

    // Adiciona um evento de clique ao botão.
    button.addEventListener("click", () => {
        // Obtém a lista de produtos selecionados do localStorage.
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));        
        lista.push(produto); // Adiciona o produto atual à lista.
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista)); // Atualiza o localStorage.
        atualizaCesto(); // Atualiza o cesto de compras.
    });

    return article; // Retorna o elemento do produto.
}

// Função para carregar e exibir os produtos na página.
function carregarProdutos(prod){
    const section = document.getElementById("produtos"); // Seleciona a seção de produtos.
    section.innerHTML = ""; // Limpa o conteúdo existente.
    prod.forEach(produto => {
        section.append(criarProduto(produto)); // Adiciona cada produto à seção.
    });
}

// Função para criar um item do cesto de compras.
function criarProdutoCesto(produto){
    const article = document.createElement(`article`); // Cria um elemento <article>.

    const title = document.createElement(`h3`); // Cria um título para o produto.
    title.textContent = produto.title;
    article.append(title);

    const image = document.createElement(`img`); // Cria a imagem do produto.
    image.src = produto.image;
    article.append(image);
    
    const price = document.createElement(`h4`); // Cria um elemento para exibir o preço.
    price.textContent = produto.price + " €";
    article.append(price);

    const button = document.createElement(`button`); // Cria um botão para remover o produto.
    button.textContent = "- Remover do Cesto";
    article.append(button);

    // Evento para remover o produto do cesto e do localStorage.
    button.addEventListener("click", () => {
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados')); 
        const indice = lista.findIndex(item => item.id === produto.id); // Encontra o índice do produto.
        lista.splice(indice, 1); // Remove o produto da lista.
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista)); // Atualiza o localStorage.

        const section = document.getElementById("cesto"); // Seleciona a seção do cesto.
        section.removeChild(article); // Remove o elemento visual.
        atualizaCesto(); // Atualiza o estado do cesto.
    });
    return article; // Retorna o elemento do produto no cesto.
}

// Função para atualizar a visualização do cesto de compras.
function atualizaCesto(){
    const section = document.getElementById("cesto"); // Seleciona a seção do cesto.
    section.innerHTML = ""; // Limpa o conteúdo existente.
    let somaTotal = 0; // Inicializa a soma total.
    const lista = JSON.parse(localStorage.getItem('produtos-selecionados')); // Obtém os produtos do cesto.
    lista.forEach(produto => {          
        section.append(criarProdutoCesto(produto)); // Adiciona cada produto ao cesto.
        somaTotal += parseFloat(produto.price); // Soma os preços.
    });
    document.getElementById("custoTotal").textContent = somaTotal.toFixed(2) + " €"; // Atualiza o custo total.
}

// Evento que ocorre quando o DOM é carregado.
addEventListener("DOMContentLoaded",() => {    
    atualizaCesto(); // Atualiza o cesto.
    criarFiltros(); // Cria os filtros de categorias.
    ordenarPorPreco(); // Adiciona a funcionalidade de ordenação.
    pesquisar(); // Ativa a barra de pesquisa.
    comprar(); // Configura o botão de compra.
});

// Função para criar os filtros de categorias.
function criarFiltros(){    
    const filtrar = document.getElementById("filtros"); // Seleciona o elemento do filtro.
    fetch("https://deisishop.pythonanywhere.com/categories/")
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log das categorias no console.
        data.forEach(categoria => {
            const option = document.createElement("option"); // Cria uma opção para cada categoria.
            option.textContent = categoria; // Define o texto da opção.
            option.value = categoria; // Define o valor da opção.
            filtrar.append(option); // Adiciona a opção ao menu.
        });

        const section = document.getElementById("produtos");
        // Adiciona evento de alteração ao menu de categorias.
        filtrar.onchange = function(){             
            if(this.value != "todas"){ // Filtra produtos pela categoria selecionada.
                carregarProdutos(produtos.filter(produto => produto.category === this.value));
            } else { // Exibe todos os produtos se a opção for "todas".
                carregarProdutos(produtos);
            }
        };
    });
}

// Função para ordenar os produtos por preço.
function ordenarPorPreco(){
    const selectOrdenar = document.getElementById("ordenar"); // Seleciona o menu de ordenação.
    selectOrdenar.onchange = function(){
        console.log(this.value); // Log da opção selecionada.
        if (this.value === "ascendente"){ // Ordena em ordem crescente.
            carregarProdutos(produtos.sort((a, b) => a.rate - b.rate));
        } else if (this.value === "descendente"){ // Ordena em ordem decrescente.
            carregarProdutos(produtos.sort((a, b) => b.rate - a.rate));
        }
    };
}

// Função para pesquisar produtos.
function pesquisar(){
    const pesquisarProduto = document.getElementById("pesquisar"); // Seleciona a barra de pesquisa.
    pesquisarProduto.oninput = function(){
        // Filtra produtos cujo título inclui o texto digitado.
        carregarProdutos(produtos.filter(produto => produto.title.toLowerCase().includes(this.value.toLowerCase())));
        carregarProdutos(produtos.filter(produto => produto.description.toLowerCase().includes(this.value.toLowerCase())));
    };
}

// Função para realizar a compra.
function comprar(){ 
    const botaoComprar = document.getElementById("botao"); // Seleciona o botão de compra.
    let counter = 1; // Contador para exibir a referência apenas uma vez.
    botaoComprar.onclick = function(){
        let idProdutos = []; // Array para armazenar os IDs dos produtos no cesto.
        const produtosCarrinho = JSON.parse(localStorage.getItem('produtos-selecionados')); // Obtém os produtos do localStorage.
        produtosCarrinho.forEach(produto => {
            idProdutos.push(produto.id); // Adiciona o ID do produto ao array.
        });

        const checkBox = document.getElementById("alunoDeisi"); // Checkbox para desconto DEISI.
        const cupaoDesconto = document.getElementById("cupao"); // Input para cupom de desconto.
        const bodyEnvio = {
            products: idProdutos, // IDs dos produtos.
            student: checkBox.checked, // Status do checkbox.
            coupon: cupaoDesconto.value // Valor do cupom.
        };
        console.log(bodyEnvio); // Log do corpo da requisição.

        // Envia os dados para a API de compra.
        fetch('https://deisishop.pythonanywhere.com/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyEnvio)
        })
        .then(response => response.json())
        .then(data => {           
            // Atualiza o valor final e a referência de pagamento na interface.
            const section = document.getElementById("checkout");                                                     
            if(counter === 1){
                let newH3 = document.createElement('h3');
                newH3.id = "desconto";
                newH3.textContent = "Valor final a pagar (com eventuais descontos): ";
                section.append(newH3);
            }
            let h3Alterar = document.getElementById("desconto");
            h3Alterar.textContent = "Valor final a pagar (com eventuais descontos): " + data.totalCost + " €";

            if(counter === 1){
                let newP = document.createElement('p');
                newP.textContent = "Referência de pagamento: " + data.reference;
                newP.id = "referencia";
                section.append(newP);
            } else {
                let pReferencia = document.getElementById("referencia");
                pReferencia.textContent = "Referência de pagamento: " + data.reference;
            }
            counter++;
        });
    };
}
function adicionarTodos(){
    const button = document.getElementById("selecionarTodos");{
        button.onclick = function (){
            const section = document.getElementById("cesto"); // Seleciona a seção de produtos.
    section.innerHTML = ""; // Limpa o conteúdo existente.
    prod.forEach(produto => {
        section.append(criarProdutoCesto(produto)); // Adiciona cada produto à seção.
    });
    atualizaCesto();
        }
    }
}