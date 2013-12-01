/*NO LONGER IN USE*/


var SearchResults = function() {}; 

SearchResults.prototype.displayData = function(data, thisPage) {
	var library = new Library(); 
	var pagination = data.pagination; 
	var results = data.results; 
	var page = pagination.page; 
	var pages = pagination.pages; 
	var per_page = pagination.per_page; 
	var items = pagination.items; 
	var displayed; 

	if (results.length == 0) {
		var p = document.createElement('p'); 
		p.textContent = constants.SEARCH_NO_RESULTS; 
		thisPage.appendChild(p); 
	} else {
		if (items > page * per_page) {
			displayed = page * per_page; 
		} else {
			displayed = items; 
		}

		/* results -- */
		var listings = new Array(); 

		for (result in results) {
			/* unused returned data
			var id = searchResult.id; 
			var uri = searchResult.uri; 
			*/
			
			var searchResult = results[result]; 
			var ul = document.createElement('ul'); 
			var li_primary = document.createElement('li'); 
			var div_thumb = document.createElement('div'); 
			var li_title = document.createElement('li'); 
			var a = document.createElement('a'); 
			var span = document.createElement('span'); 
			var img = document.createElement('img'); 

			if (document.getElementById('moreResults')) {
				var moreResults = document.getElementById('moreResults'); 
				moreResults.parentNode.removeChild(moreResults); 
			}
			
			img.src = searchResult.thumb; 
			div_thumb.className = 'thumb'; 
			span.textContent = searchResult.type; 
			span.className = 'type'; 
			li_title.textContent = searchResult.title; 
			li_title.className = 'title'; 
			a.href = searchResult.resource_url; 
			li_primary.className = 'listing'; 
			
			div_thumb.appendChild(img); 
			li_title.appendChild(span); 
			ul.appendChild(div_thumb); 
			ul.appendChild(li_title); 
			a.appendChild(ul); 
			li_primary.appendChild(a); 
			thisPage.appendChild(li_primary); 

			listings.push(a); 
		}
		
	/*	var searchResult = results[result]; 
		var ul = document.createElement('ul'); 
		var li_primary = document.createElement('li'); 
		var li_thumb = document.createElement('li'); 
		var li_title = document.createElement('li'); 
		var a = document.createElement('a'); 
		var span = document.createElement('span'); 
		var img = document.createElement('img'); 

		if (document.getElementById('moreResults')) {
			var moreResults = document.getElementById('moreResults'); 
			moreResults.parentNode.removeChild(moreResults); 
		}
		
		img.src = searchResult.thumb; 
		li_thumb.className = 'thumb'; 
		span.textContent = searchResult.type; 
		span.className = 'type'; 
		li_title.textContent = searchResult.title; 
		li_title.className = 'title'; 
		a.href = searchResult.resource_url; 
		li_primary.className = 'listing'; 
		
		li_thumb.appendChild(img); 
		li_title.appendChild(span); 
		ul.appendChild(li_thumb); 
		ul.appendChild(li_title); 
		a.appendChild(ul); 
		li_primary.appendChild(a); 
		thisPage.appendChild(li_primary); 

		listings.push(a); 
	} */
		/* -- results */

		// set up anchors to load ajax content
		var paginator = new Paginator(); 
		
		listings.forEach(function(listing) {
			listing.addEventListener(
				'click', 
				function(e) {
					e.preventDefault(); 
					paginator.addPage(this.href, searchResult.type); 
				}, 
				false
			)
		}); 

		/* pagination -- */
		if (pagination.urls.next) {
			var li = document.createElement('li'); 
			var a = document.createElement('a'); 
			var span = document.createElement('span'); 

			span.innerText = 'Displaying ' + displayed + ' of ' + items + ' results'; 
			span.className = 'counter'; 
			a.href = pagination.urls.next; 
			a.innerText = constants.PAGE_NEXT; 
			a.appendChild(span); 
			li.id = 'moreResults'; 
			li.appendChild(a); 
			thisPage.appendChild(li); 

			li.firstChild.addEventListener(
				'click', 
				function(e) {
					var paginator = new Paginator; 

					e.preventDefault(); 
					paginator.addPage(this.href, 'searchResults')
				}, 
				false
			); 
		}
		/* -- pagination */
	}
}