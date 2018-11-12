function openTab(url)
{
	chrome.tabs.create({'url': url}, null);
}

var createContextMenu = function (title, context, onclick)
{
	chrome.contextMenus.create({"title": title, "contexts": [context], "onclick": onclick});
};

function showQR(text)
{
	//window.open('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + text);
	openTab('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + text);
}

function showLinkQR(info, tab)
{
	var link = info.linkUrl;
	showQR(link);
}

function openGoogleDocsViewer(info, tab)
{
	var link = info.linkUrl;
	//window.open('https://docs.google.com/viewer?url=' + link);
	openTab('https://docs.google.com/viewer?url=' + link);
}

function showImageQR(info, tab)
{
	var link = info.srcUrl;
	showQR(link);
}

function showPageQR(info, tab)
{
	var link = info.pageUrl;
	showQR(link);
}

function showSelectionQR(info, tab)
{
	var text = info.selectionText;
	showQR(text);
}

function translateToArabic(info, tab)
{
	var text = info.selectionText;
	openTab('https://translate.google.com/#auto/ar/' + text);
}

function translateToEnglish(info, tab)
{
	var text = info.selectionText;
	openTab('https://translate.google.com/#auto/en/' + text);
}

function translatePageToArabic(info, tab)
{
	var text = encodeURIComponent(info.pageUrl);
	openTab('https://translate.google.com/translate?sl=auto&tl=ar&js=y&prev=_t&u=' + text);
}

var contexts = ["page", "selection", "link", "editable", "image", "video", "audio"];

for (var i = 0; i < contexts.length; i++)
{
	var context = contexts[i];

	switch (context)
	{
		case "page":
			var qrtitle = "Get QR for this page";
			createContextMenu(qrtitle, context, showPageQR);
			var qrtitle = "Translate page to Arabic";
			createContextMenu(qrtitle, context, translatePageToArabic);
			break;
		case "selection":
			var qrtitle = "Get QR";
			createContextMenu(qrtitle, context, showSelectionQR);
			var translateTitle = "Translate to Arabic";
			createContextMenu(translateTitle, context, translateToArabic);
			var translateTitle = "Translate to English";
			createContextMenu(translateTitle, context, translateToEnglish);
			break;
		case "link":
			var qrtitle = "Get QR for this link";
			createContextMenu(qrtitle, context, showLinkQR);
			var docsViewerTitle = "Open link in Google Docs Viewer";
			createContextMenu(docsViewerTitle, context, openGoogleDocsViewer);
			break;
		case "editable":
			break;
		case "image":
			var qrtitle = "Get QR for this image";
			createContextMenu(qrtitle, context, showImageQR);
			break;
		case "video":
			break;
		case "audio":
			break;
	}

}

//JSON.stringify(info) //Convert JSON Object to String.