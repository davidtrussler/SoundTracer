var Label = function() {}

Label.prototype.displayData = function(data, contentArea) {
	console.log('Label.displayData'); 

	if (data.name) {
		var h2 = document.createElement('h2'); 
		
		h2.textContent = data.name; 
		contentArea.appendChild(h2); 
	}
	
	if (data.images) {
		var imageGallery = new ImageGallery(); 

		imageGallery.displayGallery(data.images, contentArea); 
	}

	if (data.profile) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
		
		h3.textContent = 'Profile'; 
		p.textContent = data.profile; 
		div.className = 'profile'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
	}
	
	if (data.sublabels) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
	
		data.sublabels.forEach(function(sublabel) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			
			a.href = sublabel.resource_url; 
			a.textContent = sublabel.name; 
			a.className = 'label'; 
			li.appendChild(a); 
			ul.appendChild(li); 

			/* unused data
			"id": 86537,
			*/
		})
		
		h3.textContent = 'Sublabels'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		div.className = 'sublabels'; 
		contentArea.appendChild(div); 
	}

	if(data.parent_label) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
		var a = document.createElement('a'); 
	
		a.textContent = data.parent_label.name; 
		a.href = data.parent_label.resource_url; 
		a.className = 'label'; 
		p.appendChild(a); 
		h3.textContent = 'Parent label'; 
		div.className = 'parent_label'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 

		/* unused data
		id: 2345
		*/
	}

	if (data.contact_info) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var p = document.createElement('p'); 
		
		h3.textContent = 'Contact info'; 
		p.textContent = data.contact_info; 
		div.className = 'contact_info'; 
		div.appendChild(h3); 
		div.appendChild(p); 
		contentArea.appendChild(div); 
	}
	
	if (data.urls) {
		var div = document.createElement('div'); 
		var h3 = document.createElement('h3'); 
		var ul = document.createElement('ul'); 
		
		data.urls.forEach(function(url) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			
			a.href = url; 
			a.innerText = url; 
			li.appendChild(a); 
			ul.appendChild(li); 
		}); 
		
		h3.textContent = 'URLs'; 
		div.appendChild(h3); 
		div.appendChild(ul); 
		div.className = 'urls'; 
		contentArea.appendChild(div); 
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
	}

	/* unused data
	"id": 1,
	"resource_url": "http://api.discogs.com/labels/1",
	"releases_url": "http://api.discogs.com/labels/1/releases",
	"uri": "http://www.discogs.com/label/Planet+E",
	"data_quality": "Needs Vote",
	*/

	var anchors = contentArea.getElementsByTagName('a'); 

	for (var i = 0; i < anchors.length; i++) {
		if (anchors[i].className != '') {
			anchors[i].addEventListener(
				'click', 
				function(e) {
					e.preventDefault(); 
					
					var paginator = new Paginator(); 
					var per_page = constants.PERPAGE; 
					var labelName = data.name.replace(' ', '%20'); 

					paginator.addPage(this.href + '?labelName=' + data.name + '&per_page=' + per_page, this.className); 
				}, 
				false
			);   
		}
	}
}