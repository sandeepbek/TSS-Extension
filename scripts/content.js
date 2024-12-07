let formattedDate = "";
let officeStyleCode = "";
let productId = "";
let styleCode = "";
let currentURL = "";
let retailerLinksColl = [];
let imgList = "";

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
  "https://footdistrict.com",
  "https://www.doverstreetmarket.com",
  "https://en.afew-store.com",
  "https://www.nicekicks.com",
  "https://www.soleretriever.com",
  "https://www.prodirectsport.com/",
  "https://justfreshkicks.com/",
  "https://sneakermarket.ro/",
  "https://www.sportsdirect.com/",
  "https://www.flannels.com/",
  "https://www.salomon.com/",
  "https://thesolesupplier.co.uk/",
  "https://www.crocs.co.uk/", 
  "https://www.ugg.com/"
];

let sitesToAdd = ["doverstreetmarket.com"];

let SNKRSScrollToEnd = 0;
function updateImgList() {
  if (
    window.location.href.includes("nike.com/gb/t") ||
    window.location.href.includes("nike.com/gb/launch/t") ||
    window.location.href.includes("nike.com/gb/u") ||
    window.location.href.includes("nike.com/") ||
    (window.location.hostname.includes("adidas.co.uk") &&
      document.querySelector("link#pdp-hero-image")) ||
    (window.location.hostname.includes("adidas.com") &&
      document.querySelector("link#pdp-hero-image")) ||
    (window.location.hostname.includes("asos.com") &&
      document.querySelector("#pdp-oos-hero")) ||
    window.location.href.includes("offspring.co.uk/view/product") ||
    window.location.href.includes("office.co.uk/view/product") ||
    window.location.href.includes("footlocker.co.uk/en/product") ||
    window.location.href.includes("footlocker.co.uk/product") || 
    window.location.href.includes("newbalance.co.uk/pd") ||
    window.location.href.includes("jdsports.co.uk/product") ||
    window.location.href.includes("footpatrol.com/product") ||
    window.location.href.includes("size.co.uk/product") ||
    window.location.href.includes("thehipstore.co.uk/product") ||
    window.location.href.includes("sevenstore.com/footwear/sneakers") ||
    window.location.href.includes("sevenstore.com/launches") ||
    window.location.href.includes("sneakersnstuff.com/gb/product") ||
    window.location.hostname.includes("footasylum.com") ||
    window.location.hostname.includes("converse.com") ||
    window.location.hostname.includes("asics.com") ||
    window.location.hostname.includes("endclothing.com") ||
    window.location.href.includes("mrporter.com/en-gb") ||
    window.location.hostname.includes("schuh.co.uk") ||
    window.location.hostname.includes("sneakerbardetroit.com") ||
    window.location.hostname.includes("fullress.com") ||
    window.location.hostname.includes("sneakernews.com") ||
    window.location.hostname.includes("complex.com") ||
    window.location.hostname.includes("kicksfinder.com") ||
    window.location.hostname.includes("hypebeast.com") ||
    window.location.hostname.includes("nakedcph.com") ||
    window.location.href.includes("uniqlo.com/uk/en/product") ||
    window.location.hostname.includes("footdistrict.com") ||
    window.location.hostname.includes("shop.doverstreetmarket.com") ||
    window.location.hostname.includes("afew-store.com") ||
    window.location.hostname.includes("nicekicks.com") ||
    window.location.hostname.includes("soleretriever.com") ||
    window.location.hostname.includes("prodirectsport.com") ||
    window.location.hostname.includes("justfreshkicks.com") ||
    window.location.hostname.includes("sneakermarket.ro") ||
    window.location.hostname.includes("sportsdirect.com") ||
    window.location.hostname.includes("flannels.com") ||
    window.location.hostname.includes("salomon.com") ||
    window.location.hostname.includes("thesolesupplier.co.uk") || 
    window.location.hostname.includes("crocs.co.uk") || 
    window.location.hostname.includes("ugg.com")
  ) {
    console.log("Update Image Triggered");

    if (
      window.location.href.includes("nike.com/gb/t") ||
      window.location.href.includes("nike.com/gb/launch/t") ||
      window.location.href.includes("nike.com/gb/u") ||
      window.location.href.includes("nike.com/")
    ) {
      console.log("On Nike website");
      let imgSrcList = new Set();
      let nikeImgLinks = "";
      if (window.location.href.includes("/launch/t")) {
        let SNKRSImgList = document.querySelectorAll(
          '#hero-image .carousel-image'
        );
          let SNKRSAddlImgList = document.querySelectorAll(
            '.photo-card-group .photo-component'
          );
        for (SNKRImg of SNKRSImgList) {
          let SNKRImgURL = SNKRImg.querySelector('.nds-image-wrapper img').getAttribute("src");
          /* SNKRImgURL = SNKRImgURL.replace(/\/t_prod_[a-z]{2,}/g, "");
          SNKRImgURL = SNKRImgURL.replace(
            /w_[0-9]{1,},q_auto,f_auto/g,
            ""
          ); */
          let cloudinaryTransformation = SNKRImgURL.match(/(?<=\/images\/)[^\/]+/)[0];
          SNKRImgURL = SNKRImgURL.replace(cloudinaryTransformation, 'w_1600,f_jpg,q_auto:eco');
          //imgSrcList.add(SNKRImgURL.replace(/\.[a-z]{3,}$/g, ".png"));
          imgSrcList.add(SNKRImgURL);
        }

        for (SNKRAddlImg of SNKRSAddlImgList) {
          let SNKRImgURL = SNKRAddlImg.querySelector('.nds-image-wrapper img').getAttribute("src");
          /*SNKRImgURL = SNKRImgURL.replace(/\/t_prod_[a-z]{2,}/g, "");
          SNKRImgURL = SNKRImgURL.replace(
            /w_[0-9]{1,},c_limit,q_auto,f_auto/g,
            "q_auto:good"
          ); */
          let cloudinaryTransformation = SNKRImgURL.match(/(?<=\/images\/)[^\/]+/)[0];
          SNKRImgURL = SNKRImgURL.replace(cloudinaryTransformation, 'w_1600,f_jpg,q_auto:eco');
          //imgSrcList.add(SNKRImgURL.replace(/\.[a-z]{3,}$/g, ".png"));
          imgSrcList.add(SNKRImgURL);
        }

        console.log("On SNKRS Product page");
      } else {
        if( document.querySelector('.pdp-grid .product-imagery') ) {
        let nikeStyleCode = document
          .querySelector("[property='og:url']")
          .getAttribute("content")
          .split("/")
          .pop();
        let jsonData = JSON.parse(
          document.getElementById("__NEXT_DATA__").innerText
        );
        let nikeProdRelDate = '';
        if(jsonData.props.pageProps.productGroups[0].products[nikeStyleCode] ) {
         nikeProdRelDate = new Date(
          jsonData.props.pageProps.productGroups[0].products[
            nikeStyleCode
          ].availabilityDate
        );
      }

        console.log("Nike.com stylecode: ", nikeStyleCode);

        formattedDate = new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Europe/London",
        }).format(nikeProdRelDate);

        nikeImgLinks = document.querySelectorAll(
          'div[data-testid="HeroImgContainer"] img'
        );

        for (nikeImgLink of nikeImgLinks) {
          let nikeImgFileName = new URL(nikeImgLink.getAttribute("src"))
            .pathname;
          let nikeImgFileNameSplitArray = nikeImgFileName
            .replace(/^\/|\/$/g, "")
            .split("/");
          /* imgSrcList.add(
            `https://static.nike.com/a/images/q_auto:eco,w_1600/${
              nikeImgFileNameSplitArray[4]
            }/${nikeImgFileNameSplitArray[5]
              .replace("jpg", "png")
              .replace("jpeg", "png")}`
          ); */
           imgSrcList.add(
            `https://static.nike.com/a/images/w_1600,f_jpg,q_auto:eco/${
              nikeImgFileNameSplitArray[4]
            }/${nikeImgFileNameSplitArray[5].replace("png", "jpg")}`
          ); 
          //imgSrcList.add(nikeImgFileName);
        }
      }
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("From Nike: ", imgList);
    } else if (
      window.location.hostname.includes("adidas.com") ||
      window.location.hostname.includes("adidas.co.uk")
    ) {
      if (document.querySelector("link#pdp-hero-image")) {
        let imgSrcList = new Set();
        let adidasImgLinks = document.querySelectorAll(
          'script[type="application/ld+json"]'
        )[0].innerText;
        let pageTitle = document
          .querySelector('meta[property="og:title"]')
          .getAttribute("content");
        adidasImgLinks = JSON.parse(adidasImgLinks).image;
        for (adidasImgLink of adidasImgLinks) {
          imgSrcList.add(
            adidasImgLink.replace(
              "w_600,f_auto,q_auto",
              "h_1600,q_auto,f_jpg,c_fill,g_auto"
            )
          );
        }
        imgList = { title: document.title, src: Array.from(imgSrcList) };
      }
    } else if (
      window.location.hostname.includes("asos.com") &&
      document.querySelector("#pdp-oos-hero")
    ) {
      let imgSrcList = new Set();
      let asosImgList = document.querySelectorAll(
        ".gallery-images img.gallery-image"
      );
      for (asosImg of asosImgList) {
        imgSrcList.add(
          `${asosImg.getAttribute("src").split("?")[0]}?$n_1280w$`
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
    } else if (
      window.location.href.includes("offspring.co.uk/view/product") ||
      window.location.href.includes("office.co.uk/view/product")
    ) {
      let imgSrcList = new Set();
      let offSpringImgList = document.querySelectorAll(
        "div.product-grid__slide.swiper-slide img.product-grid__img"
      );
      for (offspringImg of offSpringImgList) {
        if (offspringImg.hasAttribute("data-lazy")) {
          imgSrcList.add(offspringImg.getAttribute("data-lazy"));
        } else {
          imgSrcList.add(offspringImg.getAttribute("src"));
        }
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
    } else if (window.location.href.includes("footlocker.co.uk/en/product") || window.location.href.includes("footlocker.co.uk/product")) {
      let imgSrcList = new Set();
      let footlockerImgList = document.querySelectorAll(
        ".ProductGallery .slick-slide img"
      );
      for (footlockerImg of footlockerImgList) {
        imgSrcList.add(
          `${footlockerImg.getAttribute("src").split("?")[0]}?wid=1200`
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Footlocker: ", imgList);
    } else if (window.location.href.includes("newbalance.co.uk/pd")) {
      let imgSrcList = new Set();
      let newBalanceImgList = document.querySelectorAll(
        "#pdpCarousel .carousel-inner .carousel-item button"
      );
      let newBalanceAddlImgList = document.querySelectorAll(
        ".product-details-page-designer-assets .storepage img"
      );
      for (newBalanceImg of newBalanceImgList) {
        imgSrcList.add(
          `${
            newBalanceImg.getAttribute("data-src").split("?")[0]
          }?$dw_detail_main_lg$&fmt=jpg&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`
        );
      }

      for (newBalanceImg of newBalanceAddlImgList) {
        imgSrcList.add(
          `${
            newBalanceImg.getAttribute("data-src").split("?")[0]
          }?$dw_detail_main_lg$&fmt=jpg&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`
        );
      }

      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("New Balance: ", imgList);
    } else if (
      window.location.href.includes("jdsports.co.uk/product") ||
      window.location.href.includes("footpatrol.com/product") ||
      window.location.href.includes("size.co.uk/product")
    ) {
      let imgSrcList = new Set();
      let jdImgMETATag = document
        .querySelector('meta[property="og:image"]')
        .getAttribute("content");
      let jdImgURL = new URL(jdImgMETATag);
      const [jd, imgId, alphaCounter] = jdImgMETATag
        .split("/")
        .pop()
        .split("_");
      let jdImgGalleryLength = document.querySelectorAll(
        "div#owl-zoom .owl-thumbs button"
      ).length;
      if (!jdImgGalleryLength) jdImgGalleryLength = 5;
      let alphabet = "abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < jdImgGalleryLength; i++) {
        imgSrcList.add(
          `${jdImgURL.protocol}//${
            jdImgURL.hostname
          }/i/jpl/${jd}_${imgId}_${alphabet.charAt(i)}?qlt=80&w=1200`
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("JD :", imgList);
    } else if (window.location.href.includes("thehipstore.co.uk/product")) {
      let imgSrcList = new Set();

      let pageImgList = document.querySelectorAll(
        ".productMain #banner-section-images img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Hip: ", imgList);
    } else if (
      window.location.href.includes("sevenstore.com/footwear/sneakers") ||
      window.location.href.includes("sevenstore.com/launches")
    ) {
      let imgSrcList = new Set();
      let imgId = 0;
      let sevenStoreImgList = document.querySelectorAll(
        "script[type='application/ld+json']"
      )[0].innerText;
      let sevenStoreImgMetaTag = document
        .querySelector('meta[property="og:image"]')
        .getAttribute("content");

      if (
        document.querySelector(
          '.colour-swatches-scroll-wrapper a[role="button"].selected'
        )
      ) {
        imgId = document
          .querySelector(
            '.colour-swatches-scroll-wrapper a[role="button"].selected'
          )
          .style.backgroundImage.split('"')[1]
          .split("/")
          .pop()
          .split(".")[0];
      } else {
        imgId = sevenStoreImgMetaTag.split("/").pop().split(".")[0];
      }
      let sevenStoreImgListJSON = JSON.parse(sevenStoreImgList);

      for (sevenStoreImg of sevenStoreImgListJSON.image) {
        if (sevenStoreImg.includes(imgId)) {
          imgSrcList.add(sevenStoreImg.replace("medium", "large"));
        }
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Sevenstore: ", imgList);
    } else if (window.location.href.includes("sneakersnstuff.com/gb/product")) {
      let imgSrcList = new Set();
      let SNSImgList = document.querySelectorAll(
        ".carouselContainer > div[class*='ProductView_pdpGallery']"
      );
      for (SNSImg of SNSImgList) {
        imgSrcList.add(SNSImg.querySelector("img").currentSrc);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("SNS :", imgList);
    } else if (
      window.location.href.includes("schuh.co.uk") &&
      document.querySelector("#itemPage")
    ) {
      let imgSrcList = new Set();
      let schuhImgList = document.querySelectorAll(
        "#itemPage #lstThumbnails .productThumbnail img"
      );
      for (schuhImg of schuhImgList) {
        imgSrcList.add(schuhImg.getAttribute("src").replace("lg", "zm"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("schuh :", imgList);
    } else if (
      window.location.hostname.includes("footasylum.com") &&
      document.querySelector("#appRoot .pdp")
    ) {
      let imgSrcList = new Set();
      let footasylumImgList = document.querySelectorAll(
        ".embla .embla__slide img"
      );
      for (imgItem of footasylumImgList) {
        imgSrcList.add(imgItem.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Footasylum: ", imgList);
    } else if (window.location.hostname.includes("converse.com")) {
      let imgSrcList = new Set();
      let converseImgList = document.querySelectorAll(
        ".pdp-images-gallery__carousel .pdp-images-gallery__gallery-item img"
      );
      let pageTitle = document.title;
      for (converseImg of converseImgList) {
        imgSrcList.add(
          converseImg.getAttribute("data-src").split("?")[0] + "?sw=964"
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Converse: ", imgList);
    } else if (window.location.hostname.includes("asics.com")) {
      let imgSrcList = new Set();
      let asicsMetaImg = document
        .querySelector('meta[property="og:image"]')
        .getAttribute("content");
      let asicsStyleCode = document
        .querySelector(".variants__list .variants__link--selected")
        .getAttribute("data-variation-group-swatch")
        .replace("-", "_");
      let asicsImgURL = new URL(asicsMetaImg);
      let imgFileTemplate = ["SR_RT", "SB_FR", "SB_FL", "SB_BK", "SB_TP"];
      let oldPageTitle = document.title.split("|")[1];
      let pageTitle = document.title.replace(
        oldPageTitle,
        document
          .querySelector(".variants__header span")
          .innerText.replace("/", " ")
      );
      for (let i = 0; i < 5; i++) {
        imgSrcList.add(
          `${asicsImgURL.protocol}//${asicsImgURL.host}/is/image/asics/${asicsStyleCode}_${imgFileTemplate[i]}_GLB?$zoom$`
        );
      }
      imgList = { title: pageTitle, src: Array.from(imgSrcList) };
    } else if (
      window.location.hostname.includes("endclothing.com") &&
      document.querySelector('div[class*="PageWrapper__"]')
    ) {
      let imgSrcList = new Set();
      let endClothingImgList = document.querySelectorAll(
        'div[class*="PageWrapper__"] div[class*="ProductRibbon__ImageRibbonSC"] div[class*="styles__RibbonImageWrapperSC"] img'
      );
      for (endClothingImg of endClothingImgList) {
        let endImgURL = endClothingImg.getAttribute("src");
        endImgURL = endImgURL.replace(
          /f_auto,q_auto:eco,w_[0-9]{1,}/g,
          "f_auto,q_auto:eco,w_1600"
        );
        imgSrcList.add(endImgURL);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
    } else if (
      window.location.hostname.includes("prodirectsport.com") &&
      document.querySelectorAll(
        ".bootstrap-root .product-gallery .product-gallery__image"
      )
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".bootstrap-root .product-gallery .product-gallery__image"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("data-bgset").split("?")[0]);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("prodirectsport.com: ", imgList);
    } else if (
      window.location.href.includes("mrporter.com/en-gb") &&
      document.querySelector('div[class*="ProductDetailsPage"]')
    ) {
      let imgSrcList = new Set();
      let mrPorterImgList = document.querySelectorAll(
        'div[class*="__imageCarouselThumbnails"] div[class*="__thumbnail"] img'
      );
      for (mrPorterImg of mrPorterImgList) {
        let mrPorterImgURL = mrPorterImg.getAttribute("src");
        mrPorterImgURL = `${window.location.protocol}${mrPorterImgURL.replace(
          /w[0-9]{1,}_q[0-9]{1,}/g,
          "w2000_q60"
        )}`;
        imgSrcList.add(mrPorterImgURL);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Mr Porter: ", imgList);
    } else if (window.location.href.includes("uniqlo.com/uk/en/product")) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        'ul[id*="splide02-"] li img.js_sliderThumbImg'
      );
      for (imgItem of pageImgList) {
        let imgSrc = "";
        if (imgItem.getAttribute("src")) {
          imgSrc = imgItem.getAttribute("src");
        } else {
          imgSrc = imgItem.getAttribute("data-splide-lazy");
        }
        imgSrcList.add(`${imgSrc}?w=1000&impolicy=quality_60`);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Uniqlo: ", imgList);
    } else if (
      window.location.href.includes("sportsdirect.com") &&
      document.querySelector("#mainDetails")
    ) {
      let imgSrcList = new Set();
      let schuhImgList = document.querySelectorAll(
        "#productImageGrid .productRollOverPanel.swiper-container.active .swiper-wrapper .grid-item-swiper-slide"
      );
      for (schuhImg of schuhImgList) {
        imgSrcList.add(
          schuhImg.querySelector(".zoomMainImage").getAttribute("href")
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Sports Direct :", imgList);
    } else if (
      window.location.href.includes("flannels.com") &&
      document.querySelector("#productImages")
    ) {
      let imgSrcList = new Set();
      let flannelsImgList = document.querySelectorAll(
        "#productImageGrid .productRollOverPanel.swiper-container.active .swiper-wrapper .grid-item-swiper-slide"
      );
      for (flannelsImg of flannelsImgList) {
        imgSrcList.add(
          flannelsImg.querySelector(".zoomMainImage").getAttribute("href")
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Flannels :", imgList);
    } else if (
      window.location.href.includes("salomon.com") &&
      document.querySelector("#body.layout-pdp")
    ) {
      let imgSrcList = new Set();
      let salomonImgList = document.querySelectorAll(
        "div[is='slider-scroll-product-page']:not(.d-none) .layout-pdp-media-grid .slider-scroll_slide"
      );
      for (salomonImg of salomonImgList) {
        imgSrcList.add(
          `${salomonImg
            .querySelector(".layout-pdp-media-zoom")
            .getAttribute(
              "data-zoom"
            )}?auto=webp&bg-color=fff&dpr=2&fit=cover&format=pjpg&optimize=low&width=1600auto=webp&bg-color=fff&dpr=2&fit=cover&format=pjpg&optimize=low&width=1600`
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Salomon :", imgList);
    } else if (
      window.location.href.includes("thesolesupplier.co.uk") &&
      document.querySelector("div[data-cy='pdp-carousel']")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".carousel .carousel__slider-tray-wrapper .carousel__slide"
      );

      for (pageImg of pageImgList) {
        imgSrcList.add(
          `{"fileURL": "${pageImg
            .querySelector("img")
            .getAttribute("src")
            .replace("_w672_h672_pad_", "")
            .replace(".webp", "")}", "fileName": "${pageImg
            .querySelector("img")
            .getAttribute("alt")}"}`
        );
      }

      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("TSS :", imgList);
    } else if (
      window.location.href.includes("cms.thesolesupplier.co.uk") &&
      document.querySelector("#wpbody-content form#post")
    ) {
      //if( document.querySelector('.media-modal-content') !== null && document.querySelector('#attachment-details-title').value.replace('-', ' ').startsWith(document.querySelector('input[name="post_title"]').value.replace('/', ' ')) ) {
        if( document.querySelector('#attachment-details-alt-text').value == '' || document.querySelector('#attachment-details-alt-text').value == null ) {
          document.querySelector('#attachment-details-alt-text').value = document.querySelector('#attachment-details-title').value;
          console.log("Matched!");
        }
      //}

      /* document.addEventListener('input', (e) => {
        if ( e.target.id == 'title' || e.target.id == 'acf-field_5c641e6088a4e') {
          if( document.querySelector('#acf-field_5c641e6088a4e').value !== '' ) {
            document.querySelector('#acf-field_5c7ff1697dadd').value = document.querySelector('#title').value + " | " + document.querySelector('#acf-field_5c641e6088a4e').value;
          }
          else {
            document.querySelector('#acf-field_5c7ff1697dadd').value = document.querySelector('#title').value;
          }
        }
      }); */
      console.log("From TSS Admin");
    } else if (
      window.location.href.includes("crocs.co.uk") &&
      document.querySelector(".product-page")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".product-carousel-group .swiperCarouselWrapper ul.swiper-wrapper > li.swiper-slide"
      );

      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.querySelector('img').getAttribute('src').replace('t_pdphero', 't_pdpzoom'));
      }

      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Crocs :", imgList);
    } else if (
      window.location.href.includes("ugg.com") &&
      document.querySelector(".page--product")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".deckers-swiper__grid-splash .image-container"
      );

      for (pageImg of pageImgList) {
        let UGGImgSrc = pageImg.querySelector('img').getAttribute('data-src') ? pageImg.querySelector('img').getAttribute('data-src') : pageImg.querySelector('img').getAttribute('src');

        let UGGImgURL = new URL(UGGImgSrc);
        let UGGImgArray = UGGImgURL.pathname.split('/');
        let UGGImgBGIndex = UGGImgArray.findIndex(value => value.startsWith('b_rgb'));
        let UGGImgWidthIndex = UGGImgArray.findIndex(value => value.startsWith('w_'));
        UGGImgArray[UGGImgBGIndex] = 'b_rgb:ffffff';
        UGGImgArray[UGGImgWidthIndex] = 'w_1600';
        imgSrcList.add(UGGImgURL.origin  +  UGGImgArray.join('/'));
      }

      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("UGG :", imgList);
    } else if (window.location.hostname.includes("sneakerbardetroit.com")) {
      let imgSrcList = new Set();
      let SBDFeaturedImg = document
        .querySelector(".tdb_single_featured_image img.entry-thumb")
        .getAttribute("src");
      let pageImgList = document.querySelectorAll(".tdb_single_content img");
      imgSrcList.add(SBDFeaturedImg);
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Sneaker Bar Detroit: ", imgList);
    } else if (
      window.location.hostname.includes("fullress.com") &&
      document.querySelector('main[class*="l-main"] .postContents')
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        "main.l-main section.content img"
      );
      for (pageImg of pageImgList) {
        console.log("Ext: ", pageImg.getAttribute("src").split(".").pop());
        if (
          pageImg.getAttribute("src").includes("gif") ||
          pageImg.getAttribute("src").includes("data:image/")
        ) {
        } else {
          imgSrcList.add(pageImg.getAttribute("src"));
        }
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("Fullress", imgList);
    } else if (window.location.hostname.includes("sneakernews.com")) {
      let imgSrcList = new Set();
      let pageFirstImg = document
        .querySelector(".artical-main .article-data-info img")
        .getAttribute("src");
      let pageImgList = document.querySelectorAll(
        ".artical-main .article-left-content .sn-gallery-wrapper .gallery-item img"
      );
      imgSrcList.add(pageFirstImg);
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("sneakernews: ", imgList);
    } else if (window.location.hostname.includes("complex.com")) {
      let imgSrcList = new Set();
      let pageFirstImg = document
        .querySelector('div[class*="LeadMedia__LeadFigure"] img')
        .getAttribute("src")
        .split("?")[0];
      let pageImgList = document.querySelectorAll(
        "div[class*='Article__ArticleCopy'] .subbuzz-wrapper .subbuzz__media img"
      );
      imgSrcList.add(pageFirstImg);
      for (pageImg of pageImgList) {
        if (
          pageImg
            .getAttribute("class")
            .includes("subbuzz__media-image--deferred")
        ) {
          imgSrcList.add(pageImg.getAttribute("data-src").split("?")[0]);
        } else {
          imgSrcList.add(pageImg.getAttribute("src").split("?")[0]);
        }
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("complex: ", imgList);
    } else if (
      window.location.hostname.includes("kicksfinder.com") &&
      document.querySelector(".productdetail-main-blk")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".slide-wrapper .slider-img-cnt-blk img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("kicksfinder: ", imgList);
    } else if (
      window.location.hostname.includes("hypebeast.com") &&
      document.querySelector(".post-body-article")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".post-gallery-container .flickity-slider .carousel-cell-image-wrapper img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src").split('?')[0] + '?w=1400');
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("hypebeast.com: ", imgList);
    } else if (window.location.href.includes("nakedcph.com/products")) {
      let imgSrcList = new Set();
      let pageFirstImg = document
        .querySelector("meta[property='og:image:secure_url']")
        .getAttribute("content");
      imgSrcList.add(pageFirstImg);
      let nakedCph1 = new URL(pageFirstImg);
      let fileNameCode = nakedCph1.pathname
        .split("/")
        .splice(-1)
        .join("")
        .split(".")[0]
        .split("_")[0];
      for (let i = 2; i < 6; i++) {
        imgSrcList.add(
          `${nakedCph1.origin}/cdn/shop/files/${fileNameCode}_${i}.jpg`
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("hypebeast.com: ", imgList);
    } else if (
      window.location.hostname.includes("footdistrict.com") &&
      document.querySelector("body.catalog-product-view")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        "#productos-ficha .item-image img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(
          pageImg
            .getAttribute("src")
            .replace(/\/width\/[0-9]{1,}\//g, "/width/1200/")
        );
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("footdistrict.com: ", imgList);
    } else if (
      window.location.hostname.includes("shop.doverstreetmarket.com")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll("ul[x-ref='images'] li a");
      for (pageImg of pageImgList) {
        let imgSrc = pageImg.getAttribute("href");
        imgSrc = imgSrc.indexOf("https:") === -1 ? "https:" + imgSrc : imgSrc;
        imgSrcList.add(imgSrc);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("doverstreetmarket.com: ", imgList);
    } else if (
      window.location.hostname.includes("afew-store.com") &&
      document.querySelector("body.template-product")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        'script[type="application/ld+json"]'
      )[0].innerText;
      let jsonPageJSON = JSON.parse(pageImgList);
      jsonPageJSON = jsonPageJSON.image;
      for (let i = 0; i < jsonPageJSON.length; i++) {
        imgSrcList.add(jsonPageJSON[i]);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("afew.com: ", imgList);
    } else if (
      window.location.hostname.includes("nicekicks.com") &&
      document.querySelector("body.single.content")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".wp-block-gallery .wp-block-image img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("nicekicks.com: ", imgList);
    } else if (
      window.location.href.includes(
        "soleretriever.com/sneaker-release-dates"
      ) &&
      document.querySelectorAll(".embla__container .embla__slide img")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".embla__container .embla__slide img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("soleretriever.com: ", imgList);
    } else if (
      window.location.href.includes("soleretriever.com/news") &&
      document.querySelector("div[data-test-id='article-body']")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        "div[data-test-id='article-body'] article.article .article-content figure > img, div[data-test-id='article-body'] article.article .article-content section > img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src").split("?")[0]);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("soleretriever.com News: ", imgList);
    } else if (
      window.location.href.includes("justfreshkicks.com") &&
      document.querySelector("body.single-post")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        "article[class*='post-'] .td-post-content .wp-block-image img, article[class*='post-'] .td-post-content .wp-block-gallery img"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("src").split("?")[0]);
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("justfreshkicks.com News: ", imgList);
    } else if (
      window.location.href.includes("sneakermarket.ro") &&
      document.querySelector("body.single-post")
    ) {
      let imgSrcList = new Set();
      let pageImgList = document.querySelectorAll(
        ".entry-content .content-inner.jeg_link_underline a > img.size-large"
      );
      for (pageImg of pageImgList) {
        imgSrcList.add(pageImg.getAttribute("data-src"));
      }
      imgList = { title: document.title, src: Array.from(imgSrcList) };
      console.log("sneakermarket.ro News: ", imgList);
    }
  }
}

const targetNode = document.querySelector("body");
const config = { subtree: true, childList: true };
let observer = new MutationObserver(updateImgList);
observer.observe(targetNode, config);

if (document.readyState !== "loading") {
  updateImgList(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
  document.addEventListener("DOMContentLoaded", updateImgList);
}

if (window.location.hostname.includes("office.co.uk")) {
  officeStyleCode = document.querySelector('meta[itemprop="mpn"]').attributes
    .content.nodeValue;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Current URL:", window.location.hostname);
  if (window.location.hostname == "thesolesupplier.co.uk") {
    let pageId = document.querySelector(
      'a[href*="/marketplace/sell/listing/new/bulk?initialProductId="]'
    );
    /* let xpath =
      "//div[contains(@data-cy, 'product-information')]/div/div/div[5]/div[2]";
    styleCode = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue.textContent; */
    let TSSPageLDJSON = document.querySelectorAll(
      'script[type="application/ld+json"]'
    )[0].innerText;
    let jsonPageJSON = JSON.parse(TSSPageLDJSON);
    styleCode = jsonPageJSON[0].sku;
    let pageIdURL = new URL(pageId);
    productId = pageIdURL.searchParams.get("initialProductId");
    currentURL = window.location.href;
    currentURL = currentURL.replace(
      window.location.hostname,
      "spotlight.thesolesupplier.co.uk"
    );
    let retailerLinks = document.querySelectorAll(
      'div[data-cy="stock-listing-buttons"] > div > a[data-cy="external-link-button"]'
    );
    let hrefSet = new Set();
    for (retailerLink of retailerLinks) {
      if (
        !retailerLink.href.includes(
          "https://thesolesupplier.co.uk/marketplace/buy/products"
        )
      ) {
        hrefSet.add(retailerLink.href);
      }
    }
    retailerLinksColl = Array.from(hrefSet);
  }
  const pageObj = {
    productId: productId,
    styleCode: styleCode,
    spotLightURL: currentURL,
    retailerLinksColl: retailerLinksColl,
    relDate: formattedDate,
    officeCode: officeStyleCode,
    currentHost: window.location.hostname,
    pageInfo: imgList,
  };

  sendResponse(pageObj);
});
