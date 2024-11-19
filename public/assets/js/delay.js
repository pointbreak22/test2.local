
function randomDelay(time=Math.random() * 700 + 200) {
    return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {
    randomDelay
};