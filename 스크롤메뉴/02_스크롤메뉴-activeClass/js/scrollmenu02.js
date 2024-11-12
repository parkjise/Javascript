document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".section");

  // Function to remove 'active' class from all links
  function removeActiveClasses() {
    menuLinks.forEach((link) => link.classList.remove("active"));
  }

  // Function to add 'active' class to the current section link
  function addActiveClassToCurrentSection() {
    let currentSection = null;

    // Loop through sections to find the one closest to the top of the viewport
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop >= 0 && sectionTop < window.innerHeight / 2) {
        currentSection = section;
      }
    });

    // Update menu link's active class based on current section
    if (currentSection) {
      const activeLink = document.querySelector(
        `nav ul li a[href="#${currentSection.id}"]`
      );
      removeActiveClasses();
      activeLink.classList.add("active");
    }
  }

  // Scroll event listener to update active class on scroll
  window.addEventListener("scroll", addActiveClassToCurrentSection);

  // Smooth scrolling when clicking menu links
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

  // Initial call to set the active class on page load
  addActiveClassToCurrentSection();
});
