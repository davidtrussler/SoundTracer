/*
 * ajax.js
 * create an Ajax object
 * For development launch Chrome with these flags: 
 * /usr/bin/google-chrome --allow-file-access-from-files --disable-web-security
**/

var Ajax = function() {}; 

function getResponse(request) {
	if (request.responseXML) {
		return request.responseXML.documentElement; 
	} else {
		return request.responseText; 
	}
}

Ajax.prototype.getData = function(method, url, callback) {
	var data = {}; 
	var request; 
	
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest; 
	} else {
		request = new ActiveXObject('Msxml2.XMLHTTP'); 
	}

	request.open(method, url, true); 
	request.send(url); 

	// console.log(this.readyState); 

	request.onreadystatechange = function() {
		// console.log('readystatechange!'); 
		// console.log(this.readyState); 
		// console.log(this.status); 
		
		switch(this.readyState) {
			case 1: 
				// data['status'] = 1; 
				data['content'] = null; 
				break; 
			case 2: 
				// data['status'] = 2; 
				data['content'] = null; 
				break; 
			case 3: 
				// data['status'] = 3; 
				data['content'] = null; 
				break; 
			case 4: 
				// data['status'] = 4; 
				data['content'] = getResponse(this); 
				data['status'] = this.status; 

				callback(data); 

				break; 
		}
	}; 
}