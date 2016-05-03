chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "jquery-1.12.3.min.js"}, function() {
		// chrome.tabs.executeScript(null, {file: "parallax.min.js"}, function() {
			chrome.tabs.executeScript(null, { file: "app.js" });
		// });
	});
});
