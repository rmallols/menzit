menzit
	.factory('record', ['$q', 'graph', function ($q, graph) {

		function restore(){$("#record,#live").removeClass("disabled");$(".one").addClass("disabled");$.voice.stop();}

		$(document).on("click", "#record:not(.disabled)", function(){

			elem = $(this);
			$.voice.record($("#live").is(":checked"), function(){
				elem.addClass("disabled");
				$("#live").addClass("disabled");
				$("#stop,#play,#download").removeClass("disabled");
			});
		});
		$(document).on("click", "#stop:not(.disabled)", function(){
			restore();
		});
		$(document).on("click", "#play:not(.disabled)", function(){

		});
		$(document).on("click", "#download:not(.disabled)", function(){
			$.voice.export(function(url){
				$("<a href='"+url+"' download='MyRecording.wav'></a>")[0].click();
			}, "URL");
			restore();
		});

		function play() {
			var deferred = $q.defer();
			$.voice.export(function(base64){
				$("#audio").attr("src", base64);
				$("#audio")[0].play();
				deferred.resolve(base64);
			}, "base64");
			restore();
			return deferred.promise;
		}

		return {
			play: play
		}
	}]);