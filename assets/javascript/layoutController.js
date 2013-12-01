/**
 * layoutController
 */

var LayoutController = function() {
	var pages = document.getElementById('pages'); 
}

LayoutController.prototype.setPageHeights = function() {
	console.log('LayoutController.setPageHeights'); 
	
	var header = document.getElementById('actionbar'); 
	var pageNav = document.getElementById('pageNav'); 
	var pageNavStyle = window.getComputedStyle(pageNav, null); 
	var headerStyle = window.getComputedStyle(header, null); 

	pages.style.height = 
		window.innerHeight - 
		parseFloat(pageNavStyle.height) - 
		parseFloat(headerStyle.height) - 
		parseFloat(headerStyle.paddingTop) - 
		parseFloat(headerStyle.paddingBottom) + 
		'px';
}

LayoutController.prototype.setPageWidths = function() {
	console.log('LayoutController.setPageWidths'); 
	
	var loadedPages = pages.children; 
	var pagesWidth = 0; 
	var content = document.getElementById('content'); 
	
	for (var i = 0; i < loadedPages.length; i++) {
		loadedPages[i].style.width = content.clientWidth + 'px'; 
	}; 
	
	pages.style.width = loadedPages.length * content.clientWidth + 'px'; 
}

LayoutController.prototype.setPagePositions = function() {
	console.log('LayoutController.setPagePositions'); 
	
	var left = 0; 
	var i = 0; 
	
	while (pages.children[i].className.indexOf('live') == -1) {
		left += parseFloat(pages.children[i].style.width); 
		i++; 
	}
	
	pages.className = 'orientationChange'; 
	pages.style.left = 0 - left + 'px'; 
}