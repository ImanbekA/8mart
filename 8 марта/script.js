// Устанавливаем целевую дату - 8 марта текущего года
function getTargetDate() {
    const now = new Date();
    const year = now.getFullYear();
    // Месяцы в JS идут с 0: 0 - январь, 2 - март
    return new Date(year, 2, 8, 0, 0, 0); // 8 марта 00:00:00
}

// Функция обновления таймера
function updateTimer() {
    const targetDate = getTargetDate();
    const now = new Date();
    
    // Если сейчас уже позже 8 марта (в этом году)
    if (now > targetDate) {
        // Показываем поздравление, скрываем таймер
        document.getElementById('timerBlock').style.display = 'none';
        document.getElementById('greetingBlock').style.display = 'block';
        return;
    }
    
    // Разница в миллисекундах
    const diff = targetDate - now;
    
    // Вычисляем дни, часы, минуты, секунды
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Обновляем значения на странице
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;   
}                                                                                           

// Функция для дождя из фотографий и цветов
function startFlowerRain() {
    const container = document.getElementById('flowersContainer');
    
    // ТВОИ ФОТОГРАФИИ
    const photos = [
        'images1.jpg',
        'images2.jpg', 
        'images3.jpg',
        'images4.jpg',
        'images5.jpg',
        'images6.jpg',
        'images7.jpg',
        'images8.jpg',
        'images9.jpg',
        'images10.jpg'
    ];
    
    // ЦВЕТЫ
    const flowers = ['🌸', '🌼', '🌺', '🌷', '🌹'];
    
    // СЧЕТЧИКИ для равномерного распределения
    let photoIndex = 0;
    let flowerIndex = 0;
    
    // Следим за занятыми позициями
    let occupiedPositions = [];
    
    // Функция получения следующей фотографии по очереди
    function getNextPhoto() {
        const photo = photos[photoIndex];
        photoIndex = (photoIndex + 1) % photos.length;
        return photo;
    }
    
    // Функция получения следующего цветка по очереди
    function getNextFlower() {
        const flower = flowers[flowerIndex];
        flowerIndex = (flowerIndex + 1) % flowers.length;
        return flower;
    }
    
    // Функция получения свободной позиции
    function getFreePosition() {
        const step = 12;
        const maxAttempts = 50;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const sector = Math.floor(Math.random() * (100 / step));
            const position = sector * step + (step / 2);
            const finalPosition = position + (Math.random() * 4 - 2);
            
            let isOccupied = false;
            for (let i = 0; i < occupiedPositions.length; i++) {
                if (Math.abs(occupiedPositions[i] - finalPosition) < 8) {
                    isOccupied = true;
                    break;
                }
            }
            
            if (!isOccupied) {
                occupiedPositions.push(finalPosition);
                setTimeout(() => {
                    occupiedPositions = occupiedPositions.filter(p => p !== finalPosition);
                }, 5000);
                
                return finalPosition;
            }
        }
        
        return Math.random() * 100;
    }
    
    // Функция создания одного падающего элемента
    function createFallingItem() {
        const element = document.createElement('div');
        element.className = 'flower';
        
        const leftPosition = getFreePosition();
        
        // 60% - фотографии, 40% - цветы (как у тебя)
        if (Math.random() < 0.6) {
            // КОНТЕЙНЕР СЕРДЦА
            const heartContainer = document.createElement('div');
            
            heartContainer.style.width = '160px';
            heartContainer.style.height = '160px';
            heartContainer.style.position = 'relative';
            heartContainer.style.overflow = 'hidden';
            heartContainer.style.backgroundColor = '#ffd9e8';
            
            heartContainer.style.clipPath = 'path("M80,30 C50,5 10,5 10,40 C10,80 50,110 80,130 C110,110 150,80 150,40 C150,5 110,5 80,30 Z")';
            heartContainer.style.webkitClipPath = 'path("M80,30 C50,5 10,5 10,40 C10,80 50,110 80,130 C110,110 150,80 150,40 C150,5 110,5 80,30 Z")';
            
            heartContainer.style.filter = 'drop-shadow(0 10px 15px rgba(255, 105, 180, 0.6))';
            
            const img = document.createElement('img');
            
            const nextPhoto = getNextPhoto();
            img.src = nextPhoto;
            
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.border = 'none';
            img.style.transform = 'scale(1.1)';
            
            img.onerror = function() {
                heartContainer.style.display = 'none';
                element.innerHTML = '❤️';
                element.style.fontSize = '70px';
            };
            
            heartContainer.appendChild(img);
            element.appendChild(heartContainer);
            
        } else {
            // ЦВЕТЫ
            element.innerHTML = getNextFlower();
            element.style.fontSize = '50px';
            element.style.opacity = '0.9';
            element.style.textShadow = '0 0 20px hotpink';
        }
        
        element.style.left = leftPosition + '%';
        
        const startPosition = -10 - Math.random() * 20;
        element.style.top = startPosition + '%';
        
        element.style.animationDelay = Math.random() * 5 + 's';
        
        const duration = 12 + Math.random() * 15;
        element.style.animationDuration = duration + 's';
        
        container.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, duration * 1000 + 5000);
    }
    
    // Очищаем контейнер
    container.innerHTML = '';
    occupiedPositions = [];
    photoIndex = 0;
    flowerIndex = 0;
    
    // ПЕРВЫЙ ЗАПУСК
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingItem();
        }, i * 800);
    }
    
    // ПОСТОЯННЫЙ ПОТОК
    if (window.rainInterval) {
        clearInterval(window.rainInterval);
    }
    
    window.rainInterval = setInterval(() => {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFallingItem();
            }, i * 600);
        }
    }, 4000);
}

