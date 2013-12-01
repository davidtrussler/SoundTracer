var Tracklister = function() {}

Tracklister.prototype.displayTracklist = function(tracklist, contentArea) {
	var div = document.createElement('div'); 
	var h3 = document.createElement('h3'); 
	var table = document.createElement('table'); 
	var tbody = document.createElement('tbody'); 
	// var thead = document.createElement('thead'); 
	// var tr_head = document.createElement('tr'); 
	var columns = new Array(); 
	
	tracklist.forEach(function(track) {
		if (columns.indexOf('position') == -1) {
			if (track.position) {
				columns.push('position'); 
			}
		}

		if (columns.indexOf('artists') == -1) {
			if (track.artists) {
				columns.push('artists'); 
			}
		}

		if (columns.indexOf('title') == -1) {
			if (track.title) {
				columns.push('title'); 
			}
		}

		if (columns.indexOf('duration') == -1) {
			if (track.duration) {
				columns.push('duration'); 
			}
		}
	}); 

	/*
	if (columns.indexOf('position') != -1) {
		var th_position = document.createElement('th')

		th_position.textContent = 'Position'; 
		tr_head.appendChild(th_position); 
	}
	
	if (columns.indexOf('artists') != -1) {
		var th_title = document.createElement('th')

		th_title.textContent = 'Artists'; 
		tr_head.appendChild(th_title); 
	}
	
	if (columns.indexOf('title') != -1) {
		var th_title = document.createElement('th')

		th_title.textContent = 'Title'; 
		tr_head.appendChild(th_title); 
	}
	
	if (columns.indexOf('duration') != -1) {
		var th_duration = document.createElement('th')

		th_duration.textContent = 'Duration'; 
		tr_head.appendChild(th_duration); 
	}
	*/
	
	tracklist.forEach(function(track) {
		var tr = document.createElement('tr'); 
	
		if (columns.indexOf('position') != -1) {
			var td_position = document.createElement('td'); 

			if (track.position) {
				td_position.textContent = track.position; 
			} else {
				td_position.innerHTML = '&nbsp;'; 
			}

			td_position.className = 'position'; 
			tr.appendChild(td_position); 
		}
	
		if (columns.indexOf('artists') != -1) {
			var td_artists = document.createElement('td'); 

			if (track.artists) {
				var ul = document.createElement('ul'); 
				
				track.artists.forEach(function(artist) {
					var li = document.createElement('li'); 
					var a = document.createElement('a'); 
					
					a.href = artist.resource_url; 
					a.innerText = artist.name; 
					a.className = 'artist'; 
					li.appendChild(a); 
					ul.appendChild(li); 
		
					/* unused data
					anv: ""
					id: 1050142
					join: ""
					role: ""
					tracks: ""
					*/
				}); 
		
				td_artists.appendChild(ul); 
			} else {
				td_artists.innerHTML = '&nbsp;'; 
			}

			td_artists.className = 'artists'; 
			tr.appendChild(td_artists); 
		}
	
		if (columns.indexOf('title') != -1) {
			var td_title = document.createElement('td'); 
			
			if (track.title) {
				if (track.extraartists) {
					var ul = document.createElement('ul'); 
					
					track.extraartists.forEach(function(extraartist) {
						var li = document.createElement('li'); 
						var a = document.createElement('a'); 
						var span_name = document.createElement('span'); 
						var span_value = document.createElement('span'); 
		
						a.href = extraartist.resource_url; 
						a.textContent = extraartist.name; 
						a.className = 'extraartist'; 
						span_name.className = 'name'; 
						span_name.textContent = extraartist.role; 
						span_value.className = 'value'; 
						span_value.appendChild(a); 
						li.appendChild(span_name); 
						li.appendChild(span_value); 
						ul.className = 'extraartists'; 
						ul.appendChild(li); 
		
						/* unused data
						anv: ""
						id: 1050142
						join: ""
						tracks: ""
						*/
					}); 
		
					td_title.appendChild(ul); 
				}

				td_title.className = 'title'; 
				td_title.textContent = track.title; 
			} else {
				td_title.innerHTML = '&nbsp;'; 
			}

			tr.appendChild(td_title); 
		}
	
		if (columns.indexOf('duration') != -1) {
			var td_duration = document.createElement('td'); 

			if (track.duration) {
				td_duration.textContent = track.duration; 
			} else {
				td_duration.innerHTML = '&nbsp;'; 
			}

			td_duration.className = 'duration'; 
			tr.appendChild(td_duration); 
		}
	
		tbody.appendChild(tr); 
	}); 
	
	// thead.appendChild(tr_head); 
	table.appendChild(tbody); 
	// table.appendChild(thead); 
	h3.textContent = 'Tracklist'; 
	div.className = 'tracklist'; 
	div.appendChild(h3); 
	div.appendChild(table); 
	contentArea.appendChild(div); 
}