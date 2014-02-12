$(document).ready(function() {
    var $page = $('#page');
    currentScreen = 'main';

    function showMainScreen() {
            if(currentScreen === 'scoreboard')
            {
                hideScoreboardScreen();
            } else if (currentScreen === 'game')
            {
                hideGameScreen();
            }
            currentScreen = 'main';
            $page.html(mainTmpl()); // Рендерим шаблон
            // Инициализируем обработчики событий
            $page.find('.js-scoreboard')
                .on('click', showScoreboardScreen);
            $page.find('.js-start-game').on('click', showGameScreen);
        };

        function hideMainScreen() { // Деструктор экрана "Главный"
            // Удаляем установленные обработчики событий
            $page.find('.js-scoreboard')
                .off('click', showScoreboardScreen);
            $page.find('.js-start-game').off('click', showGameScreen);
        };

        function showScoreboardScreen() {
            hideMainScreen();
            currentScreen = 'scoreboard';
            $page.html(scoreboardTmpl());
            $page.find('.js-back').on('click', showMainScreen);
        };

        function hideScoreboardScreen() {
            $page.find('.js-back').off('click', showMainScreen);
        };

        function showGameScreen() {
            hideMainScreen();
            currentScreen = 'game';
            $page.html(gameTmpl());
            $page.find('.js-back').on('click', showMainScreen);
        };

        function hideGameScreen() {
            $page.find('.js-back').off('click', showMainScreen);
        };

        showMainScreen();
    });
