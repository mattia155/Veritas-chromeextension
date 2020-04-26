// Content script: auto-run when a page is opened or refreshed

// Check if the page contains tag associated with a news (trhough jQuery)
articles = $("div[class*='article'], div[class*='Article'], section[class*='article'], section[class*='Article'], body[class*='artic'], div[class*='news'], div[class*='News']");
if(articles.length > 0){
    // Enable the extension
    chrome.runtime.sendMessage({
        action: 'updateView',
        value: true
    });
    // Find title of the article
    title = $("title").text()
    chrome.runtime.sendMessage({
        action: 'storeTitle',
        value: title
    });
}else{
    // Disable the extension
    chrome.runtime.sendMessage({
        action: 'updateView',
        value: false
    });
}