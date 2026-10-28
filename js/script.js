if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}
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

  // 2. 页面加载完成后，执行打字机效果
  const typingTextElement = document.getElementById("typing-text");
  const textToType = "Who am I?";
  let index = 0;

  function type() {
    if (index < textToType.length) {
      typingTextElement.textContent += textToType.charAt(index);
      index++;
      setTimeout(type, 150); // Adjust typing speed here
    }
  }

  type();
});   
/* =========================================================
   Unified Floating Nav (Scroll-triggered Fade & Theme Toggle)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 判断当前是否为主页
  const path = window.location.pathname;
  const isHomePage = path.endsWith("index.html") || path === "/" || path.endsWith("/");

  // 2. 如果是子页面，生成“返回主页”按钮 (保持常驻在上方)
  const homeBtnHTML = isHomePage ? "" : `
    <a href="../index.html" class="float-btn float-home-btn scroll-fade" title="Return to Home" aria-label="Return to Home">
      <svg viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </a>
  `;

  // 3. 动态拼接并插入悬浮组件 HTML
  // 注意：给日夜切换按钮也加上了 scroll-fade 类，让它和回到顶部按钮拥有相同的淡入淡出特性
  const navHTML = `
    <div class="floating-nav-container">
      <!-- 1. 日夜切换按钮 (滚动后淡入) -->
      <button id="theme-toggle-btn" class="float-btn scroll-fade" title="Toggle Light/Dark Theme" aria-label="Toggle Theme">
        <span id="theme-icon">🌙</span>
      </button>

      <!-- 2. 返回主页按钮 (常驻，仅子页面显示) -->
      ${homeBtnHTML}

      <!-- 3. 回到顶部按钮 (滚动后淡入) -->
      <button id="back-to-top-btn" class="float-btn scroll-fade" title="Back to Top" aria-label="Back to Top">
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </div>
  `;

  // 插入到 body 末尾
  document.body.insertAdjacentHTML("beforeend", navHTML);

  // 4. 监听页面滚动：向下滚动超过 300px 时，让所有带 scroll-fade 的按钮统一淡入显示
  const fadeButtons = document.querySelectorAll(".scroll-fade");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      fadeButtons.forEach(btn => btn.classList.add("visible"));
    } else {
      fadeButtons.forEach(btn => btn.classList.remove("visible"));
    }
  });

  // 5. 点击平滑滚动回顶部
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. 日夜模式切换逻辑 & 状态记忆
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  const savedTheme = localStorage.getItem("suri_portfolio_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-theme");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    body.classList.remove("dark-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      
      if (isDark) {
        localStorage.setItem("suri_portfolio_theme", "dark");
        themeIcon.textContent = "☀️";
      } else {
        localStorage.setItem("suri_portfolio_theme", "light");
        themeIcon.textContent = "🌙";
      }
    });
  }
});