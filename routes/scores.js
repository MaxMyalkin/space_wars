var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/frontend');

var playerSchema = mongoose.Schema({
    name: String,
    score: Number
});

var Player = mongoose.model("Player", playerSchema);

module.exports = {

    getFull: function(req, res) {
        var query = Player.find();
        query.select("name score");
        query.sort("-score");
        if (req.query.limit && !isNaN(parseInt(req.query.limit, 10))) {
            query.limit(10);
        }

        query.exec(function(err, result) {
            if (err) return handleError(err);
            result = JSON.stringify(result);
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Content-Length', Buffer.byteLength(result));
            res.end(result);
        });

    },

    post: function(req, res) {
        var newScore = req.body;

        if (!newScore || !newScore.name || !newScore.score || newScore.score && isNaN(parseInt(newScore.score, 10))) {
            res.writeHead(400, 'Bad Request');
            res.end();
            return;
        }

        var player = new Player({
            name: newScore.name,
            score: newScore.score
        });

        player.save(function(err, player) {
            if (err) return console.error(err);
        });

        var s = JSON.stringify(newScore);
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Length', Buffer.byteLength(s));
        res.end(s);
    }

};