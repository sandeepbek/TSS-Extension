let scrapedURLs = [
  "https://www.nike.com",
  "https://www.adidas.co.uk",
  "https://www.adidas.com",
  "https://www.asos.com",
  "https://www.offspring.co.uk",
  "https://www.office.co.uk",
  "https://www.footlocker.co.uk",
  "https://www.newbalance.co.uk",
  "https://www.jdsports.co.uk",
  "https://www.footpatrol.com",
  "https://www.size.co.uk",
  "https://www.thehipstore.co.uk",
  "https://www.sevenstore.com",
  "https://www.sneakersnstuff.com",
  "https://www.footasylum.com",
  "https://www.converse.com",
  "https://www.asics.com",
  "https://www.endclothing.com",
  "https://www.mrporter.com",
  "https://www.schuh.co.uk",
  "https://www.sneakerbardetroit.com",
  "https://www.fullress.com",
  "https://www.sneakernews.com",
  "https://www.doverstreetmarket.com",
  "https://www.complex.com",
  "https://www.kicksfinder.com",
  "https://www.hypebeast.com",
  "https://nakedcph.com",
  "https://uniqlo.com/uk/en/product",
  "https://justfreshkicks.com/",
  "https://www.sportsdirect.com/",
  "https://www.flannels.com/",
  "https://www.salomon.com/",
  "https://thesolesupplier.co.uk/",
  "https://www.crocs.co.uk/", 
  "https://www.ugg.com/"
];

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.greeting) {
    let indexCount = 1;

    let pageTitle = msg.greeting.pageInfo.title;
    for (const [index, value] of msg.greeting.pageInfo.src.entries()) {
      let fileExt = "";
      if (
        value.split(".").pop() == "jpg" ||
        value.split(".").pop() == "jpeg" ||
        value.split(".").pop() == "png"
      ) {
        fileExt = value.split(".").pop();
      } else {
        const blob = await getImageBlob(value);
        fileExt = blob.type.split("/")[2];
      }
      chrome.downloads.download({
        url: value,
        filename:
          pageTitle.replace(/[^a-zA-Z0-9-_\.\s]/g, "") +
          "-" +
          indexCount +
          "." +
          fileExt,
      });
      indexCount++;
    }
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "URLChange",
      url: changeInfo.url,
    });
  }
});

/*chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  // Enables the side panel on google.com
  if (
    scrapedURLs.map((currentUrl) => {
      let urlHostName = new URL(tab.url);
      console.log(urlHostName);
      let rootDomainName = extractRootDomainNoExt(urlHostName);
      return currentUrl.includes(rootDomainName);
    })
  ) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
}); */

async function getImageBlob(imageUrl) {
  const response = await fetch(imageUrl, {
    method: "GET",
    mode: "no-cors",
    cache: "default",
  });
  return response.blob();
}

function extractRootDomainNoExt(url) {
  let domain = new URL(url).hostname;
  let splitArr = domain.split(".");
  let arrLen = splitArr.length;

  if (arrLen == 2) {
    domain = splitArr[0];
  } else if (arrLen > 2) {
    domain = splitArr[arrLen - 2];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      domain = splitArr[arrLen - 3];
    }
  }
  return domain;
}
