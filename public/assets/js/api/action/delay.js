//функция для случайной задержки
function randomDelay(time = Math.random() * 200 + 100) {
    return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {
    randomDelay
};