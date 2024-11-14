// Eventos de Rato
document.getElementById("clickButton").addEventListener("click", function() {
    alert("Bolt up!");
});

document.getElementById("dblclickButton").addEventListener("dblclick", function() {
    alert("No elevators");
});

document.getElementById("hoverArea").addEventListener("mouseover", function() {
    this.style.backgroundColor = "powderblue";
});

document.getElementById("hoverArea").addEventListener("mouseout", function() {
    this.style.backgroundColor = "lightgray";
});

document.getElementById("hoverArea").addEventListener("mousemove", function(event) {
    document.getElementById("mousePosition").textContent = `Posição do Mouse: X: ${event.clientX}, Y: ${event.clientY}`;
});

// Eventos de Teclado
document.getElementById("textInput").addEventListener("keydown", function(event) {
    document.getElementById("keyOutput").textContent = `Tecla pressionada: ${event.key}`;
});

document.getElementById("textInput").addEventListener("keyup", function(event) {
    document.getElementById("keyOutput").textContent = `Última tecla solta: ${event.key}`;
});

// Eventos de Formulário
document.getElementById("sampleForm").addEventListener("change", function() {
    document.getElementById("formOutput").textContent = "Dados atualizados!";
});

document.getElementById("sampleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio real do formulário
    document.getElementById("formOutput").textContent = "Obrigado por enviar o formulário. Bolt up!";
});