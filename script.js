const pages = document.querySelectorAll(".page");

const progress = document.getElementById("progress");

let currentPage = 0;

function goToPage(index) {
  if (index < 0) {
    index = 0;
  }

  if (index >= pages.length) {
    index = pages.length - 1;
  }

  currentPage = index;

  pages[currentPage].scrollIntoView({
    behavior: "smooth"
  });

  updateProgress();
}

function nextPage() {
  goToPage(currentPage + 1);
}

function updateProgress() {
  const percent =
    ((currentPage + 1) / pages.length) * 100;

  progress.style.width = percent + "%";
}

/* Detecta qual página está aparecendo */

const observer = new IntersectionObserver(
  function(entries) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        const index =
          Array.from(pages).indexOf(entry.target);

        if (index !== -1) {
          currentPage = index;
          updateProgress();
        }

      }

    });

  },
  {
    threshold: 0.6
  }
);

pages.forEach(function(page) {
  observer.observe(page);
});


/* Deslizar para cima/baixo */

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener(
  "touchstart",
  function(event) {

    touchStartY =
      event.changedTouches[0].screenY;

  },
  {
    passive: true
  }
);


document.addEventListener(
  "touchend",
  function(event) {

    touchEndY =
      event.changedTouches[0].screenY;

    const difference =
      touchStartY - touchEndY;

    /*
      Se arrastar mais de 60 pixels
      para cima, vai para a próxima página.
    */

    if (difference > 60) {
      goToPage(currentPage + 1);
    }

    /*
      Se arrastar mais de 60 pixels
      para baixo, volta.
    */

    if (difference < -60) {
      goToPage(currentPage - 1);
    }

  },
  {
    passive: true
  }
);


/* Teclado para testar no computador */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "ArrowDown") {
      goToPage(currentPage + 1);
    }

    if (event.key === "ArrowUp") {
      goToPage(currentPage - 1);
    }

  }
);


/* Começa na primeira página */

updateProgress();
