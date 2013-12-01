var layoutController = new LayoutController(); 

window.addEventListener(
	'load', 
	function() {
		var navigation = new Navigation; 
		var formHandler = new FormHandler(); 
	
		// BEGIN set up navigation --
		var nav = document.getElementById('nav') || null; 
	
		if (nav) {
			navigation.setUpLinks(nav); 
		}
		// -- END set up navigation
		
		// BEGIN set up page views --
		navigation.setUpPageViews(); 
		// -- END set up page views 
			
		// BEGIN set up forms --
		formHandler.setUpForms(); 
		// -- END set up forms
		
		// BEGIN layout --
		layoutController.setPageHeights(); 
		// -- END layout
	}, 
	false
);

window.addEventListener(
	'resize', 
	function(e) {
		// BEGIN layout --
		var allPages = document.getElementById('pages'); 

		layoutController.setPageHeights(); 
		layoutController.setPageWidths(allPages); 
		layoutController.setPagePositions(); 
		// -- END layout
	}, 
	false
)