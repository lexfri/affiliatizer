if (window.top === window) {
	var rewroteLinksWithSetting = 0;
	var tag = 0;
	var lastTag = 0;
	var ender = '';
	links = document.getElementsByTagName('a'); 
	theLength = links.length;
	
	safari.self.addEventListener("message", handleMessage, false);
	safari.self.tab.dispatchMessage("tellMe", "please"); // ask for value
}

function rewriteLinks(theTag) {
	newEnder = 0;
	
	for (i=0;i<theLength;i++) { 
		if (i > 1000) {
			break;
		}
		
		href = links[i].href;
		if (href.indexOf('www.amazon.com') != -1 && href.indexOf('tag=') == -1) {
			if (href != 'http://www.amazon.com/' && href.indexOf('?') == -1 && href.indexOf('/ref=') == -1) {
		 		 stringLength = href.length;
				 startAt = stringLength - 4;
				 lastFour = href.substring(startAt);				 
				 if (lastFour == 'html') {
				 	ender = '?tag=' + theTag;
 				 } else {
					ender = '/ref=nosim/' + theTag;
 				 }
			} else if (href.indexOf('?') != -1) {
				ender = '&tag=' + theTag;
			} else if (href == 'http://www.amazon.com/' || href == 'http://www.amazon.com') {
				ender = '?tag=' + theTag;
			}
			links[i].href = links[i].href + ender;
		} else if (ender > '' && href.indexOf('amazon.com') != -1) {
			newEnder = ender.replace(lastTag, theTag);
			links[i].href = links[i].href.replace(ender, newEnder);
		}
		
	}
	
	if (newEnder) {
		ender = newEnder;
	}
	
	lastTag = theTag;
}

function handleMessage(msgEvent) {
	var messageName = msgEvent.name;
	var messageData = msgEvent.message;

	if (messageName === "newAffiliate") {
   		tags = messageData;
		if (tags && tags != 'null' && tags != null) {
			randomOne = Math.floor(Math.random()*tags.length);
			tag = tags[randomOne];
	   		rewriteLinks(tag);
			rewroteLinksWithSetting = 1;
		} else {
			tags = ['thelexfiles05-20','daringfirebal-20', 'intertext'];
			randomOne = Math.floor(Math.random()*tags.length);
			tag = tags[randomOne];
			rewriteLinks(tag);
		}
	}
}