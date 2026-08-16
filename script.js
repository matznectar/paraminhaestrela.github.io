function nextPage() {
  const pages = document.querySelectorAll(".page");

  if (pages.length > 1) {
    pages[1].scrollIntoView({
      behavior: "smooth"
    });
  }
}


window.addEventListener("scroll", () => {

  const progress = document.getElementById("progress");

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    (scrollTop / documentHeight) * 100;

  progress.style.width = percentage + "%";

});
