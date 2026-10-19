
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Open and close the phone navigation menu
menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is selected
document.querySelectorAll("#navMenu a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Display the current year automatically
document.getElementById("year").textContent =
  new Date().getFullYear();

// Prepare a customer enquiry for WhatsApp
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const contact = document.getElementById("customerContact").value.trim();
  const service = document.getElementById("customerService").value;
  const message = document.getElementById("customerMessage").value.trim();

  if (!name || !contact || !service || !message) {
    alert("Please fill in all the fields.");
    return;
  }

  const whatsappMessage =
    "Hello Matricks Technologies!\n\n" +
    "My name: " + name + "\n" +
    "My contact: " + contact + "\n" +
    "I need: " + service + "\n" +
    "My enquiry: " + message;

  const whatsappURL =
    "https://wa.me/254793535552?text=" +
    encodeURIComponent(whatsappMessage);

  window.open(whatsappURL, "_blank");
});

// Preselect products when a quotation link is clicked
document.querySelectorAll("[data-product]").forEach(function (link) {
  link.addEventListener("click", function () {
    const serviceSelect = document.getElementById("customerService");
    const product = link.dataset.product;

    const matchingOption = Array.from(serviceSelect.options).find(
      function (option) {
        return option.text.toLowerCase().includes(product.toLowerCase());
      }
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    } else {
      serviceSelect.value = "Other IT support";
      document.getElementById("customerMessage").value =
        "I would like a quotation for " + product + ".";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("productSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(
    "#products .product-card"
  );
  const productCount = document.getElementById("productCount");

  if (!searchInput || !productCount || productCards.length === 0) {
    return;
  }

  let selectedCategory = "all";

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    productCards.forEach(function (card) {
      const category = card.dataset.category || "";
      const text = card.textContent.toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesSearch = text.includes(searchText);
      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount++;
      }
    });

    productCount.textContent =
      visibleCount + (visibleCount === 1
        ? " product found"
        : " products found");
  }

  searchInput.addEventListener("input", filterProducts);

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      filterProducts();
    });
  });

  filterProducts();
});

/* MATRICKS TECHNOLOGIES WHATSAPP ORDER FORM */
document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");

  if (!orderForm) return;

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const product = document.getElementById("orderProduct").value;
    const quantity = document.getElementById("orderQuantity").value;
    const details = document.getElementById("orderMessage").value.trim();

    if (!name || !phone || !product || Number(quantity) < 1) {
      alert("Please complete all required fields.");
      return;
    }

    const message =
      "Hello Matricks Technologies!\n\n" +
      "I would like to make an enquiry.\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Product/Service: " + product + "\n" +
      "Quantity: " + quantity + "\n" +
      "Additional details: " + (details || "None") + "\n\n" +
      "Please get back to me. Thank you.";

    const whatsappURL =
      "https://wa.me/254793535552?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
});
