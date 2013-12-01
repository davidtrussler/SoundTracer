var ArraySorter = function() {}

var library = new Library(); 

ArraySorter.prototype.sort = function(list, page) {
	list.sort(order); 
	
	function order(a, b) {
		var select = page.getElementsByTagName('select')[0]; 
		var property = select.value.split('_')[0]; 
		var direction = select.value.split('_')[1]; 
		
		if (direction == 'asc') {
			return a[property] - b[property]; 
		} else {
			return b[property] - a[property]; 
		}
	}

	return list; 
}

ArraySorter.prototype.displaySort = function(page) {
	sortCategories = {
		year_asc: 'year ascending', 
		year_dec: 'year decending', 
		title_asc: 'title ascending', 
		title_dec: 'title decending'
	}
	
	var form = document.createElement('form'); 
	var fieldset = document.createElement('fieldset'); 
	var field = document.createElement('div'); 
	var label = document.createElement('label'); 
	var select = document.createElement('select'); 
	
	for(var category in sortCategories) {
		var option = document.createElement('option'); 
		
		option.value = category; 
		option.textContent = sortCategories[category]; 
		select.name = 'sort'; 
		select.appendChild(option); 
	} 
	
	label.textContent = 'sort results by'; 
	select.name = 'sortBy'; 
	select.addEventListener('change', updateList, false); 
	field.className = 'field'; 
	field.appendChild(label); 
	field.appendChild(select); 
	fieldset.className = 'sort'; 
	fieldset.appendChild(field); 
	form.appendChild(fieldset); 

	/* TODO: 
	 * make sorter a list that is activated from the activity bar
	 * also make it work!
	 * 
	page.appendChild(form); 
	**/
}

function updateList() {
	var el = this; 
	var list = Items.savedItems; 

	while (el.parentNode.tagName != 'LI') {
		el = el.parentNode; 
	}
	
	var page = el.parentNode; 
	
	console.log(list); 
	console.log(page); 

	var sorter = new ArraySorter(); 
	var list = sorter.sort(list, page); 

	console.log(list); 
	
	var lister = new Lister(); 

	lister.displayList(page.getElementsByTagName('ul')[0], list); 
}

ArraySorter.prototype.hideSort = function() {
	library.addClass('hide', this.sort); 
}