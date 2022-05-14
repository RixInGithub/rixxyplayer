let canvas = document.getElementById("rixxyplayerCanvas")
code = document.getElementById("rixxyplayerCode")

function execRixp(script) {
	if (document.getElementById("start") !== null) {
		if (document.getElementById("start").getAttribute("disabled") == null) {
			var execStr = "sys.cls()\n\n" + new String(code.innerText).replaceAll('"', "`").replaceAll("'", "`") + '\n\ncanvas.appendChild(document.createElement("br"))'
			execStr = execStr.replaceAll("sys.log", "canvas.append")
			execStr = execStr.replaceAll("sys.cls()", 'canvas.innerHTML = ""')
			execStr = execStr.replaceAll("sys.insertLn()", 'canvas.appendChild(document.createElement("br"))')
		
			func = new Function(execStr.replace(";", ";\n"))
			showOutput()
			document.body.style.cursor = "progress"
			document.getElementById("start").setAttribute("disabled", "disabled")
			func()
			document.getElementById("start").removeAttribute("disabled")
			document.body.style.removeProperty("cursor")
		}
	} else if ((code === null) || (typeof code == "undefined")) {
		var execStr = "sys.cls()\n\n" + new String(script).replaceAll('"', "`").replaceAll("'", "`") + '\n\ncanvas.appendChild(document.createElement("br"))'
		execStr = execStr.replaceAll("sys.log", "canvas.append")
		execStr = execStr.replaceAll("sys.cls()", 'canvas.innerHTML = ""')
		execStr = execStr.replaceAll("sys.insertLn()", 'canvas.appendChild(document.createElement("br"))')

		func = new Function(execStr.replace(";", ";\n"))
		func()
	}
}