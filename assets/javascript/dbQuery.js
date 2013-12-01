var DbQuery = function() {
	var script = document.createElement('script'); 
	var type; 

	this.makeQuery = function(query) {
		var url = 'http://api.discogs.com/'; 
		var cbname = 'parseResponse'; 
		
		for (prop in query) {
			if (prop == 'type') {
				type = query[prop]; 
				url += query[prop] + 's/';  
			}
			
			if (prop == 'id') {
				url += query[prop];  
			}
		} 

		url += '?callback=' + cbname; 

		script.src = url;
		document.body.appendChild(script); 
	}

	parseResponse = function(response) {
		var details = document.getElementById('details'); 
		var meta = response.meta; 
		var data = response.data; 
		
		console.log(meta); 
		
		// these don't really do anything useful - 
		// can we fetch data in a better way?
		// look at how cordova handles it ...
		if (!response) {
			details.innerHTML = '<p>no response from server</p>'; 
		} else if (!meta || meta == 'undefined' || meta == null) {
			details.innerHTML = '<p>no response</p>'; 
		} else {
			details.innerHTML = 'some details'; 

			if (type == 'artist') {
				details.innerHTML += '<h4>' + data['name'] + '</h4>'; 
	
				if (data['images']) {
					details.innerHTML += 
						'<img src="' + 
						data['images'][0].uri + 
						'" style="max-height:200px;max-width:200px"' + 
						'/>'; 
					
						if (data['images'].length > 1) {
							details.innerHTML += '<p>There are ' + (data['images'].length - 1) + ' more images</p>'; 
						}
				}
	
				if (data['profile']) {
					details.innerHTML += 
						'<h5>Profile</h5>' + 
						'<p>' + 
						data['profile'] + 
						'</p>'; 
				}
	
				if (data['members']) {
					details.innerHTML += 
						'<h5>Members</h5>' + 
						'<ul>'; 
	
					for (var i = 0; i < data['members'].length; i++) {
						var name = data['members'][i].name; 
						var resource_url = data['members'][i].resource_url; 
	
						details.innerHTML += 
							'<li>' + 
							'<a href="' + 
							'#' + // resource_url + 
							'">' + 
							name + 
							'</a>' + 
							'</li>'; 
					}
	
					details.innerHTML += '</ul>'; 
				}
	
				if (data['aliases']) {
					details.innerHTML += 
						'<h5>Aliases</h5>' + 
						'<ul>'; 
	
					for (var i = 0; i < data['aliases'].length; i++) {
						var name = data['aliases'][i].name; 
						var resource_url = data['aliases'][i].resource_url; 
	
						details.innerHTML += 
							'<li><a href="' + 
							'#' + // resource_url + 
							'">' + 
							name + 
							'</a></li>'; 
					}
	
					details.innerHTML += '</ul>'; 
				}
	
				if (data['namevariations']) {
					details.innerHTML += 
						'<h5>Name Variations</h5>' + 
						'<ul>'; 
	
					for (var i = 0; i < data['namevariations'].length; i++) {
						var name = data['namevariations'][i]; 
	
						details.innerHTML += 
							'<li>' + 
							name + 
							'</li>'; 
					}
	
					details.innerHTML += '</ul>'; 
				}
	
				if (data['releases_url']) {
					var url = '#'; // data['releases_url']; 
	
					details.innerHTML += '<p><a href="' + url + '">Releases</a></p>'; 
				}
				
				if (data['urls']) {
					details.innerHTML += 
						'<h5>Links</h5>' + 
						'<ul>'; 
	
					for (var i = 0; i < data['urls'].length; i++) {
						var url = data['urls'][i]; 
	
						details.innerHTML += 
							'<li>' + 
							'<a href="' + 
							url + 
							'">' + 
							url + 
							'</a>' + 
							'</li>'; 
					}
	
					details.innerHTML += '</ul>'; 
				}
				
				if (data['data_quality']) {
					details.innerHTML += 
						'<h5>Data quality</h5>' + 
						'<p>' +  
						data['data_quality'] + 
						'</p>'; 
				}
			} // END if artist
		} // END if meta

		script.parentNode.removeChild(script); 
	}
}