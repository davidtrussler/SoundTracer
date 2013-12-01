var Paginator = function() {}

Paginator.prototype.addPage = function(url, type) {
	console.log('Paginator.addPage'); 
	
	var ajax = new Ajax(); 
	var allPages = document.getElementById('pages'); 

	// TODO assign Items to a global variable and construct as other objects
	// clear the stored page items
	Items.clear(); 

	// display loading notification
	loadMessage('add');
	
	ajax.getData('GET', url, function(response) {
		var thisPage = document.createElement('li'); 
		var library = new Library(); 

		if (response.status == 200) {
			var data = JSON.parse(response.content); 
			
			if (!data) {
				var p = document.createElement('p'); 
				p.textContent = constants.SEARCH_NO_RESULTS; 
				thisPage.appendChild(p); 
			} else {
				var sorter = new ArraySorter(); 

				if (url) {
					if (url.indexOf('?') != -1) {
						var querystring = url.split('?')[1]; 
						var queryStringInterpreter = new QueryStringInterpreter(); 
						var query = queryStringInterpreter.getQuery(querystring); 
					}
				}

				// display sort items on certain types
				if (type == 'releases' || type == 'versions') {
					sorter.displaySort(thisPage); 
				/* } else {
					sorter.hideSort(thisPage); 
				*/ }
		
				switch(type) {
					case 'searchResults':
						var lister = new Lister(); 

						allPages.innerHTML = ''; 
						thisPage.className = 'searchResults'; 
						lister.displayData(data, thisPage, type, query); 

						break; 
					case 'releases':
						var lister = new Lister(); 

						thisPage.className = 'releases'; 
						lister.displayData(data, thisPage, type, query); 

						break; 
					case 'versions':
						var lister = new Lister(); 

						thisPage.className = 'versions'; 
						lister.displayData(data, thisPage, type, query); 

						break; 
					case 'artist':
						var artist = new Artist(); 
	
						thisPage.className = 'artist'; 
						artist.displayData(data, thisPage); 
						
						break; 
					case 'master':
						var master = new Master(); 
	
						thisPage.className = 'master'; 
						master.displayData(data, thisPage); 
						
						break; 
					case 'release':
						var release = new Release(); 
	
						thisPage.className = 'release'; 
						release.displayData(data, thisPage); 
						
						break; 
					case 'label':
						var label = new Label(); 
	
						thisPage.className = 'label'; 
						label.displayData(data, thisPage); 
						
						break; 
				}
			}
		} else {
			thisPage.className += ' error '; 
			thisPage.innerHTML = '<p>' + constants.AJAX_ERROR + response.status + '</p>'; 
		}

		// remove loading notification
		loadMessage('remove')
		
		var liveIndex = null; 

		for (var i = 0; i < allPages.children.length; i++) {
			if (allPages.children[i].className.indexOf('live') != -1) {
				liveIndex = parseInt(i); 
				library.removeClass('live', allPages.children[i]); 
			}
		}

		for (var i = allPages.children.length - 1; i >= 0; i--) {
			if (liveIndex != null && i > liveIndex) {
				allPages.removeChild(allPages.children[i]); 
			}
		}

		thisPage.className += ' live '; 
		thisPage.className += ' page '; 
		allPages.appendChild(thisPage); 

		// set page carousel
		var layoutController = new LayoutController(); 
		var viewController = new ViewController(); 

		layoutController.setPageWidths(allPages); 

		if (thisPage.className.indexOf('searchResults') != -1) {
			viewController.showPage('searchResults'); 
		} else {
			viewController.showPage('live'); 
		}
		
		// BEGIN setting up scrolling --
		var pages = document.getElementById('pages') || null; 
		
		if (pages && pages.children.length > 0) {
			viewController.setUpScrolling(pages.children); 
		}
		// -- END setting up scrolling 
	});
}

Paginator.prototype.addToPage = function(url, type, thisPage) {
	console.log('Paginator.addToPage'); 
	
	var ajax = new Ajax(); 
	
	// display loading notification
	loadMessage('add')
	
	ajax.getData('GET', url, function(response) {
		if (response.status == 200) {
			var data = JSON.parse(response.content); 
			var library = new Library(); 
			
			if (data.pagination) {
				var pagination = data.pagination; 
				var page = pagination.page; 
				var pages = pagination.pages; 
				var per_page = pagination.per_page; 
				var items = pagination.items; 
			}

			if (data.results) {
				var results = data.results; 
			}

			if (!data) {
				var p = document.createElement('p'); 
				p.textContent = constants.SEARCH_NO_RESULTS; 
				thisPage.appendChild(p); 
			} else {
				var lister = new Lister(); 
				lister.displayData(data, thisPage, type); 
			}
		} else {
			thisPage.className += ' error '; 

			for (var i = 0; i < thisPage.children.length; i++) { 
				if (thisPage.children[i].tagName == 'UL') {
					thisPage.children[i].children[thisPage.children[i].children.length - 1].textContent = constants.AJAX_ERROR + response.status; 
				}
			}
		}

		// remove loading notification
		loadMessage('remove')
	});
}

function loadMessage(action) {
	var loadMessageContainer; 
	
	if (document.getElementById('loadMessageContainer')) {
		loadMessageContainer = document.getElementById('loadMessageContainer'); 
	} else {
		loadMessageContainer = document.createElement('div'); 
	}
	
	if (action == 'add') {
		var loadMessage = document.createElement('p'); 
		
		loadMessage.textContent = constants.LOADING_MESSAGE; 
		loadMessageContainer.id = 'loadMessageContainer'; 
		loadMessageContainer.appendChild(loadMessage); 
		
		document.body.appendChild(loadMessageContainer); 
	} else {
		document.body.removeChild(loadMessageContainer); 
	}
}