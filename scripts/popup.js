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
  "https://www.complex.com",
  "https://www.kicksfinder.com",
  "https://www.hypebeast.com",
  "https://nakedcph.com",
  "https://uniqlo.com/uk/en/product",
  "https://www.doverstreetmarket.com",
  "https://en.afew-store.com",
  "https://www.nicekicks.com",
  "https://www.soleretriever.com",
  "https://justfreshkicks.com/",
  "https://www.crocs.co.uk/", 
  "https://www.ugg.com/"
];

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let tabIndex = tabs[0].index;
    console.log("Hi from tab", tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, { data: "hello" }, (response) => {
      console.log("Response: ", response);

      document.querySelector(".edit-page.btn").addEventListener("click", () => {
        if (response.currentHost.includes("thesolesupplier.co.uk")) {
          chrome.tabs.create({
            url:
              "https://cms.thesolesupplier.co.uk/wp-admin/post.php?post=" +
              response.productId +
              "&action=edit",
            index: tabIndex + 1,
          });
        }
      });

      document.querySelector(".scrape-it.btn").addEventListener("click", () => {
        if (response.currentHost.includes("thesolesupplier.co.uk")) {
          chrome.tabs.create({
            url:
              "https://peppa.thesolesupplier.co.uk/products/" +
              response.styleCode,
            index: tabIndex + 1,
          });
        }
      });
      document.querySelector(".spotlight.btn").addEventListener("click", () => {
        if (response.currentHost.includes("thesolesupplier.co.uk")) {
          chrome.tabs.create({ url: response.spotLightURL });
        }
      });
      document.querySelector(".ret-links.btn").addEventListener("click", () => {
        if (response.currentHost.includes("thesolesupplier.co.uk")) {
          for (retailerLink of response.retailerLinksColl) {
            chrome.tabs.create({ url: retailerLink, index: tabIndex + 1 });
          }
        }
      });
      document
        .querySelector(".nike-release.btn")
        .addEventListener("click", () => {
          if (response.currentHost.includes("nike.com")) {
            window.alert(`${response.relDate}`);
          }
        });
      document
        .querySelector(".office-code.btn")
        .addEventListener("click", () => {
          if (response.currentHost.includes("office.co.uk")) {
            chrome.tabs.create({
              url: `https://thesolesupplier.co.uk/release-dates/?q=${response.officeCode}`,
              index: tabIndex + 1,
            });
          }
        });
      /* document
        .querySelector(".nike-img.btn")
        .addEventListener("click", async () => {
          const { downloadImages } = await chrome.runtime.sendMessage({
            greeting: response,
          });
        }); */

      document
        .querySelector(".sidepanel.btn")
        .addEventListener("click", async () => {
          if (
            scrapedURLs.map((url) => {
              let urlHostName = new URL(tabs[0].url);
              let rootDomainName = extractRootDomainNoExt(urlHostName);
              return url.includes(rootDomainName);
            })
          ) {
            window.close();
            console.log("Clicked to open side panel");
            console.log("Panel Date:", response.pageInfo);
            chrome.storage.session.set({ panelData: response.pageInfo });
            chrome.sidePanel.open({ windowId: tabs[0].windowId });
          }
        });
    });
  });
});

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
