define([
], function(
){
    function getID(){
        var curID = getJSON("id");
        if (curID === null){
            setJSON("id", 0);
            return 0;
        }else{
            setJSON("id", Number(curID) + 1);
            return Number(curID) + 1;
        }
    }

    function setJSON(key, value) {
        localStorage[key] = value;
    }

    function getJSON(key) {
        var value = localStorage[key];
        return value ? value : "[]";
    }

    function update(){
        var storage = localStorage["scores"];
        storage = storage.substring(0, storage.length-2) + "]";
        var scores = JSON.parse(storage);
        for (var i = scores.length - 1; i >= 0; i--){
            $.ajax({
                url : '/scores',
                type: 'post',
                dataType: 'JSON',
                data: scores[i],
                success: function(response)
                {
                    scores.splice(i, 1);
                }
            })
        }
        scores = JSON.stringify(scores);
        setJSON("scores", scores);
    }

    return {
        getID: getID,
        setJSON: setJSON,
        getJSON: getJSON,
        update: update
    }

});