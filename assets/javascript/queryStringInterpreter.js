var QueryStringInterpreter = function() {}

QueryStringInterpreter.prototype.getQuery = function(queryString) {
	// var queryString = document.location.toString().split('?')[1]; 
	var queries = queryString.split('&'); 
	var query = {}; 

	queries.forEach(function(element) {
		var queryElements = element.split('='); 
		var name = queryElements[0]; 
		var value = queryElements[1]; 

		query[name] = value;
	})

	return query; 
}
