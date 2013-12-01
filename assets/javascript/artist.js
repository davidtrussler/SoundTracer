var Artist = function() {}

Artist.prototype.displayData = function(data, contentArea) {
	console.log('Artist.displayData'); 
	
	/*
	 * unused data
	** 
	"id": 45,
	"resource_url": "http://api.discogs.com/artists/45",
	"uri": "http://www.discogs.com/artist/Aphex+Twin",
	"data_quality": "Needs Vote",
	*/
	
	/* favourite removed for now --
	var p_fav = document.createElement('p');
	var a_fav = document.createElement('a');

	a_fav.setAttribute('data-type', 'artists'); 
	a_fav.setAttribute('data-id', data.id); 
	-- */

	if (data.name) {
		var h2 = document.createElement('h2'); 
		
		h2.textContent = data.name; 
		contentArea.appendChild(h2); 
		/* favourite removed for now --
		a_fav.setAttribute('data-name', data.name); 
		-- */
	}
	
	/* favourite removed for now --
	contentArea.appendChild(p_fav); 
	-- */

	if (data.images) {
		var imageGallery = new ImageGallery(); 

		imageGallery.displayGallery(data.images, contentArea); 
	}

	if (data.realname) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
	
		p.textContent = data.realname; 
		h3.textContent = 'Real name'; 
		div.id = 'realname'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-realname', data.realname); 
		-- */
	}
	
	if (data.namevariations) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.namevariations.forEach(function(namevariation) {
			var li = document.createElement('li'); 

			li.textContent = namevariation; 
			ul.appendChild(li); 
		}); 

		h3.textContent = 'Name variations'; 
		div.className = 'namevariations'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-namevariations', data.namevariations); 
		-- */
	}

	if (data.aliases) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.aliases.forEach(function(alias) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			
			a.href = alias.resource_url; 
			a.textContent = alias.name; 
			a.className = 'artist'; 
			li.appendChild(a); 
			ul.appendChild(li); 

			/* unused data
			"id": 86537,
			*/
		})
		
		h3.textContent = 'Aliases'; 
		div.className = 'aliases'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-aliases', data.aliases); 
		-- */
	}

	if (data.profile) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
		
		h3.textContent = 'Profile'; 
		p.innerHTML = data.profile.replace(/\r/g, '</p><p>'); 
		div.className = 'profile'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-profile', data.profile); 
		-- */
	}
	
	if (data.members) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.members.forEach(function(member) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			
			/* unused
			active: true
			id: 288990
			*/

			a.href = member.resource_url; 
			a.textContent = member.name; 
			a.className = 'artist'; 
			li.appendChild(a); 
			ul.appendChild(li); 
		}); 

		h3.textContent = 'Members'; 
		div.className = 'members'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-profile', data.profile); 
		-- */
	}
	
	if (data.urls) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.urls.forEach(function(url) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			
			a.href = url; 
			a.textContent = url; 
			li.appendChild(a); 
			ul.appendChild(li); 
		})
		
		h3.textContent = 'URLs'; 
		div.className = 'urls'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		contentArea.appendChild(div); 
		/* favourite removed for now --
		a_fav.setAttribute('data-urls', data.urls); 
		-- */
	}
	
	if (data.releases_url) {
		// var p = document.createElement('p'); 
		var ul = document.createElement('ul'); 
		var li = document.createElement('li'); 
		var a = document.createElement('a'); 

		a.href = data.releases_url; 
		a.textContent = 'releases'; 
		a.className = 'releases'; 
		li.appendChild(a); 
		ul.className = 'releases'; 
		ul.appendChild(li); 
		contentArea.appendChild(ul); 
		/* favourite removed for now --
		a_fav.setAttribute('data-releases_url', data.releases_url); 
		-- */
	}

	/* favourite removed for now --
	a_fav.addEventListener(
		'click', 
		function(e) {
			e.preventDefault(); 
			
			Android.favourite({
				'type': this.getAttribute('data-type'), 
			    'id': this.getAttribute('data-id')
			})
		}, 
		false
	)
	-- */

	var anchors = contentArea.getElementsByTagName('a'); 

	for(var i = 0; i < anchors.length; i++) {
		if (anchors[i].className != '') {
			anchors[i].addEventListener(
				'click', 
				function(e) {
					e.preventDefault(); 
					
					var paginator = new Paginator(); 
					var per_page = constants.PERPAGE; 
					var artistName = data.name.replace(' ', '%20'); 

					paginator.addPage(this.href + '?artistName=' + artistName + '&per_page=' + per_page, this.className); 
				}, 
				false
			);   
		}
	}
	
	/* favourite removed for now --
	a_fav.href = '#'; 
	a_fav.textContent = 'favourite'; 
	p_fav.appendChild(a_fav); 
	-- */
}