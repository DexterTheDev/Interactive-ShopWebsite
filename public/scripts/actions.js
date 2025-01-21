let deleteOrder = (id) => {
  $.ajax({
    type: "POST",
    url: `/refuerzo/panel/orders/${id}`,
    data: JSON.stringify({ sendData: true }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      location.href = "/refuerzo/panel";
    },
  });
};

let clearCart = () => {
  $.ajax({
    type: "POST",
    url: `/clearcart`,
    data: JSON.stringify({ sendData: true }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      location.href = "/cart";
    },
  });
};

let email = () => {
  $.ajax({
    type: "POST",
    url: `/email`,
    data: JSON.stringify({ email: document.getElementById("email").value }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
        document.getElementById("alert").setAttribute("class", "text-center text-green-600")
        document.getElementById("alert").innerHTML = res.message
      }
    },
  });
};

let modifySettings = () => {
  $.ajax({
    type: "POST",
    url: `/refuerzo/panel/settings`,
    data: JSON.stringify({ shipping: document.getElementById("shipping").value, successMsg: document.getElementById("successMsg").value }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else {
        document.getElementById("alert").setAttribute("class", "text-center text-green-600")
        document.getElementById("alert").innerHTML = res.message
      }
    },
  });
};

let trackOrder = () => {
  location.href = `/trackorder?email=${document.getElementById("email").value}`
};

let modifyProduct = (id) => {
  $.ajax({
    type: "POST",
    url: `/panel/products/${id}/modify`,
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
        document.getElementById("alert").innerHTML = "Product has been modified, to modify images delete it and re add the product";
      }
    },
  });
};
