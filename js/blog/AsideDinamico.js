window.addEventListener("load", () => {
    window.addEventListener("scroll", () => {
        let aside = document.querySelector("aside");
        let abajo = aside.getBoundingClientRect().bottom;
        if (abajo < 0) {
            aside.classList.add("fijo");
        } else {
            aside.classList.remove("fijo");
        }
    });
});