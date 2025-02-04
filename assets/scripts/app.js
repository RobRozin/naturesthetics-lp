document.addEventListener("DOMContentLoaded", () => {
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
        title: "Comprehensive Consultation",
        details:
          "We start with an in-depth consultation to fully understand your skin type, main concerns, and lifestyle. This allows us to design a skincare plan that is uniquely suited to your needs, creating the perfect foundation for a healthier, radiant complexion.",
      },
      {
        id: 2,
        title: "Personalized Skincare Routine",
        details:
          "Following the consultation, we craft a skincare routine tailored to you, including carefully selected products that align with your skin goals and budget. Our aim is to create a routine that’s both effective and easy to maintain, helping you achieve real, lasting results.",
      },
      {
        id: 3,
        title: "Ongoing Support",
        details:
          "You’ll receive two months of follow-up support, during which we’ll answer questions, provide guidance, and adjust your routine as needed. For clients seeking further help, we offer additional long-term support to enhance and sustain your skincare journey.",
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
