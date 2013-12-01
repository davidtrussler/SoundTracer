var ImageGallery = function() {}

ImageGallery.prototype.displayGallery = function(images, contentArea) {
	console.log('ImageGallery.displayGallery'); 
	
	var head = contentArea.getElementsByTagName('h2')[0].textContent; 
	var div = document.createElement('div'); 
	var ul = document.createElement('ul'); 
	var imgs = new Array(); 

	images.forEach(function(image) {
		if (image.type == 'primary') {
			var li = document.createElement('li'); 
			var img = document.createElement('img'); 

			/* unused data
			"width": 600,
			"height": 600,
			"uri": "http://api.discogs.com/images/R-1-1193812031.jpeg",
			"resource_url": "http://api.discogs.com/images/R-1-1193812031.jpeg"
			*/

			img.src = image.uri150; 
			img.alt = head; 
			li.className = 'thumb primary'; 
			li.appendChild(img); 
			ul.appendChild(li); 
			
			var image = new Image().src = img.src; 
			imgs.push(image); 
		}
	}); 

	images.forEach(function(image) {
		if (image.type == 'secondary') {
			var li = document.createElement('li'); 
			var img = document.createElement('img'); 
			
			/* unused data
			"width": 600,
			"height": 600,
			"uri": "http://api.discogs.com/images/R-1-1193812031.jpeg",
			"resource_url": "http://api.discogs.com/images/R-1-1193812031.jpeg"
			*/

			img.src = image.uri150; 
			img.alt = head; 
			li.className = 'thumb secondary'; 
			li.appendChild(img); 
			ul.appendChild(li); 

			var image = new Image(); 
			image.src = img.src; 
			imgs.push(image); 
		}
	});

	div.className = 'images'; 
	div.appendChild(ul); 
	contentArea.appendChild(div); 

	// build the carousel --
	var carousel = ul; 
	var carouselContainer = ul.parentNode;
	var carouselWidth = 150 * imgs.length; // TODO: set dynamically 

	carousel.style.width = carouselWidth + 'px'; 
	carousel.style.webkitTransitionProperty = 'left';
	// -- END build the carousel

	// BEGIN set up touch events for the carousel --
	var touchStartX = 0; 
	var carouselStartX = 0; 
	var carouselContainerRect = document.getElementById('content').getBoundingClientRect(); // don't know why I needed to use the content dive here!
	var carouselContainerWidth = carouselContainerRect.right - carouselContainerRect.left; 
	var moveX; 
	var easeOutFactor; 
	
	console.log(carouselContainerWidth); 

	carousel.addEventListener(
		'touchstart', 
		function(e) {
			e.preventDefault(); 
	
			carousel.style.webkitTransitionDuration = 0;
			carousel.style.webkitTransitionTimingFunction = 'step-start'; 
			easeOutFactor = 0.58; // 0 - 1: default = 0.58
			moveX = new Array(); 
			touchStartX = eval(e.touches[0].pageX); 
			carouselStartX = window.getComputedStyle(carousel)['left'].replace('px', ''); 
		}, 
		false
	); 

	carousel.addEventListener(
		'touchmove', 
		function(e) {
			var leftPos = carouselStartX - (touchStartX - e.touches[0].pageX); 
			var date = new Date(); 
			var point = {}; 
	
			if (leftPos <= 0 && leftPos >= carouselContainerWidth - carouselWidth) {
				carousel.style.left = leftPos + 'px';
			}
			
			// array of all positions/timings during move
			point.position = leftPos; 
			point.time = date.getTime(); 
			moveX.push(point); 
		}, 
		false
	); 
	
	carousel.addEventListener(
		'touchend', 
		function(e) {
			// set sample range - 2 or more points from touchmove event
			var samplePoints = 4; 
			
			if (moveX.length < samplePoints) {
				samplePoints = moveX.length; 
			}
			
			var multiplier = 512; // converts velocity to pixels/ms - bit rough though (also ought to be proportionate to width)
			var distance = moveX[moveX.length - 1].position - moveX[moveX.length - samplePoints].position; 
			var time = moveX[moveX.length - 1].time - moveX[moveX.length - samplePoints].time; 
			var velocity = distance / time; // px / ms
			var leftPos = moveX[moveX.length - 1].position + (velocity * multiplier); 
			
			if (leftPos > 0) {
				// TODO: amend distance/time/ease proportionately 
	
				leftPos = 0; 
			}

			console.log(carouselContainerWidth ); 
			console.log(carouselWidth ); 
			
			if (leftPos < carouselContainerWidth - carouselWidth) {
				// TODO: amend distance/time/ease proportionately 
	
				leftPos = carouselContainerWidth - carouselWidth; 
			}
			
			carousel.style.left = leftPos + 'px';
			carousel.style.webkitTransitionDuration = Math.abs(velocity * multiplier / 1000) + 's';
			carousel.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, ' + easeOutFactor + ', 1)'; // 'ease-out'
		}, 
		false
	); 
	// -- END set up touch events for the carousel
}