// script.js

document.addEventListener('DOMContentLoaded', () => {
    // ─────────────────────────
    // DOM 要素の取得
    // ─────────────────────────
    const mobileMenuBtn     = document.getElementById('mobileMenuBtn');
    const mobileMenu        = document.getElementById('mobileMenu');
    const scrollTopBtn      = document.getElementById('scrollTopBtn');
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const hoursContainer    = document.getElementById('clinic-hours-container');
    const toggleBtn         = document.getElementById('hoursToggle');
    const faqQuestions      = document.querySelectorAll('.faq-question');
    
    let showHours = false;
  
    // ユーティリティ: モバイル判定
    function isMobile() {
      return window.innerWidth < 768;
    }
  
    // ─────────────────────────
    // モバイルメニューの切り替え
    // ─────────────────────────
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
    }
  
    // ─────────────────────────
    // アコーディオン（.accordion-trigger）
    // ─────────────────────────
    accordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.target;
        const content  = document.getElementById(targetId);
        const isActive = trigger.classList.contains('active');
  
        trigger.classList.toggle('active', !isActive);
        content?.classList.toggle('active', !isActive);
      });
    });
  
    // ─────────────────────────
    // スクロールトップボタンの表示/非表示
    // ─────────────────────────
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
      });
      // クリックでトップへ
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // ─────────────────────────
    // スムーススクロール（アンカーリンク）
    // ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetEl = document.querySelector(anchor.getAttribute('href'));
        if (!targetEl) return;
        const header = document.querySelector('.header');
        const offset = header ? header.offsetHeight + 20 : 0;
        window.scrollTo({
          top: targetEl.offsetTop - offset,
          behavior: 'smooth'
        });
        mobileMenu?.classList.remove('active');
      });
    });
  
    // ─────────────────────────
    // リサイズ時の処理
    // ─────────────────────────
    window.addEventListener('resize', () => {
      // モバイルメニューを広い画面で閉じる
      if (window.innerWidth >= 768) {
        mobileMenu?.classList.remove('active');
      }
      handleResize();
    });
  
    // ─────────────────────────
    // 診療時間トグル
    // ─────────────────────────
    function toggleHours() {
      showHours = !showHours;
      hoursContainer?.classList.toggle('show', showHours);
      hoursContainer?.classList.toggle('hide', !showHours);
      toggleBtn?.querySelector('.toggle-icon')?.classList.toggle('rotate', showHours);
      toggleBtn?.setAttribute('aria-expanded', String(showHours));
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleHours);
    }
  
    function handleResize() {
      if (!hoursContainer || !toggleBtn) return;
  
      if (!isMobile()) {
        // PCでは常に表示、トグル非表示
        hoursContainer.classList.remove('show', 'hide');
        toggleBtn.style.display = 'none';
      } else {
        // モバイルではトグル表示
        toggleBtn.style.display = 'flex';
        if (!showHours) {
          hoursContainer.classList.add('hide');
          hoursContainer.classList.remove('show');
        }
      }
    }
    // 初期表示
    handleResize();
  
    // ─────────────────────────
    // FAQ の開閉
    // ─────────────────────────
    faqQuestions.forEach(button => {
      button.addEventListener('click', () => {
        // すべてのFAQを閉じる
        document.querySelectorAll('.faq-answer.show')
                .forEach(ans => ans.classList.remove('show'));
        document.querySelectorAll('.faq-icon.rotate')
                .forEach(ic => ic.classList.remove('rotate'));
  
        // クリックされた項目だけ開く
        const answer = button.nextElementSibling; // .faq-answer
        const icon   = button.querySelector('.faq-icon');
        answer?.classList.add('show');
        icon?.classList.add('rotate');
      });
    });
  
  }); // ─ end DOMContentLoaded
  
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
  
    toggleBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  });
  