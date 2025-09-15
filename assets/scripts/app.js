async function loadPartial(elId, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const html = await res.text();

  const el = document.getElementById(elId);
  if (!el) {
    console.warn(`[loadPartial] target #${elId} not found when loading ${url}`);
    return; // or throw new Error(...) if you prefer failing fast
  }
  el.innerHTML = html;
}

const app = {
  pages: ["home", "about", "services"],
  activePage: "home",
  activeFAQ: null,
  isMobileMenuOpen: false,
  isModalVisible: false,
  templateMessage: encodeURIComponent(
    "Hello! I'm interested in booking a consultation. Could you please share more information?"
  ),
  services: [
    {
      id: 1,
      accent: "One",
      title: "Complimentary Diagnostics",
      details:
        "Start with a free mini-diagnostic to assess your skin, explain how I can help, and review consultation plans & costs.",
    },
    {
      id: 2,
      accent: "Two",
      title: "Comprehensive Consultation",
      details:
        "In-depth session to analyze your skin type, review your current routine, select the right products, and craft your personalized plan.",
    },
    {
      id: 3,
      accent: "Three",
      title: "Support",
      details:
        "Get follow-up support: 5 days included with consultation and an optional 2 months with the option to extend as needed.",
    },
  ],
  faqs: [
    {
      question: "How does the consultation work?",
      answers: [
        {
          tag: "p",
          text: "The consultation takes place online via any messenger that’s convenient for you. After you’ve made the payment, I’ll send you a questionnaire with detailed questions to answer. I’ll also ask for clear photos of your face and your current skincare products.",
        },
        {
          tag: "p",
          text: "If needed, I may follow up with a few extra questions to ensure I have a complete picture of your skin’s condition and needs.",
        },
        {
          tag: "p",
          text: "Once all the information is collected, I’ll carefully analyze it and build a personalized skincare plan tailored specifically to your skin type, concerns, and goals. When selecting products, I always take your budget into account to make sure your routine is both effective and financially comfortable.",
        },
        {
          tag: "p",
          text: "Within 5 business days, you’ll receive a detailed skincare guide and step-by-step routine.",
        },
        {
          tag: "p",
          text: "After reviewing your consultation, you are welcome to ask me any questions.",
        },
      ],
    },
    {
      question: "What’s Included in the Guide?",
      answers: [
        {
          tag: "p",
          text: "You’ll receive a personalized skincare guide of over 60 pages, which includes:",
        },
        {
          tag: "ul",
          items: [
            "Comprehensive skin analysis",
            "Essential information about skincare products",
            "A breakdown of what products should be in your routine and why",
            "Information on which products you can save money on, and which ones are worth investing in",
            "Detailed descriptions and usage instructions for each skincare product",
            "Guidelines for the safe use and storage of skincare",
            "Lifestyle recommendations",
            "Skincare life hacks",
            "Special skincare recommendations (e.g. for winter, during workouts, on flights, etc.)",
            "Skincare advice based on your specific skin concerns",
            "Review of your current skincare routine with comments on which products can stay, which should be replaced, and why",
            "Curated selections of effective, safe skincare products for each category — with descriptions, prices, and links",
            "Step-by-step routines for how and when to use each product",
            "Body care recommendations (upon request)",
          ],
        },
      ],
    },
    {
      question: "Can an online consultation be effective?",
      answers: [
        {
          tag: "p",
          text: "Yes, an online consultation can be very effective. To assess the condition of your skin, all I need is a clear, high-quality photo of your face without makeup (no worries – today, phones can take great pictures!). It's also crucial to ask the right questions, which is why I send a detailed questionnaire for you to fill out. By reviewing your responses and photos, I can create an accurate understanding of your skin and recommend a personalized skincare routine.",
        },
      ],
    },
    {
      question:
        "Which brands do you include in the consultation? Do I need to buy skincare products from you after the consultation?",
      answers: [
        {
          tag: "p",
          text: "I do not work with specific brands. I focus on recommending the most effective products based on your skin's needs and your budget, not brand names or marketing promises. After the consultation, I'll provide you with links to purchase the recommended products online or in stores.",
        },
      ],
    },
    {
      question: "What if one of the products you recommend doesn’t suit me?",
      answers: [
        {
          tag: "p",
          text: "It’s possible, though rare, to have an individual intolerance to a specific ingredient. However, if that happens, I’m always available to help you resolve the issue and find a suitable alternative.",
        },
      ],
    },
    {
      question:
        "Why should I purchase a consultation if estheticians offer free skincare recommendations?",
      answers: [
        {
          tag: "p",
          text: "Estheticians typically recommend products from brands they have agreements with, earning a commission on each sale.",
        },
        {
          tag: "p",
          text: "From my experience, many estheticians lack a deep understanding of cosmetic chemistry, which means their product recommendations are often based on personal observations rather than ingredient analysis. What works for one person may not work for another because everyone’s skin is unique.",
        },
        {
          tag: "p",
          text: "Furthermore, estheticians who are not trained to read ingredient labels often rely on what they’ve been taught during training or on the product descriptions on the packaging. But, as you might know, packaging descriptions can be misleading, as every brand promotes its products in the best possible light. The only reliable source of information is the ingredients list.",
        },
        {
          tag: "p",
          text: 'Many people believe that products prescribed by estheticians are more effective because they are labeled as "professional." However, this is a myth. Officially, there is no category of "professional skincare products." All home-care products are classified as "cosmetics," meaning the percentage of active ingredients is capped by law. Therefore, these products are no more effective than those available in retail stores.',
        },
      ],
    },
  ],
  contactOptions: [
    {
      id: "telegram",
      label: "Send Message on Telegram",
      href: "https://t.me/the_rozin?text=",
      appendMessage: true,
      color: "#26A5E4",
      note: "Fast",
    },
    {
      id: "instagram",
      label: "Send Message on Instagram",
      href: "https://instagram.com/therozin",
      appendMessage: false,
      color: "#FF0069",
      note: null,
    },
    {
      id: "messenger",
      label: "Send Message on Messenger",
      href: "https://m.me/mynameisnotRob?text=",
      appendMessage: true,
      color: "#00B2FF",
      note: null,
    },
    {
      id: "imessage",
      label: "Send Message on iMessage",
      href: "sms:2152053186&body=",
      appendMessage: true,
      color: "#34DA50",
      note: null,
    },
  ],

  contactHref(opt) {
    return opt.appendMessage ? opt.href + this.templateMessage : opt.href;
  },
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

  toggleFAQ(i) {
    this.activeFAQ = this.activeFAQ === i ? null : i;
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

document.addEventListener("DOMContentLoaded", async () => {
  const globals = [
    loadPartial("site-header", "./assets/components/header.html"),
    loadPartial("site-home", "./assets/components/home.html"),
    loadPartial("site-about", "./assets/components/about.html"),
    loadPartial("site-services", "./assets/components/services/index.html"),
    loadPartial("site-footer", "./assets/components/footer.html"),
    loadPartial("site-contact-modal", "./assets/components/contact-modal.html"),
  ];

  // load your services pieces…
  const services = [
    loadPartial("services-hero", "./assets/components/services/01-hero.html"),
    loadPartial(
      "services-diagnostics",
      "./assets/components/services/02-diagnostics.html"
    ),
    loadPartial(
      "services-consultation",
      "./assets/components/services/03-consultation.html"
    ),
    loadPartial(
      "services-support",
      "./assets/components/services/04-support.html"
    ),
    loadPartial(
      "services-pricing",
      "./assets/components/services/05-pricing.html"
    ),
    loadPartial("services-faq", "./assets/components/services/06-faq.html"),
    loadPartial(
      "services-final-cta",
      "./assets/components/services/07-final-cta.html"
    ),
  ];

  // fire them all in parallel
  await Promise.all([...globals]);

  await Promise.all([...services]);

  PetiteVue.createApp(app).mount("#app");

  window.addEventListener(
    "scroll",
    () => {
      app.checkScroll();
    },
    { passive: true }
  );
});
