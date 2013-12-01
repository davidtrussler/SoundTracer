var Items = new (function() {
	this.savedItems = new Array();

	this.addItems = function(items) {
		this.savedItems = this.savedItems.concat(items); 

		return this.savedItems; 
	}
	
	this.clear = function() {
		this.savedItems.length = 0; 
	}
}); 