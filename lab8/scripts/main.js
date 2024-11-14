// Exibe a mensagem ao passar o mouse
const showHoverMessage = () => {
    document.getElementById('hover-message').textContent = "Obrigado por passares!";
};

// Reseta a mensagem ao tirar o mouse
const resetHoverMessage = () => {
    document.getElementById('hover-message').textContent = "1. Passa por aqui!";
};

// Muda a cor do texto baseado na cor do botão
document.querySelectorAll('[data-color]').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        document.querySelector('.inline h2').style.color = color;
    });
});

// Muda a cor de fundo do input com uma cor aleatória
function changeInputColor() {
    const input = document.getElementById('text-input');
    input.style.backgroundColor = getRandomColor();
}

// Muda a cor de fundo do body baseada na seleção
function changeBackgroundColor(select) {
    document.body.style.backgroundColor = select.value;
}

// Inicializa o contador no localStorage, se ainda não existir
if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}

// Incrementa o contador e salva no localStorage
function incrementCounter() {
    let count = parseInt(localStorage.getItem('counter'), 10);
    count++;
    document.getElementById('counter').textContent = 'Contagem: ' + count;
    localStorage.setItem('counter', count);
}

// Atualiza o valor do contador ao carregar a página
document.getElementById('counter').textContent = 'Contagem: ' + localStorage.getItem('counter');

// Gera uma cor aleatória
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Submete o formulário e exibe uma mensagem de cumprimento
document.querySelector('#user-form').onsubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    document.getElementById('greeting-message').textContent = `Olá, o ${name} tem ${age}!`;
};

// Contador automático que incrementa a cada segundo
let autoCounter = 0;
function autoIncrementCounter() {
    autoCounter++;
    document.getElementById('auto-counter').textContent = 'Automatic Counter: ' + autoCounter;
}

// Inicia o contador automático
setInterval(autoIncrementCounter, 1000);