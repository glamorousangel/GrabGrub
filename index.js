document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav');
  const stalls = document.getElementById('stalls');
  if (nav && stalls) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > stalls.offsetTop - 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  function ensurePopupExists() {
    let popup = document.getElementById('success-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'success-popup';
      popup.innerHTML = `
        <div class="popup-content" role="dialog" aria-modal="true" aria-labelledby="popup-title">
          <h2 id="popup-title">Your message has been sent successfully!</h2>
        </div>`;
      document.body.appendChild(popup);
    }
    return popup;
  }

  function hidePopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
      popup.classList.remove('show');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 150);
    }
  }

  const formContainers = document.querySelectorAll('#footer .form-container');
  formContainers.forEach(formBox => {
    const btn = formBox.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const inputs = Array.from(formBox.querySelectorAll('input, textarea'));
      let valid = true;

      inputs.forEach(input => {
        input.classList.remove('error', 'success');
        const err = input.nextElementSibling;
        if (err && err.classList.contains('error-message')) {
          err.textContent = '';
          err.classList.remove('active');
        }

        const val = input.value.trim();
        if (!val) {
          input.classList.add('error');
          let errorEl = input.nextElementSibling;
          if (!errorEl || !errorEl.classList.contains('error-message')) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            input.insertAdjacentElement('afterend', errorEl);
          }
          errorEl.textContent = `${input.placeholder || 'This field'} is required.`;
          errorEl.classList.add('active');
          valid = false;
          return;
        }

        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            input.classList.add('error');
            let errorEl = input.nextElementSibling;
            if (!errorEl || !errorEl.classList.contains('error-message')) {
              errorEl = document.createElement('div');
              errorEl.className = 'error-message';
              input.insertAdjacentElement('afterend', errorEl);
            }
            errorEl.textContent = 'Please enter a valid email address.';
            errorEl.classList.add('active');
            valid = false;
            return;
          }
        }

        input.classList.add('success');
      });

      if (!valid) {
        const firstInvalid = formBox.querySelector('input.error, textarea.error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formData = {};
      inputs.forEach(input => {
        formData[input.placeholder || input.name || 'field'] = input.value.trim();
      });
      console.log('Form submission:', formData);

      const popup = ensurePopupExists();
      popup.style.display = 'flex';
      setTimeout(() => popup.classList.add('show'), 10);

      setTimeout(hidePopup, 3000);

      inputs.forEach(input => {
        input.value = '';
        input.classList.remove('success');
      });
    });
  });
});
