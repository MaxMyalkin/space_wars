define(['models/score', 'collections/scores', 'views/scoreboard', 'router'], 
function(Score, Scoreboard, ScoreboardView, Router) {
	function cobcobcobe(event) {
			event.preventDefault();
			var data = $(this).serialize();
			$.ajax({
				url : '/scores',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function(msg)
				{
					var player = new Score(
							{name: msg["name"], score: msg["score"]}
						);
					Scoreboard.add(player);
					//ScoreboardView.show();
					//Router.scoreboardAction();
					window.location = "/#scoreboard";
				}
			})
			.fail(
				function(msg){alert("aa");}
				)
			
	}
	return cobcobcobe;
});
