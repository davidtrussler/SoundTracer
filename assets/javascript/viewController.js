var ViewController = function() {}; 

ViewController.prototype.showPage = function(page) {
	console.log('ViewController.showPage'); 
	
	var library = new Library(); 
	var pages = document.getElementById('pages'); 
	var allPages = pages.children; 
	var width = (pages.clientWidth/allPages.length);
	var left = pages.style.left; 
	
	pages.className = ''; 

	if (left.indexOf('px') != -1) {
		left = parseInt(left.replace('px', '')); 
	}
	
	if (page == 'live') {
		// bring live page into view
		for (var i = 0; i < allPages.length; i++) {
			if (allPages[i].className.indexOf('live') != -1) {
				pages.style.left = 0 - (i * width) + 'px'; 
			}
		}
	} else if (page == 'searchResults') {
		// bring search results (start) page into view (others are removed)
		pages.style.left = 0; 
	} else {
		// go back one page and mark current page as live
		var pagesRect = pages.getBoundingClientRect(); 
		var contentRect = document.getElementById('content').getBoundingClientRect(); 
		

		if (pagesRect.left < contentRect.left) {
			pages.style.left = left + width + 'px'; 
		}

		for (var i = 0; i < pages.children.length; i++) {
			var thisPage = pages.children[i]; 
			var nextPage = thisPage.nextElementSibling || null; 
			
			if (nextPage && nextPage.className.indexOf('live') != -1) {
				var sorter = new ArraySorter(); 

				thisPage.className += ' live'; 
				library.removeClass('live', nextPage); 
				
				// console.log(thisPage.className); 

				// display sort items on certain types
				if (thisPage.className.indexOf('releases') != -1 || thisPage.className.indexOf('versions') != -1) {
					sorter.displaySort(); 
				} else {
					sorter.hideSort(); 
				}
			}
		}
	}
}

ViewController.prototype.setUpScrolling = function(pages) {
	for (var i = 0; i < pages.length; i++) {
		// var moveX; 
		var moveY; 
		// var touchStartX = 0; 
		var touchStartY = 0; 
		// var pageStartX = 0; 
		var intent = null; 

		// if (typeof(pages[i].style.webkitOverflowScrolling) === 'undefined') {
			pages[i].addEventListener(
				'touchstart', 
				function(e) {
					// moveX = new Array(); 
					moveY = new Array(); 

					// start position Y on page (li)
					touchStartY = this.scrollTop + e.touches[0].pageY; 

					// start position X on page (li)
					// touchStartX = e.touches[0].pageX; 

					// starting position of page container (ul)
					// pageStartX = parseFloat(window.getComputedStyle(this.parentNode)['left']); 
				}, 
				false
			); 
			
			pages[i].addEventListener(
				'touchmove', 
				function(e) {
					// determine whether intention is vertical or horizontal
					e.preventDefault(); 
					
					/*
					if (!intent) {
						var minMove = 5; 
						
						if (Math.abs(e.touches[0].pageX - touchStartX) > minMove) {
							intent = 'x'; 
						} else if (Math.abs(e.touches[0].pageY - touchStartY) > minMove) {
							intent = 'y'; 
						}
					} else {
						if (intent == 'y') {
					*/
							var date = new Date(); 
							var point = {}; 
		
							this.scrollTop = touchStartY - e.touches[0].pageY; 
		
							point.position = e.touches[0].pageY; 
							point.time = date.getTime(); 
		
							moveY.push(point); 
					/*		
						} else if (intent == 'x') {
							// there are previous/next pages to display
							if (
								e.touches[0].pageX - touchStartX > 0 &&
								this.previousElementSibling ||
								e.touches[0].pageX - touchStartX < 0 &&
								this.nextElementSibling
							) {
								this.parentNode.style.left = eval((e.touches[0].pageX - touchStartX) + pageStartX) + 'px'; 
								moveX.push(e.touches[0].pageX); 
							}
						}
					}
					*/	
				}, 
				false
			); 
	
			pages[i].addEventListener(
				'touchend', 
				function(e) {
					/*
					if (intent) {
						if (intent == 'y') {
					*/
							if (moveY.length > 1) {
								var samplePoints = 4; 		// set sample range - 2 or more points from touchmove event
								var acceleration = 0.9; 	// rate at which to slow motion to stop.

								e.preventDefault(); 
								
								if (moveY.length < samplePoints) {
									samplePoints = moveY.length; 
								}
								
								var sampleDistance = Math.abs(moveY[moveY.length - (samplePoints)].position - moveY[moveY.length - 1].position); 
								var sampleTime = moveY[moveY.length - (samplePoints)].time - moveY[moveY.length - 1].time; 
								var distance = moveY[0].position - moveY[moveY.length - 1].position; 
								var scrollDistance = sampleDistance / (samplePoints - 1); 
								var scrollTime = sampleTime / (samplePoints - 1); 
								var page = this; 

								var scrollMove = window.setInterval(
									function() {
										if (!isNaN(scrollDistance) && scrollDistance != 0) {
											// console.log(scrollDistance); 

											if (distance > 0) {
												page.scrollTop += scrollDistance; 
											} else {
												page.scrollTop -= scrollDistance; 
											}

											scrollDistance *= 100;  
											scrollDistance = Math.floor(scrollDistance * acceleration); 
											scrollDistance /= 100;  
										} else {
											window.clearInterval(scrollMove); 
										}
									},
									scrollTime
								);
						/*
							}
						} else {
							if (moveX.length > 1) {
								e.preventDefault(); 
								
								var distanceX = Math.abs(moveX[moveX.length - 1] - moveX[0]); 
								var pageWidth = this.getBoundingClientRect().right - this.getBoundingClientRect().left; 
								
								if (distanceX > pageWidth / 3) {
									if (moveX[moveX.length - 1] - moveX[0] > 0) {
										this.parentNode.style.left = pageStartX + pageWidth + 'px'; 
									} else {
										this.parentNode.style.left = pageStartX - pageWidth + 'px'; 
									}
								} else {
									this.parentNode.style.left = pageStartX + 'px'; 
								}
							} else {
								this.parentNode.style.left = pageStartX + 'px'; 
							}
						}
						*/
						
						//reset intent for next time
						// intent = null; 
					}
				}, 
				false 
			); 
		// }
	}
}