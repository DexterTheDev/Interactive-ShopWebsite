let login = () => {
  $.ajax({
    type: "POST",
    url: `/panel/login`,
    data: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
    dataType: "json",
    contentType: "application/json",
    success: async (res) => {
      if (!res.access) document.getElementById("alert").setAttribute("class", "text-center text-red-700 pt-3");
      else location.href="/refuerzo/panel"
    },
  });
};
