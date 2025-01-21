let addPromo = () => {
  $.ajax({
    type: "POST",
    url: `/panel/promos/add`,
    data: JSON.stringify({
      promoCode: document.getElementById("promo").value,
      discount: document.getElementById("discount").value,
      limit: document.getElementById("limit").value,
      unlimited: document.getElementById("unlimited").checked,
      date: document.getElementById("date").value,
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").innerHTML = res.message;
      else location.href="/refuerzo/panel";
    },
  });
};