// Запускаем таймер при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Сразу запускаем таймер
    updateTimer();
    // Обновляем каждую секунду
    setInterval(updateTimer, 1000);
    
    // Небольшой дождь при загрузке
    startFlowerRain();
    
    // Вешаем обработчики на кнопки
    const heart = document.getElementById('heart');
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    if (heart) {
        heart.addEventListener('click', function() {
            const greetingBlock = document.getElementById('greetingBlock');
            if (greetingBlock.style.display === 'block') {
                startFlowerRain();
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            }
        });
    }
    
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            const greetingBlock = document.getElementById('greetingBlock');
            if (greetingBlock.style.display === 'block') {
                startFlowerRain();
                
                document.getElementById('greeting').innerText = 'С праздником, милая! 😘 ';
                document.getElementById('personalWords').innerHTML = 'Ты — лучшее, что случилось в моей жизни. Пусть все твои мечты сбудутся! ❤️ ';
                
                // ПОКАЗЫВАЕМ КНОПКУ ДЛЯ ВИДЕО ЧЕРЕЗ 2 СЕКУНДЫ
                setTimeout(() => {
                    const videoButtonContainer = document.getElementById('videoButtonContainer');
                    if (videoButtonContainer) {
                        videoButtonContainer.style.display = 'block';
                    }
                }, 2000);
                
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            }
        });
    }
    
    // ===== УПРАВЛЕНИЕ ВИДЕО =====
    const playVideoBtn = document.getElementById('playVideoBtn');
    const videoBlock = document.getElementById('videoBlock');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const myVideo = document.getElementById('myVideo');
    
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            // Прячем поздравление
            document.getElementById('greetingBlock').style.display = 'none';
            // Показываем видео
            videoBlock.style.display = 'flex';
            // Запускаем видео
            if (myVideo) {
                myVideo.play();
            }
        });
    }
    
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', function() {
            if (myVideo) {
                myVideo.pause();
            }
            videoBlock.style.display = 'none';
            document.getElementById('greetingBlock').style.display = 'block';
        });
    }
});