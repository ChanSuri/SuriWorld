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
  const navHTML = `
    <div class="floating-nav-container">

      <!-- 1. 返回主页按钮 (常驻，仅子页面显示) -->
      ${homeBtnHTML}

      <!-- 2. 日夜切换按钮 (采用和其他按钮一致的单 SVG 结构) -->
      <button id="theme-toggle-btn" class="float-btn scroll-fade" title="Toggle Light/Dark Theme" aria-label="Toggle Theme">
        <svg viewBox="0 0 24 24" id="theme-svg-icon">
          <!-- 默认填入月亮路径 -->
          <path d="M12 3c.132 0 .263.005.393.015C9.699 3.556 7.5 5.992 7.5 9c0 3.314 2.686 6 6 6 3.008 0 5.444-2.199 4.985-4.893.01.13.015.261.015.393 0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9z"/>
        </svg>
      </button>

      <!-- 3. 回到顶部按钮 -->
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

  // 定义月亮和太阳的 SVG 路径常量
  const moonPath = "M12 3c.132 0 .263.005.393.015C9.699 3.556 7.5 5.992 7.5 9c0 3.314 2.686 6 6 6 3.008 0 5.444-2.199 4.985-4.893.01.13.015.261.015.393 0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9z";
  const sunPath = "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z";

  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeSvgIcon = document.getElementById("theme-svg-icon");
  const body = document.body;

  const savedTheme = localStorage.getItem("suri_portfolio_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 根据当前状态初始化图标
  function updateThemeIcon(isDark) {
    if (themeSvgIcon) {
      const pathEl = themeSvgIcon.querySelector("path");
      if (pathEl) {
        pathEl.setAttribute("d", isDark ? sunPath : moonPath);
      }
    }
  }

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-theme");
    updateThemeIcon(true);
  } else {
    body.classList.remove("dark-theme");
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      
      if (isDark) {
        localStorage.setItem("suri_portfolio_theme", "dark");
        updateThemeIcon(true);
      } else {
        localStorage.setItem("suri_portfolio_theme", "light");
        updateThemeIcon(false);
      }
    });
  }
});