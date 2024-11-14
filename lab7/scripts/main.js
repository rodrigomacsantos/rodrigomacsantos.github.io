document.addEventListener('DOMContentLoaded', function() {
  // Eventos do hover message
  const hoverMessage = document.getElementById("hover-message");
  hoverMessage.addEventListener("mouseover", function() {
      this.innerHTML = "Olá!";
  });
  hoverMessage.addEventListener("mouseout", function() {
      this.innerHTML = "1. Passa por aqui!";
  });

  // Eventos dos botões de cor
  document.getElementById("redBtn").addEventListener("click", function() {
      document.querySelector(".inline h2").style.color = "red";
  });
  document.getElementById("greenBtn").addEventListener("click", function() {
      document.querySelector(".inline h2").style.color = "green";
  });
  document.getElementById("blueBtn").addEventListener("click", function() {
      document.querySelector(".inline h2").style.color = "blue";
  });

  // Evento do input de texto
  let currentColor = true; // true para vermelho, false para verde
  document.getElementById("text-input").addEventListener("input", function() {
      this.style.backgroundColor = currentColor ? "red" : "green";
      currentColor = !currentColor;
  });

  document.getElementById("color-input").addEventListener("input", function() {
    document.body.style.backgroundColor = this.value;
});

  // Contador
  let count = 0;
  document.getElementById("countBtn").addEventListener("click", function() {
      count++;
      document.getElementById("counter").innerHTML = "Contagem: " + count;
  });
});