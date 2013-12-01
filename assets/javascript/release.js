var Release = function() {}

Release.prototype.displayData = function(data, contentArea) {
	console.log('Release.displayData'); 
	
	var dateFormatter = new DateFormatter(); 

	if (data.title) {
		var h2 = document.createElement('h2'); 
	
		h2.textContent = data.title; 
		contentArea.appendChild(h2); 
	}

	if (data.images) {
		var imageGallery = new ImageGallery(); 

		imageGallery.displayGallery(data.images, contentArea); 
	}

	if (data.artists) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.artists.forEach(function(artist) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 

			/* unused data
			anv: ""
			id: 50263
			join: ""
			role: ""
			tracks: ""
			*/
	
			a.href = artist.resource_url; 
			a.textContent = artist.name; 
			a.className = 'artist'; 
	
			li.appendChild(a); 
			ul.appendChild(li); 
		}); 

		h3.innerText = 'Artists'; 
		div.className = 'artists'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}

	if (data.labels) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 

		if (data.labels.length > 1) {
			h3.textContent = 'Labels'; 
		} else {
			h3.textContent = 'Label'; 
		}
	
		data.labels.forEach(function(label) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			var span_cat = document.createElement('span'); 
			var span_name = document.createElement('span'); 
	
			a.textContent = label.name; 
			a.href = label.resource_url; 
			// a.className = 'label'; 
			span_name.appendChild(a); 
			span_name.className = 'name'; 
			li.appendChild(span_name); 
	
			/* unused data
			"entity_type": "1",
			"id": 5,
			"entity_type_name": "Label",
			*/
	
			span_cat.textContent = label.catno; 
			span_cat.className = 'cat'; 
			li.appendChild(span_cat); 
			ul.appendChild(li); 
		}); 
	
		div.className = 'labels'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}
	     		
	if (data.formats) {
		console.log(data.formats); 
		
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
	
		if (data.formats.length > 1) {
			h3.textContent = 'Formats'; 
		} else {
			h3.textContent = 'Format'; 
		}
	
		data.formats.forEach(function(format) {
			var li = document.createElement('li'); 
			var span_descriptions = document.createElement('span'); 
			var span_formatName = document.createElement('span'); 
			var ul_descriptions = document.createElement('ul'); 
	
			if (format.qty > 1) {
				var span_qty = document.createElement('span'); 
	
				span_qty.textContent = format.qty; 
				span_qty.className = 'qty'; 
				li.appendChild(span_qty); 
			}

			if (format.descriptions) {
				format.descriptions.forEach(function(description) {
					var li_description = document.createElement('li'); 
					li_description.textContent = description; 
					ul_descriptions.appendChild(li_description); 
				}); 
		
				span_descriptions.className = 'descriptions'; 
				span_descriptions.appendChild(ul_descriptions); 
				span_formatName.textContent = format.name; 
				span_formatName.className = 'name'; 
				li.appendChild(span_formatName);
				li.appendChild(span_descriptions); 
				ul.appendChild(li); 
			}
		}); 
	
		div.className = 'formats'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}
	
	if (data.country) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
	
		h3.textContent = 'Country'; 
		p.textContent = data.country; 
		div.className = 'country'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
	}

	/*
	if (data.year) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
	
		h3.textContent = 'Year'; 
		p.textContent = data.year; 
		div.className = 'year'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
	}
	*/

	if (data.released) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
	
		h3.textContent = 'Released'; 
		p.textContent = dateFormatter.format(data.released); 
		div.className = 'released'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
	}

	if (data.genres) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
	
		data.genres.forEach(function(genre) {
			var li = document.createElement('li'); 

			li.textContent = genre; 
			ul.appendChild(li); 
		}); 
	
		h3.textContent = 'Genres'; 
		div.className = 'genres'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}

	if (data.styles) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
	
		data.styles.forEach(function(style) {
			var li = document.createElement('li'); 

			li.textContent = style; 
			ul.appendChild(li); 
		}); 
	
		h3.textContent = 'Styles'; 
		div.className = 'styles'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}

	if (data.tracklist) {
		var tracklister = new Tracklister(); 

		tracklister.displayTracklist(data.tracklist, contentArea); 
	}

	if (data.extraartists && data.extraartists.length > 0) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.extraartists.forEach (function(extraartist) {
			var li = document.createElement('li'); 
			var span_name = document.createElement('span'); 
			var span_value = document.createElement('span'); 
			var a = document.createElement('a'); 
	
			/* unused
			anv: ""
			id: 2079184
			join: ""
			tracks: ""
			*/
				
			a.textContent = extraartist.name;
			a.href = extraartist.resource_url;
			a.className = 'artist';
			span_name.className = 'role';
			span_name.textContent = extraartist.role;
			span_value.className = 'name'; 
			span_value.appendChild(a); 
			li.appendChild(span_name); 
			li.appendChild(span_value); 
			ul.appendChild(li); 
		}); 
	
		h3.textContent = 'Extra artists'; 
		div.className = 'extraartists'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}
	
	if (data.series && data.series.length > 0) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.series.forEach(function(edition) {
			/* unused
			catno = edition.catno; 
			entity_type = edition.entity_type; 
			id = edition.id; 
			*/
	
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
	
		    a.innerText = edition.name; 
			a.href = edition.resource_url; 
			li.appendChild(a); 
			ul.appendChild(li); 
		})
	
		h3.textContent = 'Series'; 
		div.className = 'series'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
	}

	if (data.notes) {
		// console.log(data); 
		
		// var notes = data.notes.replace('a', 'AQAAAAA'); 
		// var notes = data.notes.replace(/\r/, '-return-'); 
		// notes = data.notes.replace(/\n/g, '</p><p>'); 
		
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
		
		h3.textContent = 'Notes'; 
		p.innerHTML = data.notes.replace(/\n/g, '</p><p>'); 
		
		div.appendChild(h3); 
		div.appendChild(p); 
		div.className = 'notes'; 
		contentArea.appendChild(div); 
	}
	
	if (data.identifiers) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 

		data.identifiers.forEach(function(identifier) {
			var li = document.createElement('li'); 
			var span_type = document.createElement('span'); 
			var span_description = document.createElement('span'); 
			var span_value = document.createElement('span'); 
			
			span_type.textContent = identifier.type; 
			span_type.className = 'type'; 
			span_description.textContent = identifier.description; 
			span_description.className = 'description'; 
			span_value.textContent = identifier.value; 
			span_value.className = 'value'; 
			
			li.appendChild(span_type); 
			li.appendChild(span_description); 
			li.appendChild(span_value); 
			ul.appendChild(li); 
		}); 
		
		h3.textContent = 'Identifiers'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		div.className = 'identifiers'; 
		contentArea.appendChild(div); 
	}

	/* unused so far
	"id": 1,
	"resource_url": "http://api.discogs.com/releases/1",
	"status": "Accepted",
	"data_quality": "Correct",
	"uri": "http://www.discogs.com/Persuader-Stockholm/release/1",
	"master_id": 5427,
	"master_url": "http://api.discogs.com/masters/5427",
	"released_formatted": "Mar 1999",
	"community": {
		"have": 272,
		"want": 177,
		"rating": {
		"count": 81,
		"average": 4.48
	},
	"submitter": {
		"username": "teo",
	    "resource_url": "http://api.discogs.com/users/teo"
	},
    "contributors": [
		{
			"username": "MONK",
			"resource_url": "http://api.discogs.com/users/MONK"
		}
	]
	"companies": [
		{
			"entity_type": "23",
		    "catno": "",
		    "id": 271046,
		    "entity_type_name": "Recorded At",
		    "name": "The Globe Studios",
		    "resource_url": "http://api.discogs.com/labels/271046"
		}
	],
	"videos": [
		{
	    	"uri": "http://www.youtube.com/watch?v=QVdDhOnoR8k",
	    	"duration": 334,
	    	"embed": true,
	    	"description": "The Persuader-Stockholm-Sodermalm",
	    	"title": "The Persuader-Stockholm-Sodermalm"
	    }
	],
	*/	

	var anchors = contentArea.getElementsByTagName('a'); 

	for(var i = 0; i < anchors.length; i++) {
		if (anchors[i].className != '') {
			anchors[i].addEventListener(
				'click', 
				function(e) {
					e.preventDefault(); 

					var paginator = new Paginator(); 
					var per_page = constants.PERPAGE; 
					var url; 

					if (this.className == 'label') {
						var title = data.title.replace(' ', '%20'); 

						url = this.href + '?title=' + title + '&per_page=' + per_page; 
					} else if (this.className == 'artist') {
						var artistName = this.textContent.replace(' ', '%20'); 

						url = this.href + '?artistName=' + artistName; 
					} else if (this.className == 'edition') {
						var artistName = this.textContent.replace(' ', '%20'); 

						url = this.href + '?artistName=' + artistName; 
					}
	
					paginator.addPage(url, this.className); 
				}, 
				false
			); 
		}
	}; 
}