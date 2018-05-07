var tags = ["thelexfiles05-20","daringfirebal-20", "intertext"];
var domain = "amazon.com"
var http_url = "http://www."+domain;
var https_url = "https://www."+domain;

// update configuration
safari.self.addEventListener("message", handleMessage, false);
safari.self.tab.dispatchMessage("get", "tags");
safari.self.tab.dispatchMessage("get", "domain");
safari.self.tab.dispatchMessage("refresh", "");

links = document.getElementsByTagName("a");

function rewriteLinks(theTag) {
	var ender = "";
	
	for (i = 0; i < links.length; i++) {
		if (i > 1000) break;
		
		href = links[i].href;
		
		if (href.indexOf(domain) != -1) {
			if (href.indexOf("tag=") == -1) {
				
				if (href.indexOf("?") != -1) {
					ender = "&tag=" + theTag;
				} else {
					ender = "?tag=" + theTag;
				}
				
				links[i].href = href + ender;
			}
		}
	}
}

function handleMessage(messageEvent) {
	var messageName = messageEvent.name;
	var messageData = messageEvent.message;
	
	if (messageName === "setDomain") {
		newDomain = messageData;
		
		if (newDomain && newDomain != "null" && newDomain != null) {
			domain = newDomain;
			http_url = "http://www."+newDomain;
			https_url = "https://www."+newDomain;
		}
	}
	
	if (messageName === "setAffiliate") {
   		newTags = messageData;
		
		if (newTags && newTags != "null" && newTags != null) {
			tags = newTags
		}
	}
	if (messageName === "refresh") {
	 	randomOne = Math.floor(Math.random() * tags.length);
	 	var theTag = tags[randomOne];
	    rewriteLinks(theTag);
	}

}