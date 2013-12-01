var Library = function() {}

Library.prototype.getSiblings = function(node, searchTag) {
	var siblings = new Array(); 
	var activeNode = node.parentNode.firstChild; 
	
	do {
		if (
			node != activeNode &&
			(!searchTag || (activeNode.tagName && (activeNode.tagName.toUpperCase() == searchTag.toUpperCase())))
		) {
			siblings.push(activeNode); 
		}
	} while (activeNode = activeNode.nextSibling); 
	
	return siblings; 
}

Library.prototype.removeClass = function(searchClass, node) {
	var nodeClass = node.className; 
	
	if (nodeClass.indexOf(searchClass) != -1) {
		var reg = new RegExp('(\\s|^)' + searchClass + '(\\s|$)');
		nodeClass = nodeClass.replace(reg, ' '); 
	}

	node.className = nodeClass; 
}

Library.prototype.addClass = function(searchClass, node) {
	var nodeClass = node.className || null; 
	
	if (nodeClass && nodeClass.indexOf(searchClass) == -1) {
		// var reg = new RegExp('(\\s|^)' + searchClass + '(\\s|$)');
		nodeClass += (' ' + searchClass); 
	}

	node.className = nodeClass; 
}