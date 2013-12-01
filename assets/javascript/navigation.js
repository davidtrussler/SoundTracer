var Navigation = function() {}; 

Navigation.prototype.setUpLinks = function(linkElements) {
	if (linkElements) {
		var links; 
		
		if (linkElements instanceof Array) {
			links = linkElements
		} else {
			links = linkElements.getElementsByTagName('a') || null; 
		}
		
		if (links) {
			for (var i = 0; i < links.length; i++) {
				links[i].addEventListener(
					'click', 
					function(e) {
						e.preventDefault(); 
		
						var ajax = new Ajax(); 
						var li = document.createElement('li'); 
						var ul = document.getElementById('pages'); 
						var url = this.href; 
		
						ajax.getData('GET', url, function(data) {
							if (data.status == 200) {
								/* remove pages after current live page
								 * remove live class from current live page
								**
								console.log(ul.children); 

								for (var j = 0; j < ul.children.length; j++) {
									var thisPage = ul.children[j]; 
									var nextPage = thisPage.nextElementSibling || null; 
									
									if (nextPage && thisPage.className.indexOf('live') != -1) {
										library.removeClass('live', thisPage); 
										
										while (thisPage.nextElementSibling) {
											ul.removeChild(thisPage.nextElementSibling); 
										}
									}

									console.log(thisPage); 
									// console.log(nextPage); 
								}
								*/
								
								li.className = 'page live'; 
								li.innerHTML = data.content; 
								ul.appendChild(li); 
							}
						}); 
					}, 
				false
				) 
			}
		}
	}
}

// page view controls
Navigation.prototype.setUpPageViews = function() {
	var viewController = new ViewController(); 
	var pageControls = document.getElementById('pageNav').getElementsByTagName('a'); 

	for (var i = 0; i < pageControls.length; i++) {
		pageControls[i].addEventListener(
			'click', 
			viewController.showPage, 
			false
		); 
	}; 
}