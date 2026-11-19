// ========================================
// FRONTIER BAKERY - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- HEADER SCROLL BEHAVIOR ----
  const header = document.getElementById('main-header');
  const logoLight = document.querySelector('.Logo_Light');
  const logoDark = document.querySelector('.Logo_Dark');

  if (header) {
    if (document.body.classList.contains('light-theme')) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled-shadow');
        } else {
          header.classList.remove('scrolled-shadow');
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          header.classList.add('filled');
          if (logoLight) { logoLight.classList.remove('Shown'); }
          if (logoDark) { logoDark.classList.add('Shown'); }
        } else {
          header.classList.remove('filled');
          if (logoLight) { logoLight.classList.add('Shown'); }
          if (logoDark) { logoDark.classList.remove('Shown'); }
        }
      });
    }
  }

  // ---- SHOP TABS ----
  const tabs = document.querySelectorAll('.Shop_Tab');
  const cookiesGrid = document.getElementById('tab-cookies');
  const cakesGrid = document.getElementById('tab-cakes');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      if (target === 'cookies') {
        cookiesGrid.classList.remove('hidden');
        cakesGrid.classList.add('hidden');
      } else {
        cakesGrid.classList.remove('hidden');
        cookiesGrid.classList.add('hidden');
      }
    });
  });

  // ---- QUANTITY SELECTORS ----
  document.querySelectorAll('.Product_Item').forEach(item => {
    const minus = item.querySelector('.qty-btn.minus');
    const plus = item.querySelector('.qty-btn.plus');
    const display = item.querySelector('.qty-num');

    if (!minus || !plus || !display) return;

    let qty = 1;

    plus.addEventListener('click', () => {
      qty++;
      display.textContent = qty;
    });

    minus.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        display.textContent = qty;
      }
    });
  });

  // ---- ADD TO CART MOUSE POSITION (ripple effect) ----
  document.querySelectorAll('.Product_Item_Submit_Container').forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // ---- TESTIMONIALS (pause on hover, manual nav) ----
  const testimonialContainer = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      testimonialContainer.style.animationPlayState = 'paused';
    });
    testimonialContainer.addEventListener('mouseleave', () => {
      testimonialContainer.style.animationPlayState = 'running';
    });
  }

  if (prevBtn && testimonialContainer) {
    prevBtn.addEventListener('click', () => {
      testimonialContainer.scrollLeft -= 500;
    });
  }

  if (nextBtn && testimonialContainer) {
    nextBtn.addEventListener('click', () => {
      testimonialContainer.scrollLeft += 500;
    });
  }

  // ---- HERO SCROLL MOVEMENTS & POP-UP EFFECT ----
  const heroWrapper = document.getElementById('hero-wrapper');
  const heroImg = document.getElementById('hero-img');
  const line1 = document.querySelector('.Hero_Line.Line_1');
  const line2 = document.querySelector('.Hero_Line.Line_2');
  const heroFloat = document.getElementById('hero-float');
  const stickerCake = document.querySelector('.Sticker_Cake');
  const stickerCookie = document.querySelector('.Sticker_Cookie');

  let ticking = false;

  function updateHeroParallax() {
    const scrolled = window.scrollY;
    const heroHeight = heroWrapper ? heroWrapper.offsetHeight : window.innerHeight;

    if (scrolled <= heroHeight * 1.5) {
      // 1. Background image pop-up & zoom effect
      if (heroImg) {
        const scale = 1.0 + scrolled * 0.0009;
        const translateY = scrolled * 0.38;
        heroImg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }

      // 2. Hero wrapper bottom border-radius pop-up card effect
      if (heroWrapper) {
        const radius = Math.min(scrolled * 0.12, 44);
        heroWrapper.style.borderRadius = `0 0 ${radius}px ${radius}px`;
      }

      // 3. "A BAKING LOVE AFFAIR" multi-axis scrolling movement
      if (line1) {
        const tx1 = scrolled * 0.08;
        const ty1 = -scrolled * 0.38;
        line1.style.transform = `translate3d(${tx1}px, ${ty1}px, 0)`;
      }

      if (line2) {
        const tx2 = -scrolled * 0.06;
        const ty2 = -scrolled * 0.24;
        line2.style.transform = `translate3d(${tx2}px, ${ty2}px, 0)`;
      }

      // 4. Floating INDULGE badge parallax
      if (heroFloat) {
        const tyFloat = -scrolled * 0.48;
        heroFloat.style.transform = `translate3d(0, ${tyFloat}px, 0)`;
      }

      // 5. Hero SVG stickers scrolling drift
      if (stickerCake) {
        const sx = scrolled * 0.14;
        const sy = -scrolled * 0.42;
        const srot = -6 + scrolled * 0.04;
        stickerCake.style.transform = `translate3d(${sx}px, ${sy}px, 0) rotate(${srot}deg)`;
      }

      if (stickerCookie) {
        const cx = -scrolled * 0.12;
        const cy = -scrolled * 0.34;
        const crot = 8 - scrolled * 0.03;
        stickerCookie.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${crot}deg)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    calculateCelebrateTarget();
    if (!ticking) {
      window.requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial call to set positions
  updateHeroParallax();

  // ---- CELEBRATE WITH COOKIE CTA SCROLL MOVEMENT ----
  const ctaSection = document.querySelector('.Collections_CTA_Section');
  const celebrateTextPath = document.getElementById('celebrateTextPath');

  let currentCelebrateOffset = 80;
  let targetCelebrateOffset = 80;
  let isCelebrateAnimating = false;

  function calculateCelebrateTarget() {
    if (!ctaSection || !celebrateTextPath) return;

    const rect = ctaSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only compute if section is reasonably near the viewport
    if (rect.bottom < -200 || rect.top > windowHeight + 200) return;

    // Progress from 0 (section top enters viewport bottom) to 1 (section bottom leaves viewport top)
    const totalDistance = windowHeight + rect.height;
    const progress = Math.min(Math.max((windowHeight - rect.top) / totalDistance, 0), 1);

    // As user scrolls down, progress goes from 0 to 1:
    const minOffset = 10;
    const maxOffset = 160;
    targetCelebrateOffset = minOffset + progress * (maxOffset - minOffset);

    if (!isCelebrateAnimating) {
      isCelebrateAnimating = true;
      requestAnimationFrame(stepCelebrateAnimation);
    }
  }

  function stepCelebrateAnimation() {
    if (!celebrateTextPath) {
      isCelebrateAnimating = false;
      return;
    }

    const diff = targetCelebrateOffset - currentCelebrateOffset;
    if (Math.abs(diff) > 0.08) {
      currentCelebrateOffset += diff * 0.18;
      celebrateTextPath.setAttribute('startOffset', currentCelebrateOffset.toFixed(1));
      requestAnimationFrame(stepCelebrateAnimation);
    } else {
      currentCelebrateOffset = targetCelebrateOffset;
      celebrateTextPath.setAttribute('startOffset', currentCelebrateOffset.toFixed(1));
      isCelebrateAnimating = false;
    }
  }

  // Initial position calculation & immediate placement
  if (ctaSection && celebrateTextPath) {
    const rect = ctaSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDistance = windowHeight + rect.height;
    const progress = Math.min(Math.max((windowHeight - rect.top) / totalDistance, 0), 1);
    currentCelebrateOffset = 10 + progress * (160 - 10);
    targetCelebrateOffset = currentCelebrateOffset;
    celebrateTextPath.setAttribute('startOffset', currentCelebrateOffset.toFixed(1));
  }

  window.addEventListener('resize', calculateCelebrateTarget);

  // ---- HEADER FLOAT CIRCLE ROTATION ANIMATION ----
  const floatInner = document.querySelector('.Hero_Float_Inner');
  if (floatInner) {
    let angle = 30;
    let direction = 1;
    setInterval(() => {
      angle += direction * 0.3;
      if (angle > 40) direction = -1;
      if (angle < 20) direction = 1;
      floatInner.style.transform = `rotate(${angle}deg)`;
    }, 50);
  }

  // ---- MOBILE MENU TOGGLE ----
  const burger = document.querySelector('.menu_icon.burger');
  const mainMenu = document.querySelector('.main-menu');

  if (burger && mainMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mainMenu.style.display === 'flex';
      mainMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        mainMenu.style.flexDirection = 'column';
        mainMenu.style.position = 'fixed';
        mainMenu.style.top = '0';
        mainMenu.style.left = '0';
        mainMenu.style.width = '100%';
        mainMenu.style.height = '100vh';
        mainMenu.style.backgroundColor = 'var(--beige)';
        mainMenu.style.justifyContent = 'center';
        mainMenu.style.alignItems = 'center';
        mainMenu.style.zIndex = '999';
        mainMenu.style.gap = '2rem';
        mainMenu.querySelectorAll('a').forEach(a => { a.style.color = 'var(--dark)'; a.style.fontSize = '2rem'; });
      }
    });
  }

  // ---- NEWSLETTER FORM ----
  document.querySelectorAll('.Newsletter_Form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.Newsletter_Input');
      if (input && input.value) {
        alert(`Thanks for subscribing with ${input.value}!`);
        input.value = '';
      }
    });
  });

  // ---- TAB HASH NAVIGATION ----
  function checkHashTab() {
    if (window.location.hash === '#tab-cakes') {
      const cakesTabBtn = document.querySelector('.Shop_Tab[data-tab="cakes"]');
      if (cakesTabBtn) cakesTabBtn.click();
    } else if (window.location.hash === '#tab-cookies') {
      const cookiesTabBtn = document.querySelector('.Shop_Tab[data-tab="cookies"]');
      if (cookiesTabBtn) cookiesTabBtn.click();
    }
  }
  checkHashTab();
  window.addEventListener('hashchange', checkHashTab);

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.Contact_Submit_Btn');
      const originalText = submitBtn ? submitBtn.textContent : 'SEND';
      if (submitBtn) {
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = '✓ SENT!';
          submitBtn.style.backgroundColor = 'var(--blue)';
        }
        setTimeout(() => {
          alert('Thank you for contacting Frontier Bakery! We have received your message and will get back to you shortly.');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
          }
        }, 400);
      }, 500);
    });
  }

  // ---- ADD TO CART FEEDBACK ----
  document.querySelectorAll('.Product_Item_Submit').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = '✓ ADDED!';
      btn.style.color = 'var(--blue)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.color = '';
      }, 1500);
    });
  });

  // ---- FOOTER REVEAL EFFECT (DYNAMIC HEIGHT) ----
  const footer = document.querySelector('.Site_Footer');
  function updateFooterHeight() {
    if (footer) {
      const height = footer.offsetHeight;
      document.documentElement.style.setProperty('--footer-height', `${height}px`);
    }
  }

  window.addEventListener('resize', updateFooterHeight);
  window.addEventListener('load', updateFooterHeight);
  if (window.ResizeObserver && footer) {
    new ResizeObserver(updateFooterHeight).observe(footer);
  }
  updateFooterHeight();
  setTimeout(updateFooterHeight, 300);

});
