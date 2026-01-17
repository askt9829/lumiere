const inputZone = document.getElementById('user-input-zone');
const popupContainer = document.getElementById('popup-container');
const paintBtn = document.getElementById('paint-white');
const labSection = document.querySelector('.lab-section'); // Секция интерактива

function showToast(text, color = "#b026ff") {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = color;
    toast.innerHTML = `✦ ${text}`;
    popupContainer.innerHTML = '';
    popupContainer.appendChild(toast);
}

// ЛОГИКА ВИДИМОСТИ ПРИ СКРОЛЛЕ
window.addEventListener('scroll', () => {
    const sectionRect = labSection.getBoundingClientRect();
    
    // Если секция интерактива видна на экране (хотя бы на 20%)
    if (sectionRect.top < window.innerHeight * 0.8 && sectionRect.bottom > window.innerHeight * 0.2) {
        popupContainer.style.opacity = "1";
        popupContainer.style.pointerEvents = "auto";
    } else {
        // Если пролистали мимо — скрываем плавно
        popupContainer.style.opacity = "0";
        popupContainer.style.pointerEvents = "none";
    }
});

// ИНТЕРАКТИВ (НЕ ТРОГАЛ)
inputZone.addEventListener('input', () => {
    const val = inputZone.innerText;
    const spaceMatch = val.match(/\s/g) || [];
    const dotMatch = val.match(/\./g) || [];

    if (dotMatch.length >= 3) {
        showToast("Точки введены! Теперь закрась их белым цветом.");
    } else if (spaceMatch.length >= 3) {
        showToast("ПОБЕДА! ХАЙ в центре!", "#00ff8c");
    }
});

paintBtn.addEventListener('click', () => {
    if (inputZone.innerText.includes('...')) {
        inputZone.style.color = "white";
        showToast("ИДЕАЛЬНО! Метод закрашивания освоен.", "#00ff8c");
    } else {
        showToast("Сначала введи три точки '...'");
    }
});

// Стартовая подсказка
setTimeout(() => showToast("Начни вводить пробелы или точки перед словом"), 1000);


const slider = document.getElementById('opacity-slider');
const targetImg = document.getElementById('overlap-target');
const valDisplay = document.getElementById('opacity-val');

if (slider && targetImg) {
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        targetImg.style.opacity = value / 100;
        if (valDisplay) valDisplay.innerText = value;
    });
}


// Открытие и закрытие модалки
function toggleLumiModal(show) {
    const modal = document.getElementById('joinModal');
    modal.style.display = show ? 'flex' : 'none';
}

// Работа кастомных селектов
document.querySelectorAll('.lumi-select').forEach(select => {
    const trigger = select.querySelector('.lumi-select-trigger');
    const options = select.querySelectorAll('.lumi-opt');
    const hiddenInput = select.querySelector('input[type="hidden"]');
    const label = trigger.querySelector('span');

    trigger.addEventListener('click', () => {
        document.querySelectorAll('.lumi-select').forEach(s => {
            if (s !== select) s.classList.remove('open');
        });
        select.classList.toggle('open');
    });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            label.innerText = val;
            hiddenInput.value = val;
            select.classList.remove('open');
            label.style.color = "#fff";
        });
    });
});

// Закрытие при клике мимо селекта
window.addEventListener('click', (e) => {
    if (!e.target.closest('.lumi-select')) {
        document.querySelectorAll('.lumi-select').forEach(s => s.classList.remove('open'));
    }
});

// Отправка в ТГ
function sendToTelegram() {
    const nick = document.getElementById('form-nick').value;
    const age = document.getElementById('form-age').value;
    const gender = document.getElementById('form-gender').value;
    const role = document.getElementById('form-role').value;
    const time = document.getElementById('form-time').value;
    const dur = document.getElementById('form-duration').value;
    const ign = document.getElementById('form-ignore').value;

    if(!nick || !age || !role) {
        alert("Заполни основные поля!");
        return;
    }

    const message = `🚀 ЗАЯВКА В LUMIERE SOLO%0A%0A👤 Ник: ${nick}%0A⚤ Пол: ${gender}%0A🎂 Возраст: ${age}%0A🛠 Роль: ${role}%0A⏳ Время: ${time}%0A📅 Надолго: ${dur}%0A👻 Шанс игнора: ${ign}`;
    window.open(`https://t.me/askttttt?text=${message}`, '_blank');
}


// --- АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ---
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // Отслеживаем относительно viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% элемента должно быть видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Прекращаем отслеживать после появления
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});