if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

/* =========================================================
   Global Navigation Interactivity (Smooth Scroll & Floating Nav)
========================================================= */

/* =========================================================
   Global Navigation Interactivity (Smooth Scroll & Floating Nav)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 判断当前是否为主页 (index.html 或根路径 "/")
  const path = window.location.pathname;
  const isHomePage = path.endsWith("index.html") || path === "/" || path.endsWith("/");

  // 2. 如果是主页，不生成返回主页按钮；如果是子页面，生成返回主页按钮
  const homeBtnHTML = isHomePage ? "" : `
    <a href="../index.html" class="float-btn float-home-btn" title="Return to Home" aria-label="Return to Home">
      <svg viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </a>
  `;

  // 3. 动态拼接并插入悬浮组件 HTML
  const navHTML = `
    <div class="floating-nav-container">
      ${homeBtnHTML}
      <button id="back-to-top-btn" class="float-btn" title="Back to Top" aria-label="Back to Top">
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </div>
  `;

  // 插入到 body 末尾
  document.body.insertAdjacentHTML("beforeend", navHTML);

  const backToTopBtn = document.getElementById("back-to-top-btn");

  // 4. 监听页面滚动：向下滚动超过 300px 时淡入显示“回到顶部”按钮
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // 5. 点击平滑滚动回顶部
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

/* =========================================================
   Component Loader (Loads navbar.html and footer.html dynamically)
========================================================= */

async function loadComponent(elementId, filepath) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) throw new Error(`Failed to load ${filepath}`);
    const html = await response.text();
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      targetElement.innerHTML = html;
    }
  } catch (error) {
    console.error("Error loading template component:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. 动态加载 Navbar 和 Footer 组件
  loadComponent("navbar-placeholder", "../components/navbar.html");
  loadComponent("footer-placeholder", "../components/footer.html");
});