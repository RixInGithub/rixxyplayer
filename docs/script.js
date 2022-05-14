function addStyle(styleLink) {
	styleElement = document.createElement("link")
	styleElement.setAttribute("href", styleLink.toString());
	styleElement.setAttribute("rel", "stylesheet");
	styleElement.setAttribute("type", "text/css")
	document.head.appendChild(styleElement);
}

function deleteStyle(styleLink) {
	styleElement = document.head.querySelector("link[href=\"" + styleLink.toString() + "\"]")
	document.head.removeChild(styleElement);
}
