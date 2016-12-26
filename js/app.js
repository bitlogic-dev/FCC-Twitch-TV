var myUsers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin', 'comster404'];

var clientID = "dyijs4cxep79u6gjpsvbkik2hw93orx";

var getUserInfo = function(userName) {
	$("#output").append("<div id='"+userName+"' class='container'></div>");
	$.getJSON('https://api.twitch.tv/kraken/streams/'+userName+'?client_id='+clientID+'&callback=?', function(data) {
		var details = "";
		var status = "";
		var url = "";
		var streamLink = true;
		if (data.error) {
			console.log(data);
			details = data.message;
			status = data.error;
			streamLink = false;
		} else {
			url = data._links.self.replace("https://api.twitch.tv/kraken/streams/", "https://www.twitch.tv/");
			console.log(url);
			if (data.stream) {
				status = "Live";
				details = data.stream.game + " at " + data.stream.average_fps + " avg. fps";
				streamLink = true;
			} else if (data.stream == null) {
				status = "Offline";
				details = "N/A";
				streamLink = false;
			}
		}

		var id = "#"+userName;
		console.log(id);

		var html = "<h2>"+userName+"</h2>";
		html += "<p><strong>Status: </strong>";
		if (streamLink) {
			html += "<a href='"+url+"' target='_blank'>"+status+"</a> <strong>Details: </strong>"+details+"</p>";
		} else {
			html += status + " <strong>Details: </strong>"+details+"</p>";
		}

		console.log(html);

		$(id).html(html);
});
}

$("#refresh").on("click", function(){
	$.each(myUsers, function(index, value){
	getUserInfo(value);
	})
})

$.each(myUsers, function(index, value){
	getUserInfo(value);
	})
