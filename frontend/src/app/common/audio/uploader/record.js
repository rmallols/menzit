'use strict';

app.factory('record', ['$q', function ($q) {

		function record() {
			$.voice.record(false, angular.noop);
		}

		function get() {
			var deferred = $q.defer();
			jQuery.voice.export(function(base64){
				deferred.resolve(base64);
			}, "base64");
			stop();
			return deferred.promise;
		}

		function stop() {
			jQuery.voice.stop();
		}

		return {
			record: record,
			get: get,
			stop: stop
		};
	}]);