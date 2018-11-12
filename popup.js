chrome.tabs.getSelected(null, function(tab)
{
	document.getElementById("qrimg").src = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + tab.url;
});