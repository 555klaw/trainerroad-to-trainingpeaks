(function importer() {

try {
	void(TRData);
} catch (err) {
	alert('you need to paste Trainerroad data first');
	return false;
}

$.get('https://tpapi.trainingpeaks.com/users/v3/user', function (data) {
	try {
		var userId = (data.user.userId),
		days = {
			'monday': '1',
			'tuesday': '2',
			'wednesday': '3',
			'thursday': '4',
			'friday': '5',
			'saturday': '6',
			'sunday': '7'
		}

		var types = {
			'run': 3,
			'bike': 2,
			'swim': 1,
			'brick': 4
		},
		date = prompt('when do you want to start? Enter the date of Monday of that week', moment().day(1).format('YYYY-MM-DD'));





		if (!date) {
			alert('I actually do need a date. Try again');
			return false;
		}
		date = moment(date).day(1).format('YYYY-MM-DD');




		for (var i in TRData) {

			for (var day in TRData[i]) {
				
				for (var workout in TRData[i][day]) {
					$.post('https://tpapi.trainingpeaks.com/fitness/v1/athletes/' + userId + '/workouts', {
						"athleteId":userId,
						"ifPlanned":TRData[i][day][workout].if,
						"publicSettingValue":0,
						"completed":false,
						"tssPlanned":TRData[i][day][workout].tss,
						"totalTimePlanned":(TRData[i][day][workout].duration !== undefined ? parseInt(TRData[i][day][workout].duration, 10)/60 : ''),
						"workoutTypeValueId": types[TRData[i][day][workout].type],
						"title":TRData[i][day][workout].title,
						"description":TRData[i][day][workout].description,
						"workoutDay":moment(date).add(parseInt(i)-1, 'weeks').day(days[day]).format('YYYY-MM-DD')
					});
				}
			}
		}






	} catch (error) {
		alert('seems you\'re not logged in to Trainingpeaks');
		return false

	}
}).fail(function (err) {
		alert('seems you\'re not logged in to Trainingpeaks');
		return false

});

})();