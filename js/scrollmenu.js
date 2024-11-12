document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("nav ul li a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 50, // Adjust for navbar height
        behavior: "smooth",
      });
    });
  });
});
