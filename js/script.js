if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

/* =========================================================
   Global Navigation Interactivity (Smooth Scroll & Floating Nav)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 动态向页面插入悬浮组件 HTML
  const navHTML = `
    <div class="floating-nav-container">
      <!-- 返回主页按钮 -->
      <a href="../index.html" class="float-btn float-home-btn" title="Return to Home" aria-label="Return to Home">
        <svg viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </a>
      <!-- 回到顶部按钮 -->
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

  // 2. 监听页面滚动：向下滚动超过 300px 时淡入显示“回到顶部”按钮
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // 3. 点击平滑滚动回顶部
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});