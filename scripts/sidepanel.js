chrome.storage.session.get("panelData", function (response) {
  let indexCount = 1;
  console.log("Hello Side Panel!");
  for (const [index, value] of response.panelData.src.entries()) {
    let fileURLPath = "";
    let fileOBJ = "";
    if (isJSON(value)) {
      fileOBJ = JSON.parse(value);
      fileURLPath = fileOBJ.fileURL;
    } else {
      fileURLPath = value;
    }
    let imgPath = new URL(fileURLPath);
    let divWrapperElem = document.createElement("div");
    divWrapperElem.id = "sidepanel-list-" + indexCount;

    let fieldSetElem = document.createElement("fieldset");
    fieldSetElem.classList.add(`fieldset-${indexCount}`, "tss-fieldset");

    let imgElem = document.createElement("img");
    imgElem.src = fileURLPath;
    //imgElem.crossOrigin = "anonymous";
    imgElem.className = "sidepanel-img-" + indexCount;

    let fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`field-wrapper-${indexCount}`, "field-wrapper");

    let deleteImg = document.createElement("button");
    deleteImg.type = "button";
    deleteImg.classList.add("delete-img");
    deleteImg.setAttribute("data-div-id", `sidepanel-list-${indexCount}`);
    deleteImg.innerHTML = "X";

    let imgName = document.createElement("input");
    imgName.type = "text";
    imgName.name = `text-${indexCount}`;
    imgName.id = `text-${indexCount}`;
    imgName.required = true;
    imgName.placeholder = "Enter file name";
    imgElem.className = "sidepanel-img-" + indexCount;
    if (fileOBJ.fileName) {
      imgName.value = fileOBJ.fileName;
    }

    let hiddenFieldElem = document.createElement("input");
    hiddenFieldElem.type = "hidden";
    hiddenFieldElem.value = fileURLPath;
    hiddenFieldElem.name = `fileName-${indexCount}`;
    hiddenFieldElem.id = `fileName-${indexCount}`;

    fieldSetElem.appendChild(imgElem);
    fieldSetElem.appendChild(deleteImg);
    fieldWrapper.appendChild(imgName);
    fieldSetElem.appendChild(fieldWrapper);
    fieldSetElem.appendChild(hiddenFieldElem);
    divWrapperElem.appendChild(fieldSetElem);
    document.querySelector(".imgForm").appendChild(divWrapperElem);
    indexCount++;
  }
});

document.body.addEventListener("click", (e) => {
  if (e.target.className == "delete-img") {
    console.log(`Removing #${e.target.getAttribute("data-div-id")}`);
    document.querySelector("#" + e.target.getAttribute("data-div-id")).remove();
  }
});

document.querySelector(".download-img").addEventListener("click", async () => {
  let indexCount = 1;
  if (document.querySelector(".imgForm").reportValidity()) {
    let imgDivList = document.querySelectorAll(
      '.imgForm div[id*="sidepanel-list"]'
    );
    for (imgDiv of imgDivList) {
      let fileName = imgDiv.querySelector('input[id*="text-"]').value;
      let fileURL = imgDiv.querySelector('img[class*="sidepanel-img-"]').src;

      let fileExt = "";
      if (
        fileURL.split(".").pop().split("?")[0] == "jpg" ||
        fileURL.split(".").pop().split("?")[0] == "jpeg" ||
        fileURL.split(".").pop().split("?")[0] == "png"
      ) {
        fileExt = fileURL.split(".").pop().split("?")[0];
      } else {
        let blob = await getImageBlob(fileURL);
        fileExt = blob.type.split("/")[1];
      }
      chrome.downloads.download({
        url: fileURL,
        filename: fileName.replace(/[^a-zA-Z0-9-_\.\s]/g, "") + "." + fileExt,
      });
      indexCount++;
    }
  }
});

async function convert(source, type) {
  let reader = new FileReader();
  let imgBlob = await getImageBlob(source);
  reader.readAsDataURL(imgBlob);
  reader.onload = function () {
    return reader.result;
  };
  reader.onerror = function (error) {
    return "Error: ", error;
  };
}

function isJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

async function getImageBlob(imageUrl) {
  const response = await fetch(imageUrl, {
    method: "GET",
    mode: "no-cors",
    cache: "default",
  });
  return response.blob();
}
