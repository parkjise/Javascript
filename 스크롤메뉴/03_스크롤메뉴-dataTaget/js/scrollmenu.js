document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("nav ul li");
  const sections = document.querySelectorAll(".section");

  // Function to remove 'active' class from all menu items
  function removeActiveClasses() {
    menuItems.forEach((item) => item.classList.remove("active"));
  }

  // Function to add 'active' class to the current section's menu item
  function addActiveClassToCurrentSection() {
    let currentSection = null;

    // Loop through sections to find the one closest to the top of the viewport
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop >= 0 && sectionTop < window.innerHeight / 2) {
        currentSection = section;
      }
    });

    // Update menu item's active class based on current section
    if (currentSection) {
      const activeItem = document.querySelector(
        `nav ul li[data-target="${currentSection.id}"]`
      );
      removeActiveClasses();
      activeItem.classList.add("active");
    }
  }

  // Scroll event listener to update active class on scroll
  window.addEventListener("scroll", addActiveClassToCurrentSection);

  // Smooth scrolling when clicking menu items
  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      const targetId = this.getAttribute("data-target");
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
