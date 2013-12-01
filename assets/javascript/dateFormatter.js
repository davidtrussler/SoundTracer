var DateFormatter = function() {}

DateFormatter.prototype.format = function(date) {
	if (typeof date == 'number') {
		date = date.toString(); 
	} 

	if (date.indexOf('-') != -1) {
		var dateArray = date.split('-'); 
		
		if (dateArray.length == 1) {
			return dateArray[0]; 
		} else if (dateArray.length == 2) {
			return formatMonth(dateArray[1]) + ' ' + dateArray[0]; 
		} else if (dateArray.length == 3) {
			return dateArray[2] + ' ' + formatMonth(dateArray[1]) + ' ' + dateArray[0]; 
		}
	} else {
		return date; 
	}
}

function formatMonth(month) {
	var formattedMonth = {
		'01': 'January',
		'02': 'February',
		'03': 'March',
		'04': 'April',
		'05': 'May',
		'06': 'June',
		'07': 'July',
		'08': 'August',
		'09': 'September',
		'10': 'October',
		'11': 'November',
		'12': 'December'
	}
	
	return formattedMonth[month]; 
}