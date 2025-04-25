async function loadPartial(elId, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  document.getElementById(elId).innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadPartial("site-header", "./assets/components/header.html"),
    loadPartial("site-home", "./assets/components/home.html"),
    loadPartial("site-about", "./assets/components/about.html"),
    loadPartial("site-services", "./assets/components/services.html"),
    loadPartial("site-footer", "./assets/components/footer.html"),
    loadPartial("site-contact-modal", "./assets/components/contact-modal.html"),
  ]);

  window.addEventListener(
    "scroll",
    () => {
      app.checkScroll();
    },
    { passive: true }
  );

  const app = {
    pages: ["home", "about", "services"],
    activePage: "home",
    isMobileMenuOpen: false,
    isModalVisible: false,
    templateMessage: encodeURIComponent(
      "Hello! I'm interested in booking a consultation. Could you please share more information?"
    ),
    services: [
      {
        id: 1,
        title: "Free Diagnostics",
        details:
          "Start with a free mini-diagnostic to assess your skin, explain how I can help, and review consultation plans & costs.",
      },
      {
        id: 2,
        title: "Consultation",
        details:
          "In-depth session to analyze your skin type, review your current routine, select the right products, and craft your personalized plan.",
      },
      {
        id: 3,
        title: "Support",
        details:
          "Get follow-up support—5 days with the Basic plan or 2 months with With Support—plus the option to extend as needed.",
      },
    ],
    openService: null,
    isScrolled: false,

    // Hero Section Image Animation
    heroImages: [
      { src: "./assets/images/hero_about_3.jpg", alt: "Irina 3", show: false },
      { src: "./assets/images/hero_about_2.jpg", alt: "Irina 2", show: false },
      { src: "./assets/images/hero_about_1.jpg", alt: "Irina 1", show: false },
    ],

    init() {
      window.addEventListener("popstate", (event) => {
        if (event.state && event.state.page) {
          this.navigateTo(event.state.page, false); // Don't push state again
        }
      });

      const initialPage = window.location.hash.replace("#", "");
      if (initialPage) this.navigateTo(initialPage, false); // Don't push state for initial load
    },

    navigateTo(pageId, pushState = true) {
      if (pushState) {
        history.pushState({ page: pageId }, "", "#" + pageId);
      }
      this.activePage = pageId;
      this.isMobileMenuOpen = false;

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Trigger hero image animations if on the About page
      if (pageId === "about") {
        this.animateHeroImages();
      }
    },

    toggleService(serviceId) {
      if (this.openService === serviceId) return (this.openService = null);
      this.openService = serviceId;
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },

    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },

    checkScroll() {
      this.isScrolled = window.scrollY > 50;
    },

    // Hero Image Animation Logic
    animateHeroImages() {
      // Reset all images to hidden
      this.heroImages.forEach((image) => (image.show = false));

      // Trigger fade-in animations with a delay
      this.heroImages.forEach((image, index) => {
        setTimeout(() => {
          image.show = true;
        }, index * 500); // Delay each image by 500ms
      });
    },
  };

  PetiteVue.createApp(app).mount();
});
