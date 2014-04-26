    /*    // Создаем связь с сервером
    var server = new Connector({
        server: ['getToken', 'bind'],
        remote: '/console'
    });

    // На подключении игрока стартуем игру
    server.on('player-joined', function(data) {
        // Передаем id связки консоль-джостик
        start(data.guid);
    });
*/
    // Инициализация
    var init = function() {
        // Если id нет
        if (!localStorage.getItem('guid')) {
            // Получаем токен
            this.server.getToken(function(token) {
                console.log('token= ' + token);
                $('#tokenForm').show();
                $('#token').html(token);
            });
        } else { // иначе
            // переподключаемся к уже созданной связке
            reconnect.call(this);
        }
    };

    // Переподключение
    var reconnect = function() {
        // Используем сохранненный id связки
        var self = this;
        this.server.bind({
            guid: localStorage.getItem('guid')
        }, function(data) {
            // Если все ок
            if (data.status == 'success') {
                // Стартуем
                localStorage.setItem('guid', data.guid);
                $('#gameDiv').show();
                $('.overlay').hide();
                // Если связки уже нет
            } else if (data.status == 'undefined guid') {
                // Начинаем все заново
                localStorage.removeItem('guid');
                init.call(self);
            }
        });
    };

    var disconnect = function() {
        $('#gameDiv').hide();
        $('.overlay').show();
    };