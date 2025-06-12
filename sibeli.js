document.addEventListener('DOMContentLoaded', function() {
    // --- Configurações Iniciais ---
    // IMPORTANTE: Defina a data de início do relacionamento aqui!
    // Formato: Ano, Mês (0-11, então Julho é 6), Dia, Hora, Minuto, Segundo
    // Exemplo: 2023, 6 (Julho), 15, 10, 30, 0 para 15 de Julho de 2023 às 10:30:00
    const startDate = new Date(2024, 11, 20, 0, 0, 0); // Exemplo: 25 de Dezembro de 2023, 00:00:00

    // --- Elementos HTML ---
    const initialMessageSection = document.getElementById('initial-message-section');
    const revealButton = document.getElementById('reveal-button');
    const mainContent = document.getElementById('main-content');

    // Elementos do Cronômetro
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const togetherSinceP = document.getElementById('together-since');

    // Elemento da Mensagem Completa (para o efeito de digitação futuro)
    const fullMessageText = document.getElementById('full-message-text');

    // --- Funções Auxiliares ---
    function formatTwoDigits(number) {
        return number < 10 ? '0' + number : number;
    }

    // --- Lógica do Cronômetro ---
    function updateCountdown() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

        if (diff < 0) {
            yearsSpan.textContent = "00";
            monthsSpan.textContent = "00";
            daysSpan.textContent = "00";
            hoursSpan.textContent = "00";
            minutesSpan.textContent = "00";
            secondsSpan.textContent = "00";
            togetherSinceP.textContent = "Nosso futuro começa em breve! <3";
            return;
        }

        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        let currentYears = 0;
        let currentMonths = 0;
        let currentDays = 0;

        let tempDate = new Date(startDate);
        while (tempDate < now) {
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            if (tempDate <= now) {
                currentYears++;
            } else {
                tempDate.setFullYear(tempDate.getFullYear() - 1);
                break;
            }
        }

        while (tempDate < now) {
            tempDate.setMonth(tempDate.getMonth() + 1);
            if (tempDate <= now) {
                currentMonths++;
            } else {
                tempDate.setMonth(tempDate.getMonth() - 1);
                break;
            }
        }

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        let diffDays = Math.floor((now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
        currentDays = diffDays;

        yearsSpan.textContent = formatTwoDigits(currentYears);
        monthsSpan.textContent = formatTwoDigits(currentMonths);
        daysSpan.textContent = formatTwoDigits(currentDays);
        hoursSpan.textContent = formatTwoDigits(hours);
        minutesSpan.textContent = formatTwoDigits(minutes);
        secondsSpan.textContent = formatTwoDigits(seconds);

        const startDayFormatted = formatTwoDigits(startDate.getDate());
        const startMonthFormatted = formatTwoDigits(startDate.getMonth() + 1);
        const startYearFormatted = startDate.getFullYear();
        togetherSinceP.textContent = `Juntos desde: ${startDayFormatted}/${startMonthFormatted}/${startYearFormatted}`;
    }

    // --- Lógica da Revelação de Conteúdo ---
    revealButton.addEventListener('click', function() {
        initialMessageSection.style.display = 'none'; // Oculta a seção da mensagem inicial
        mainContent.style.display = 'block'; // Mostra o conteúdo principal

        document.body.classList.remove('initial-state'); // Remove a centralização vertical

        // Inicia o cronômetro apenas quando o conteúdo é revelado
        updateCountdown(); // Chama uma vez para exibir de imediato
        setInterval(updateCountdown, 1000); // Atualiza a cada segundo
    });

    // --- Efeito de Corações Caindo (Será adicionado aqui no próximo passo) ---
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.style.left = Math.random() * 100 + 'vw'; // Posição horizontal aleatória
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Duração da animação entre 3 e 5 segundos
        heart.style.opacity = Math.random() * 0.5 + 0.5; // Opacidade aleatória
        document.body.appendChild(heart);

        // Remove o coração após a animação para não acumular elementos
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Gerar corações continuamente
    setInterval(createFallingHeart, 300); // Cria um coração a cada 300ms

    // --- Configuração inicial ao carregar a página ---
    document.body.classList.add('initial-state'); // Adiciona a classe para centralizar a mensagem inicial

});