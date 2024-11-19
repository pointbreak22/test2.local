


async function closePOPUPWindow(page){
    await page.evaluate(async () => {
        const closeButton = document.querySelector('.js-promo_notification-popup-close');

        if (closeButton) {
            // Симулируем клик по кнопке
            console.log('Clicking the close button...');

            // Здесь логика закрытия уведомления, например, удаление родительского элемента
            const notification = await closeButton.closest('.b-promo_notification');
            if (notification) {
                notification.style.display = 'none';  // Скрываем уведомление
                console.log('Notification closed!');
            }
        } else {
            console.log('Close button not found!');
        }


    });

}

module.exports = {
    closePOPUPWindow
};