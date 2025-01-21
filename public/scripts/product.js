let selectedSize = "m";

let select = (size) => {
  let sizes = ["xs", "s", "m", "l", "xl"];

  selectedSize = size;
  sizes.map((toLock) => {
    if (toLock == size)
      document
        .getElementById(toLock)
        .setAttribute(
          "class",
          "rounded-2xl py-1 px-4 border-4 border-primary-300 middle m-1 bg-primary-300 transition duration-300 ease-in-out shadow-2xl transform shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        );
    else
      document
        .getElementById(toLock)
        .setAttribute(
          "class",
          "rounded-2xl py-1 px-4 border-4 border-primary-300 middle shadow-2xl drop-shadow-lg m-1 bg-transparent"
        );
  });
};

let counter = 1;

const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");

incrementBtn.addEventListener("click", () => {
  counter++;
  counterValue.innerHTML = counter;
});

decrementBtn.addEventListener("click", () => {
  if (counter <= 1) return;
  counter--;
  counterValue.innerHTML = counter;
});

let buyNow = (id) => {
  location.href = `/buy?type=instant&id=${id}&quantity=${counter}&size=${selectedSize}`;
};

let changeImg = (img) => {
  document.getElementById("mainImage").setAttribute("src", `/public/productImages/${img}`)
}

let addToCart = (id) => {
  $.ajax({
      type: "POST",
      url: `/buy?type=cart`,
      data: JSON.stringify({  id, quantity: counter, size: selectedSize??"m"  }),
      dataType: "json",
      contentType: "application/json",
      success: async (res) => {
        console.log(res)
        if (!res.access) document.getElementById("alert").innerHTML = res.message;
        else {
         document.getElementById("cartBtn").setAttribute("onclick", "")
         document.getElementById("cartBtn").setAttribute("class", "border py-3 px-2 border-gray-400 m-2 w-full cursor-default opacity-60")
         document.getElementById("cartBtn").innerText = "ADDED TO CART";
        }
      },
    });
}