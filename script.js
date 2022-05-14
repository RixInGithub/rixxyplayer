var nav = document.getElementById("nav");
var tab1 = document.getElementById("canvasTab");
var tab2 = document.getElementById("codeTab");
canvas = document.getElementById("rixxyplayerCanvas");
code = document.getElementById("rixxyplayerCode")
var docsLink = document.getElementById("docsLink")
var aprilFools = {
	month: 3,
	date: 1
}

function isItAprilFoolDay() {
	var now = new Date();
	return (now.getMonth() == aprilFools.month && now.getDate() == aprilFools.date);
}

if (isItAprilFoolDay()) {
	docsLink.setAttribute("href", "https://bit.ly/3ENl5qf")
}

canvas.style.height = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
canvas.style.minHeight = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
canvas.style.maxHeight = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
code.style.height = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
code.style.minHeight = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
code.style.maxHeight = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
window.addEventListener("resize", function() {
  canvas.style.height = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
	canvas.style.minHeight = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
	canvas.style.maxHeight = (window.innerHeight - nav.clientHeight - (2 * 16)).toString() + "px";
	code.style.height = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
	code.style.minHeight = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
	code.style.maxHeight = new String(window.innerHeight - nav.clientHeight - (2 * 16)) + "px"
})

function showCode() {
	canvas.style.display = "none";
	code.style.display = "block";
	tab1.setAttribute("class", "tab");
	tab2.setAttribute("class", "openTab");
}

function showOutput() {
	canvas.style.display = "block";
	code.style.display = "none";
	tab1.setAttribute("class", "openTab");
	tab2.setAttribute("class", "tab");
}

function exportRixp() {
	var link = document.createElement('a');
	var dateObject = new Date();
	var year = dateObject.getFullYear();
	var month = dateObject.getMonth() + 1;
	var day = dateObject.getDate();
	var now = year.toString() + "-" + month.toString() + "-" + day.toString();
	var fileName = 'PROJECT_' + now + '.rixp'

	link.style.display = 'none';
	link.setAttribute('href', "data:application/rixp;utf-8,/*\n\tMade in <https://rixxyplayer-www.rixthetyrunt.repl.co/>.\n*/\n\n" + btoa(code.innerText));
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function fileUploadStart() {
	let uploader = document.createElement('input')

	uploader.style.display = 'none';
	uploader.setAttribute('type', 'file')
	uploader.setAttribute('id', 'pleaseDeleteMe')
	uploader.setAttribute('onchange', 'readFile(event)')
	document.body.appendChild(uploader);
	uploader.click();
}

function readFile(event, useDataUrl=false) {
	var reader = new FileReader();
	var uploader = document.getElementById("pleaseDeleteMe");
	
	reader.onload = function () {
		code.textContent = reader.result;
    if (code.textContent == code.textContent.replace("/*\n\tMadein<https://rixxyplayer-www.rixthetyrunt.repl.co/>.\n*/\n\n", "")) {
      var riskForServer = confirm("Are you sure you want to countinue with this risky file?")
    }
		if (new RegExp("/^[0-1]+$/").test(code.textContent) == true) {
			code.textContent = code.textContent.split("").map((x) => x = String.fromCharCode(parseInt(x, 2))).join("")
		}
		if (riskForServer !== false) {
			code.textContent = code.textContent.replace("/*\n\tMadein<https://rixxyplayer-www.rixthetyrunt.repl.co/>.\n*/\n\n", ""); // Removes the verify
			code.textContent = atob(code.textContent)
    }
	};
	if (useDataUrl) {
		reader.readAsDataURL(event.target.files[0]);
	} else {
		reader.readAsText(event.target.files[0]);
	}
	document.body.removeChild(uploader)
}

/* function syncStart(secDelay) {
  document.getElementById("start").click()
  setTimeout(function() {syncStart(secDelay)}, (secDelay * 1000))
} */

document.addEventListener("keydown", function(e) {
	if (document.activeElement == document.body) { // Make sure if the user is not focusing any element
	  if (e.keyCode == 85) { // if e.keyCode returns 85 ( more info on https://keycode.info ) , it is equal the U key, and so on, the U is underscored, meaning that users can press the key in the keyboard. SO ACCESSIBLE
			document.getElementById("upload").click()
	  } else if (e.keyCode == 82) {
			document.getElementById("export").click()
	  } else if (e.keyCode == 83) {
			document.getElementById("start").click()
	  } else if (e.keyCode == 79) {
			showOutput()
		} else if (e.keyCode == 67) {
			showCode()
		} else if (e.keyCode == 68) {
			docsLink.click()
			code.focus()
		}
	}
});

function shareProject() {
	frame = document.createElement("iframe")
	frame.src = "//rixxyplayer-server.rixthetyrunt.repl.co/makeProject/?js=" + encodeURIComponent(code.innerText)
	frame.style.display = "none"
	document.body.appendChild(frame)
}

async function viewProject() {
	try {
		id = new Number(prompt("What project would you like to view?:"))
		var localResp = await fetch("//rixxyplayer-server.rixthetyrunt.repl.co/getProject/" + JSON.stringify(id) + "/", {mode: "no-cors"})
		var localRespRes = await localResp.text()
		code.innerText = localRespRes
	} catch (err) {
		alert("That was not a number!")
	}
}