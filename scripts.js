document.addEventListener('DOMContentLoaded', () => {
    // Работа с песочницей
    const textInput = document.getElementById('bubble-text');
    const output = document.getElementById('bubble-output');
    const spacingInput = document.getElementById('letter-spacing');
    const trackVal = document.getElementById('track-val');
    const methodBtns = document.querySelectorAll('.method-btn');
    const hint = document.getElementById('method-hint');

    if (textInput && output) {
        // Текст
        textInput.addEventListener('input', () => {
            output.innerHTML = textInput.value.replace(/\n/g, '<br>');
        });

        // Интервал (Трекинг)
        spacingInput.addEventListener('input', () => {
            const val = spacingInput.value;
            output.style.letterSpacing = (val / 10) + "px";
            trackVal.innerText = val;
        });

        // Методы висячки (Наглядное смещение)
        methodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                methodBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const method = btn.getAttribute('data-method');
                if (method === 'none') {
                    output.style.textIndent = "0";
                    output.style.paddingLeft = "0";
                    hint.innerText = "Обычный режим: знаки двигают буквы от центра.";
                } else if (method === 'auto') {
                    output.style.textIndent = "-0.3em";
                    output.style.paddingLeft = "0.3em";
                    hint.innerText = "Авто: Фотошоп выносит точки и запятые сам.";
                } else if (method === 'manual') {
                    output.style.textIndent = "-0.7em";
                    output.style.paddingLeft = "0.7em";
                    hint.innerText = "Ручной: Выносим знаки (!?...) пробелами или вручную.";
                }
            });
        });
    }

    // Анимация Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
});