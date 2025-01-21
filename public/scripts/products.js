const fileTempl = document.getElementById("file-template"),
  imageTempl = document.getElementById("image-template"),
  empty = document.getElementById("empty");

// use to store pre selected files
let FILES = {};

// check if file is of type image and prepend the initialied
// template to the target element
function addFile(target, file) {
  const isImage = file.type.match("image.*"),
    objectURL = URL.createObjectURL(file);

  const clone = isImage
    ? imageTempl.content.cloneNode(true)
    : fileTempl.content.cloneNode(true);

  clone.querySelector("h1").textContent = file.name;
  clone.querySelector("li").id = objectURL;
  clone.querySelector(".delete").dataset.target = objectURL;
  clone.querySelector(".size").textContent =
    file.size > 1024
      ? file.size > 1048576
        ? Math.round(file.size / 1048576) + "mb"
        : Math.round(file.size / 1024) + "kb"
      : file.size + "b";

  isImage &&
    Object.assign(clone.querySelector("img"), {
      src: objectURL,
      alt: file.name,
    });

  empty.classList.add("hidden");
  target.prepend(clone);

  FILES[objectURL] = file;
}

const gallery = document.getElementById("gallery"),
  overlay = document.getElementById("overlay");

// click the hidden input of type file if the visible button is clicked
// and capture the selected files
const hidden = document.getElementById("hidden-input");
document.getElementById("button").onclick = () => hidden.click();
hidden.onchange = (e) => {
  for (const file of e.target.files) {
    addFile(gallery, file);
  }
};

// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
  types.indexOf("Files") > -1;

// use to drag dragenter and dragleave events.
// this is to know if the outermost parent is dragged over
// without issues due to drag events on its children
let counter = 0;

// reset counter and append file to gallery when file is dropped
function dropHandler(ev) {
  ev.preventDefault();
  for (const file of ev.dataTransfer.files) {
    addFile(gallery, file);
    overlay.classList.remove("draggedover");
    counter = 0;
  }
}

// only react to actual files being dragged
function dragEnterHandler(e) {
  e.preventDefault();
  if (!hasFiles(e)) {
    return;
  }
  ++counter && overlay.classList.add("draggedover");
}

function dragLeaveHandler(e) {
  1 > --counter && overlay.classList.remove("draggedover");
}

function dragOverHandler(e) {
  if (hasFiles(e)) {
    e.preventDefault();
  }
}

// event delegation to caputre delete events
// fron the waste buckets in the file preview cards
gallery.onclick = ({ target }) => {
  if (target.classList.contains("delete")) {
    const ou = target.dataset.target;
    document.getElementById(ou).remove(ou);
    gallery.children.length === 1 && empty.classList.remove("hidden");
    delete FILES[ou];
  }
};

// print all selected files
/*document.getElementById("submit").onclick = () => {
  alert(`Submitted Files:\n${JSON.stringify(FILES)}`);
  console.log(FILES);
};*/

// clear entire selection
document.getElementById("cancel").onclick = () => {
  while (gallery.children.length > 0) {
    gallery.lastChild.remove();
  }
  FILES = {};
  empty.classList.remove("hidden");
  gallery.append(empty);
};


let addproduct = () => {
  $.ajax({
    type: "POST",
    url: `/panel/products/add`,
    data: JSON.stringify({
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      sale: document.getElementById("sale").value,
      description: document.getElementById("description").value,
      sizes: {
        xs: document.getElementById("xs").value,
        small: document.getElementById("small").value,
        md: document.getElementById("md").value,
        lg: document.getElementById("large").value,
        xl: document.getElementById("xl").value,
      }
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
        document.getElementById("alert").setAttribute("class", "text-center text-green-600")
        document.getElementById("alert").innerHTML = "Upload product images and click continue";
        document.getElementById("productID").innerHTML = res.productID;
        document.getElementById("partTwo").setAttribute("class", "relative h-full flex flex-col bg-primary-200 shadow-xl rounded-md")
      }
    },
  });
};

let addImages = () => {

  const formData = new FormData();
  let count = 0;
  Object.keys(FILES).forEach(key => {
    count++
    formData.append('file'+count, FILES[key]);
  });

  $.ajax({
    type: "POST",
    url: `/panel/products/${document.getElementById('productID').innerHTML}/images`,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
       location.href="/refuerzo/panel"
      }
    },
  });
};
