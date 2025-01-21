let Getpromo;
let purchase = (id, quantity, size) => {
  $.ajax({
    type: "POST",
    url: `/buy?type=instant`,
    data: JSON.stringify({
      email: document.getElementById("email").value,
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      governorate: document.getElementById("governorate").value,
      postal: document.getElementById("postal").value,
      phone: document.getElementById("phone").value,
      promo: Getpromo,
      id,
      quantity,
      size,
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
        location.href = `/success/${res.orderID}`;
      }
    },
  });
};

let applyPromo = () => {
  $.ajax({
    type: "POST",
    url: `/applypromo`,
    data: JSON.stringify({
      promo: document.getElementById("promoCode").value,
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access)
        document.getElementById("promoAlert").innerHTML = res.message;
      else {
        Getpromo = document.getElementById("promoCode").value;
        let promo = document.getElementById("promoAlert");
        promo.classList.remove("text-red-600");
        promo.classList.add("text-green-600");
        promo.innerHTML = res.message;
        let total = document.getElementById("total").innerHTML;
        document.getElementById("total").innerHTML =
          Number(total) - Number(res.discount);
        document.getElementById("promoCode").value = "";
        document.getElementById("promoCodeAmount").innerHTML = `-${res.discount}`;
        document.getElementById("discountBox").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("discountBox").classList.add("opacity-100", "transition-opacity", "duration-500", "ease-in-out")
        }, 50)
       
        document.getElementById("applyPromo").onclick = () => {};
      }
    },
  });
};

let cartPurchase = (type) => {
  $.ajax({
    type: "POST",
    url: `/buy?type=${type}`,
    data: JSON.stringify({
      email: document.getElementById("email").value,
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      governorate: document.getElementById("governorate").value,
      postal: document.getElementById("postal").value,
      phone: document.getElementById("phone").value,
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
        location.href = `/success/${res.orderID}`;
      }
    },
  });
};