tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#000000",
                    200: "#0A0A0A",
                    300: "#121010"
                },
            }
        },
        fontFamily: {
            body: ["Montserrat"]
        }
    }
}

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});
