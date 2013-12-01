var Master = function() {}

Master.prototype.displayData = function(data, contentArea) {
	console.log('Master.displayData'); 

	/* unused data
	"id": 8471,

	"resource_url": "http://api.discogs.com/masters/8471",

	"uri": "http://www.discogs.com/ACDC-Back-In-Black/master/8471",

	"main_release": 400591,

	"main_release_url": "http://api.discogs.com/releases/400591",

	"data_quality": "Correct",

	"videos": [
		{
			"duration": 211,
			"embed": true,
			"title": "AC/DC - You Shook Me All Night Long",
			"description": "AC/DC - You Shook Me All Night Long",
			"uri": "http://www.youtube.com/watch?v=Bomv-6CJSfM"
		}
	],
	*/
	
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
	
	if (data.tracklist) {
		var tracklister = new Tracklister(); 

		tracklister.displayTracklist(data.tracklist, contentArea); 
	}

	if (data.versions_url) {
		// var div = document.createElement('div'); 
		var ul = document.createElement('ul'); 
		// var h3 = document.createElement('h3'); 
		// var p = document.createElement('p'); 
		var li = document.createElement('li'); 
		var a = document.createElement('a'); 
		
		a.href = data.versions_url; 
		a.textContent = 'Versions'; 
		a.className = 'versions'; 
		// p.appendChild(a); 
		li.appendChild(a); 
		// div.id = 'versions'; 
		// div.appendChild(p); 
		ul.className = 'versions'; 
		ul.appendChild(li); 
		// contentArea.appendChild(div); 
		contentArea.appendChild(ul); 
	}
	
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

					if (this.className == 'versions') {
						var title = data.title.replace(' ', '%20'); 

						url = this.href + '?title=' + title + '&per_page=' + per_page; 
					} else if (this.className == 'artist' || this.className == 'extraartist') {
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