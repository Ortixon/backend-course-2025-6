// index.js

// 1. Імпортуємо необхідні модулі
const http = require('http'); // 
const fs = require('fs');
const path = require('path');
const { program } = require('commander'); // 

// 2. Налаштовуємо Commander.js для прийому аргументів
// Використовуємо .requiredOption, щоб параметр був обов'язковим 
program
  .requiredOption('-h, --host <type>', 'Адреса сервера') // 
  .requiredOption('-p, --port <type>', 'Порт сервера') // 
  .requiredOption('-c, --cache <type>', 'Шлях до директорії кешу'); // 

// 3. Парсимо (читаємо) аргументи, передані при запуску
program.parse(process.argv);

// 4. Отримуємо значення аргументів
const options = program.opts();
const host = options.host;
const port = options.port;
const cacheDir = options.cache;

// 5. Перевіряємо та створюємо директорію кешу, якщо її не існує 
if (!fs.existsSync(cacheDir)) {
  try {
    fs.mkdirSync(cacheDir, { recursive: true });
    console.log(`Директорію кешу створено за шляхом: ${cacheDir}`);
  } catch (err) {
    console.error(`Помилка при створенні директорії кешу: ${err}`);
    process.exit(1); // Виходимо з програми, якщо не можемо створити кеш
  }
}

// 6. Створюємо HTTP сервер 
const server = http.createServer((req, res) => {
  // Ця частина буде розширена в Частині 2 для обробки маршрутів
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Сервер інвентаризації працює. Очікування запитів...\n');
});

// 7. Запускаємо сервер, передаючи host та port 
server.listen(port, host, () => {
  console.log(`Сервер успішно запущено за адресою http://${host}:${port}`);
  console.log(`Використовується директорія кешу: ${cacheDir}`);
});