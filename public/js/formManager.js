define(['tmpl/forms/errorForm', 'tmpl/forms/selectForm', 'tmpl/forms/tokenForm', 'checking'],
    function(errorForm, selectForm, tokenForm, Modernizr) {
        var showErrorForm = function(error, game) {
            $('#formTemplate').html(errorForm);
            $('#error').html(error);
            $('#forms').show();
            $('#toSelect').click(function() {
                showSelectForm(game);
            });
        };



        var showSelectForm = function(game) {
            $('#formTemplate').html(selectForm);
            $('#forms').show();
            $('#pc').on('click', function() {
                if (Modernizr.checkConsoleFeatures()) {
                    $('#gameDiv').show();
                    $('.overlay').hide();
                    $('#forms').hide();
                } else {
                    showErrorForm("some features aren't supported");
                }
                return false;
            });
            $('#smart').click(game.SmartSelection.bind(game));
        };

        var showTokenForm = function(token) {
            $('#formTemplate').html(tokenForm);
            $('#token').html(token);
            $('#forms').show();
        };

        return {
            showErrorForm: showErrorForm,
            showSelectForm: showSelectForm,
            showTokenForm: showTokenForm
        }
    });