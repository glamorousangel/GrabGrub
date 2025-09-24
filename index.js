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

// === Info Popup Data ===
const popupContents = {
  "how-it-works": `
    <h2>How It Works</h2>
    <p>Our platform makes food ordering on campus fast and convenient:</p>
    <ul>
      <li><b>Browse Vendors</b> – View menus from different campus stalls and stores.</li>
      <li><b>Place an Order</b> – Select your food or drinks and confirm your order online.</li>
      <li><b>Verify User Identity</b> – Enter your name and school ID number for verification.</li>
      <li><b>Secure Payment</b> – Pay using the available payment options.</li>
      <li><b>Pick Up Your Order</b> – Head to the vendor’s stall at the indicated time—no need to wait in long lines.</li>
    </ul>
  `,
  "user-guidelines": `
    <h2>User Guidelines</h2>
    <p>To keep everything smooth and fair for everyone:</p>
    <ul>
      <li>Provide your correct name and school ID number when ordering.</li>
      <li>Arrive on time to pick up your food—vendors prepare based on your confirmed order.</li>
      <li>Be respectful to vendors and fellow consumers at pick-up points.</li>
      <li>Follow campus rules on where food and drinks may be consumed.</li>
      <li>Report issues through the platform’s Help Center.</li>
    </ul>
  `,
  "vendor-registration": `
    <h2>Vendor Registration</h2>
    <p>Vendors can join the platform to reach more students and streamline service:</p>
    <ul>
      <li>Register by providing vendor details and proof of campus approval.</li>
      <li>Upload menus with food items, prices, and availability.</li>
      <li>Manage orders through the seller dashboard.</li>
      <li>Get paid securely with our integrated payment system.</li>
      <li>Grow your reach as part of the campus ordering platform.</li>
    </ul>
  `,
  "payment-issues": `
    <h2>Payment Issues</h2>
    <p>If you encounter any problems with payment, please let us know right away. Common issues include:</p>
    <ul>
      <li>Failed or declined transactions</li>
      <li>Double charges</li>
      <li>Missing or delayed receipts</li>
      <li>Refund requests</li>
    </ul>
    <p><b>How to Report:</b> Use the Contact Us form with your details, order ID, and proof of payment.</p>
    <p><b>Refunds:</b> Verified refunds will be processed within 3–7 business days.</p>
  `,
  "order-problems": `
    <h2>Order Problems</h2>
    <p>If you experience issues such as:</p>
    <ul>
      <li>Missing or incomplete items</li>
      <li>Wrong order prepared</li>
      <li>Order delays</li>
      <li>Order not received after payment</li>
    </ul>
    <p><b>How to Report:</b> Use the Contact Us form with your school ID, order ID, and details of the issue.</p>
    <p><b>Resolutions:</b> Replacements, refunds, or updated pickup times depending on the issue.</p>
  `,
  "privacy-policy": `
    <h2>Privacy Policy</h2>
    <p>We respect and protect your privacy. Information you provide is used only for order verification and records.</p>
    <p>Payment details are processed securely via trusted third-party providers.</p>
    <p>Your personal data will not be shared with unauthorized parties.</p>
  `,
  "terms-of-service": `
    <h2>Terms of Service</h2>
    <p>By using our platform, you agree to:</p>
    <ul>
      <li>Provide accurate details for verification.</li>
      <li>Complete payments before order processing.</li>
      <li>Pick up your orders within the given timeframe.</li>
      <li>Treat vendors, staff, and students respectfully.</li>
      <li>Follow campus food & drink rules.</li>
    </ul>
    <p>Vendors agree to prepare orders accurately, maintain food quality, and follow fair pricing.</p>
    <p>Misuse of the platform may result in restrictions.</p>
  `
};

// === Create Popup Structure ===
function ensureInfoPopup() {
  let popup = document.getElementById('info-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'info-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <span class="close-btn">&times;</span>
        <div class="popup-body"></div>
      </div>`;
    document.body.appendChild(popup);

    popup.querySelector('.close-btn').addEventListener('click', () => closeInfoPopup());
    popup.addEventListener('click', e => {
      if (e.target === popup) closeInfoPopup();
    });
  }
  return popup;
}

function openInfoPopup(key) {
  const popup = ensureInfoPopup();
  const body = popup.querySelector('.popup-body');
  body.innerHTML = popupContents[key] || "<p>Content not available.</p>";
  popup.style.display = 'flex';
  setTimeout(() => popup.classList.add('show'), 10);
}

function closeInfoPopup() {
  const popup = document.getElementById('info-popup');
  if (popup) {
    popup.classList.remove('show');
    setTimeout(() => popup.style.display = 'none', 200);
  }
}

// === Attach Click Events ===
document.querySelectorAll('[data-popup]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const key = link.getAttribute('data-popup');
    openInfoPopup(key);
  });
});

