
function count() {
   const counterDisplay = document.getElementById('counter');
   let currentCount = counterDisplay.textContent;
   currentCount++;
   counterDisplay.innerHTML = currentCount;
 }