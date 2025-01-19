// ========== OPTION 1 =============
// async function loadComponent(file) {
//   try {
//     const response = await fetch(`./components/${file}`);
//     if (!response.ok)
//       throw new Error(`Failed to load ${file}: ${response.statusText}`);
//     const html = await response.text();
//     return html.trim();
//   } catch (error) {
//     console.error(`Error loading component ${file}:`, error);
//     return `<p class="text-red-500">Error loading content.</p>`;
//   }
// }

// const app = PetiteVue.createApp({
//   currentPage: "home",
//   pages: ["home", "about", "services", "book"],

//   async loadComponent(file, target) {
//     try {
//       console.log(`Loading ${file}.html into #${target}`);

//       const response = await fetch(`./components/${file}.html`);
//       if (!response.ok)
//         throw new Error(`Failed to load ${file}: ${response.statusText}`);

//       document.getElementById(target).innerHTML = await response.text();
//     } catch (error) {
//       console.error(error);
//       document.getElementById(id).innerHTML =
//         '<p class="text-red-500">Error loading content.</p>';
//     }
//   },

//   async loadPage(page) {
//     if (!this.pages.includes(page)) {
//       console.warn(`Page "${page}" not found. Loading Home instead.`);
//       page = "home";
//     }
//     this.currentPage = page;
//     await this.loadComponent(page, "content");
//   },

//   async init() {
//     // Load shared components
//     // await this.loadComponent("navbar", "navbar");
//     // await this.loadComponent("footer", "footer");

//     // Load the default page
//     // await this.loadPage(this.currentPage);

//     const navbarHtml = await loadComponent("navbar.html");
//     document.getElementById("navbar").innerHTML = navbarHtml;
//     PetiteVue.createApp(this).mount("#navbar"); // Mount reactivity for navbar

//     // Load the footer
//     const footerHtml = await loadComponent("footer.html");
//     document.getElementById("footer").innerHTML = footerHtml;

//     // Load the default page
//     await this.loadPage(this.currentPage);
//   },
// });

// app.mount();

// ========= OPTION 2 ===========

// const state = PetiteVue.reactive({
//   currentPage: "home", // Default page
//   pages: ["home", "about", "services"], // Pages for the navbar
// });

// async function loadSection(file, target) {
//   try {
//     const response = await fetch(`./components/${file}`);
//     if (!response.ok)
//       throw new Error(`Failed to load ${file}: ${response.statusText}`);
//     const html = await response.text();
//     document.getElementById(target).innerHTML = html;

//     // Mount the reactivity to the newly loaded section
//     if (target === "navbar" || target === "footer") {
//       PetiteVue.createApp({ state, loadPage }).mount(`#${target}`);
//     }
//   } catch (error) {
//     console.error(`Error loading section ${file}:`, error);
//     document.getElementById(
//       target
//     ).innerHTML = `<p class="text-red-500">Error loading content.</p>`;
//   }
// }

// async function loadPage(page) {
//   if (!state.pages.includes(page)) {
//     console.warn(`Page "${page}" not found. Defaulting to Home.`);
//     page = "home";
//   }
//   state.currentPage = page;
//   await loadSection(`${page}.html`, "content");
// }

// PetiteVue.createApp({
//   state,
//   loadPage,
//   async init() {
//     await loadSection("navbar.html", "navbar");
//     await loadSection("footer.html", "footer");
//     await loadPage(state.currentPage);
//   },
// }).mount();

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

  navigateTo(pageId) {
    history.pushState({ page: pageId }, "", "#" + pageId);
    this.activePage = pageId;
    this.isMobileMenuOpen = false;
  },
  init() {
    window.addEventListener("popstate", (event) => {
      if (event.state && event.state.page) {
        this.currentPage = event.state.page;
      }
    });

    const initialPage = window.location.hash.replace("#", "");
    if (initialPage) this.navigateTo(initialPage);
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
};

PetiteVue.createApp(app).mount();
