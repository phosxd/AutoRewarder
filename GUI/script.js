function startBot() {
  let count = document.getElementById('count_input').value;
  
  // 1. Блокируем кнопку
  document.getElementById('start_btn').disabled = true;
  document.getElementById('start_btn').innerText = "In Progress...";
  
  // 2. Включаем зеленую лампочку
  document.getElementById('dot').classList.add('active');
  document.getElementById('status_text').innerText = "Executing";
  
  // Опционально: можно очищать лог при каждом новом старте
  // document.getElementById('log_area').innerHTML = ""; 
  
  // 3. Отправляем команду в Python
  pywebview.api.start_farm(count);
}

// Эта функция стала ПРОЩЕ!
// Python (наш LogRedirector) уже заменяет \n на <br>,
// поэтому мы просто приклеиваем всё, что прилетает, в конец блока.
function update_log(message) {
  let logDiv = document.getElementById('log_area');
  
  logDiv.innerHTML += message;
  
  // Автопрокрутка вниз
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Вызывается из Питона, когда цикл закончен
function enable_start_button() {
  let btn = document.getElementById('start_btn');
  btn.disabled = false;
  btn.innerText = "Start";
  
  document.getElementById('dot').classList.remove('active');
  document.getElementById('status_text').innerText = "Waiting";
}