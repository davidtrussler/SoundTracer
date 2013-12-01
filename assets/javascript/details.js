var Details = function() {}

Details.prototype.displayDetails = function(query) {
	var qs = new QueryStringInterpreter(); 
	var queryObj = qs.getQuery(query); 
	var url = constants.URL_API; 
	var type; 
	
	for (prop in queryObj) {
		if (prop == 'type') {
			type = queryObj[prop]; 
			url += queryObj[prop] + 's/';  
		}
		
		if (prop == 'id') {
			url += queryObj[prop];  
		}
	} 
	
	var paginator = new Paginator; 
	
	paginator.addPage(url, type); 
}

/*
function getVersions(e) {
	var url = this.href; 
	var ajax = new Ajax(); 
	
	e.preventDefault(); 

	if (url.indexOf('?') == -1) {
		var per_page = constants.PERPAGE; 
		url += '?page=1&per_page=' + per_page; 
	}

	ajax.getData('GET', url, function(response) {
		if (response.status == 4) {
			var data = JSON.parse(response.content); 
			var versionContainer = document.getElementById('versions'); 
			parseResponse(data, 'versions', versionContainer); 
		}
	}); 
}
*/

Details.prototype.displayData = function(data, thisPage) {
	if (!data) {
		var p = document.createElement('p'); 
		p.innerText = constants.SEARCH_NO_RESULTS; 
		contentArea.appendChild(p); 
	} else {
		if (type == 'artist') {
			var artist = new Artist(); 
			artist.displayData(data, contentArea); 
		} else if (type == 'master') {
			var master = new Master(); 
			master.displayData(data, contentArea); 
		} else if (type == 'versions') {
			var pagination = data.pagination; 
			var versions = data.versions; 

			/* page -- */
			var li_page_primary = document.createElement('li'); 

			/* pagination -- */
			var page = pagination.page; 
			var pages = pagination.pages; 
			var per_page = pagination.per_page; 
			var urls = pagination.urls; // object

			var li_items = document.createElement('li'); 
			var li_pages = document.createElement('li'); 
			var ul_primary = document.createElement('ul'); 
			var ul_pages = document.createElement('ul'); 
			var span_name = document.createElement('span'); 
			var span_value = document.createElement('span'); 
			
			if (urls.prev) {
				var a = document.createElement('a'); 
				var li = document.createElement('li'); 

				a.innerText = constants.PAGE_PREV; 
				a.href = urls.prev; 
				li.appendChild(a); 
				ul_pages.appendChild(li); 
			}

			if (urls.first) {
				var a = document.createElement('a'); 
				var li = document.createElement('li'); 

				a.innerText = constants.PAGE_FIRST; 
				a.href = urls.first; 
				// a.className = 'pagination'; 
				li.appendChild(a); 
				ul_pages.appendChild(li); 
			}

			for(var i = 1; i <= pages; i++) {
				var a = document.createElement('a'); 
				var li = document.createElement('li'); 
				
				if (i == page) {
					li.className = 'current'; 
				}

				a.innerText = i; 
				li.appendChild(a); 
				ul_pages.appendChild(li); 
			}; 

			if (urls.next) {
				var a = document.createElement('a'); 
				var li = document.createElement('li'); 

				a.innerText = constants.PAGE_NEXT; 
				a.href = urls.next; 
				// a.className = 'pagination'; 
				li.appendChild(a); 
				ul_pages.appendChild(li); 
			}

			if (urls.last) {
				var a = document.createElement('a'); 
				var li = document.createElement('li'); 

				a.innerText = constants.PAGE_LAST; 
				a.href = urls.last
				// a.className = 'pagination'; 
				li.appendChild(a); 
				ul_pages.appendChild(li); 
			}

			span_name.innerText = constants.SEARCH_TOTAL; 
			span_value.innerText = pagination.items; 
			li_items.appendChild(span_name); 
			li_items.appendChild(span_value); 
			li_items.className = 'total'; 
			li_pages.appendChild(ul_pages); 
			li_pages.className = 'pagination'; 
			ul_primary.appendChild(li_items); 
			ul_primary.appendChild(li_pages); 
			li_page_primary.appendChild(ul_primary); 
			/* -- pagination */
			
			/* versions -- */
			var ul_listings = document.createElement('ul'); 

			versions.forEach(function(version) {
				/* unused returned data --
				version.id;
				version.status;
				-- */

				var a = document.createElement('a'); 
				var li_primary = document.createElement('li'); 
				var ul = document.createElement('ul'); 

				var variants = {
					'Title': version.title,
					'Catalogue Number': version.catno, 
					'Country': version.country, 
					'Format': version.format, 
					'Label': version.label, 
					'Released': version.released 
				}
				
				if (version.thumb) {
					var img = document.createElement('img'); 
					var li_secondary = document.createElement('li'); 

					img.src = version.thumb; 
					li_secondary.appendChild(img); 
					li_secondary.className = 'img'; 
					ul.appendChild(li_secondary); 
				}

				for (variant in variants) {
					if (variants[variant]) {
						var li_secondary = document.createElement('li'); 
						var span_name = document.createElement('span'); 
						var span_value = document.createElement('span'); 
						
						span_name.innerText = variant; 
						span_value.innerText = variants[variant]; 
						li_secondary.appendChild(span_name); 
						li_secondary.appendChild(span_value); 
						ul.appendChild(li_secondary); 
					}
				}

				a.href = version.resource_url; 
				// a.className = 'listing'; 
				a.appendChild(ul); 
				li_primary.appendChild(a); 
				ul_listings.className = 'listings'; 
				ul_listings.appendChild(li_primary); 
			});  
			/* -- versions */

			li_page_primary.appendChild(ul_listings); 
			li_page_primary.id = 'page_' + page; 
			contentArea.getElementsByTagName('ul')[0].appendChild(li_page_primary); 

			// set class of new page and unset others
			var pageSiblings = li_page_primary.parentNode.children; 
			for (var i = 0; i < pageSiblings.length; i++) {
				if (i == pageSiblings.length - 1) {
					pageSiblings[i].className = 'page current'; 
				} else {
					pageSiblings[i].className = 'page'; 
				}
			}; 
			/* -- page */

			// set up anchors to load more ajax content
			var links = contentArea.getElementsByTagName('a'); 
			
			for (var i = 0; i < links.length; i++) {
				if (links[i].parentNode.parentNode.parentNode.className.indexOf('pagination') != -1) {
					links[i].addEventListener(
						'click', 
						getVersions, 
						false
					); 
				}
			}; 
		} /* END if versions */
		/* BEGIN if label */ else if (type == 'label') {
			var label = new Label(); 
			label.displayData(data, contentArea); 
		} /* END if label */
	} /* END if data */
} /* END parseResponse */