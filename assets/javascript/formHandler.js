/**
 * formHandler.js
 * creates a FormHandler object
**/

var FormHandler = function() {}

FormHandler.prototype.setUpForms = function() {
	var forms = document.getElementsByTagName('form'); 
	
	if (forms && forms.length > 0) {
		for (var i = 0; i < forms.length; i++) {
			// set up search form
			if (forms[i].name == 'searchForm') {
				var paginator =  new Paginator(); 
				var per_page = constants.PERPAGE; 
				var actionbar = document.getElementById('actionbar') || null; 
				
				// hide search box
				forms[i].parentNode.className = 'hidden'; 

				// hide/show search box
				if (actionbar) {
					for (var j = 0; j < actionbar.getElementsByTagName('a').length; j++) {
						if (actionbar.getElementsByTagName('a')[j].parentNode.className.indexOf('search') != -1) {
							actionbar.getElementsByTagName('a')[j].addEventListener(
								'click', 
								function(e) {
									if (document.getElementById('search').className.indexOf('hidden') != -1) {
										document.getElementById('search').className = '';
									} else {
										document.getElementById('search').className = 'hidden';
									}
								}, 
								false
							); 
						}
					}
				}

				// deal with radio inputs
				var inputs = forms[i].getElementsByTagName('input');
				var noType; 
				
				for (var j = 0; j < inputs.length; j++) {
					if (inputs[j].name == 'searchType') {
						if (inputs[j].value == 'none') {
							noType = inputs[j]; 
						}
						
						noType.checked = true; 
						
						inputs[j].nextElementSibling.addEventListener(
							'click',
							function(e) {
								if (this.previousElementSibling != noType && this.previousElementSibling.checked == true) {
									e.preventDefault(); 
									this.previousElementSibling.checked = false; 									
									this.parentNode.removeAttribute('class'); 
									noType.checked = true; 
								} else {
									for (var k = 0; k < this.parentNode.parentNode.children.length; k++) {
										this.parentNode.parentNode.children[k].removeAttribute('class'); 
									}

									this.parentNode.className = 'selected'; 
								}
							},
							false
						);
					}
				}
				
				// submit search
				forms[i].addEventListener(
					'submit', 
					function(e) {
						e.preventDefault(); 
						
						var inputs = this.getElementsByTagName('input');
						var searchTermField = document.getElementById('searchField');
						var searchTerm = searchTermField.value;
						var searchType = "";
						
						for (var i = 0; i < inputs.length; i++) {
							if (inputs[i].name == 'searchType') {
								if (inputs[i].checked) {
									if (inputs[i].value == "none") {
										searchType = "";
									} else {
										searchType = inputs[i].value;
									}
								}
							}
						}

						var url = constants.URL_API + 'database/search?q=' + searchTerm + '&type=' + searchType + '&per_page=' + per_page; 
						var type = 'searchResults'; 
				
						// add page to display results
						paginator.addPage(url, type); 
						
						// hide search box on submit
						if (document.getElementById('search').className.indexOf('hidden') == -1) {
							document.getElementById('search').className = 'hidden';
						}
					},
					false
				); 
			}
		}
	}
}