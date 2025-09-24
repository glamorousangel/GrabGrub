const urlParams = new URLSearchParams(window.location.search);
const stallKey = urlParams.get("stall");
const stall = stallsData[stallKey];

if (!stall) {
  document.body.innerHTML = "<h2>Stall not found!</h2>";
} else {
  // === Fill stall info ===
  const stallInfo = document.getElementById("stallInfo");
  stallInfo.innerHTML = `
    <img src="${stall.image}" alt="${stall.name}" class="stall-image" id="stallImage">
    <div class="info-text">
      <h2>${stall.name}</h2>
      <p>${stall.desc}</p>
      <div class="details">
        <span><i class="fas fa-map-marker-alt"></i> ${stall.location}</span>
        <span><i class="far fa-clock"></i> ${stall.time}</span>
        <span><i class="fas fa-star"></i> ${stall.rating}</span>
      </div>
    </div>
  `;

  // === Popout ===
  const stallImage = document.getElementById("stallImage");
  const popout = document.getElementById("popout");
  const popoutContent = document.getElementById("popoutContent");
  const closePopout = document.getElementById("closePopout");

  stallImage.addEventListener("click", () => {
    popoutContent.innerHTML = `<span class="close" id="closePopout">&times;</span>${stall.popout}`;
    popout.style.display = "flex";
    document.getElementById("closePopout").onclick = () => popout.style.display = "none";
  });

  window.addEventListener("click", (e) => { if (e.target === popout) popout.style.display = "none"; });

  // === Menu rendering ===
  const menuSection = document.getElementById("menuSection");
  for (let category in stall.menu) {
    const catDiv = document.createElement("div");
    catDiv.classList.add("menu-category");
    catDiv.innerHTML = `<h3>${category}</h3>`;
    stall.menu[category].forEach(item => {
      catDiv.innerHTML += `
        <div class="menu-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
            <span class="price">₱${item.price}</span>
          </div>
          <div class="item-action">
            <button class="add-to-cart">Add to Cart</button>
            <div class="quantity-controls" style="display:none;">
              <button class="minus">-</button>
              <input type="text" value="1" readonly>
              <button class="plus">+</button>
            </div>
          </div>
        </div>`;
    });
    menuSection.appendChild(catDiv);
  }

  // === Cart Logic ===
  const items = document.querySelectorAll(".menu-item");
  const orderItems = document.querySelector(".order-items");
  const orderTotal = document.getElementById("orderTotal");
  let cart = {};

  items.forEach(item => {
    const addBtn = item.querySelector(".add-to-cart");
    const quantityControls = item.querySelector(".quantity-controls");
    const plusBtn = item.querySelector(".plus");
    const minusBtn = item.querySelector(".minus");
    const qtyInput = item.querySelector("input");
    const name = item.querySelector("h4").innerText;
    const price = parseFloat(item.querySelector(".price").innerText.replace("₱",""));

    addBtn.addEventListener("click", () => {
      cart[name] = { qty: 1, price };
      updateCart();
      addBtn.style.display = "none";
      quantityControls.style.display = "flex";
      qtyInput.value = 1;
    });

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyInput.value);
      qty++;
      qtyInput.value = qty;
      cart[name] = { qty, price };
      updateCart();
    });

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyInput.value);
      qty--;
      if (qty <= 0) {
        delete cart[name];
        quantityControls.style.display = "none";
        addBtn.style.display = "inline-block";
      } else {
        cart[name] = { qty, price };
      }
      qtyInput.value = qty > 0 ? qty : 0;
      updateCart();
    });
  });

  function updateCart() {
    orderItems.innerHTML = "";
    let total = 0;
    for (let key in cart) {
      const item = cart[key];
      const div = document.createElement("div");
      div.innerText = `${key} × ${item.qty} - ₱${(item.price*item.qty).toFixed(2)}`;
      orderItems.appendChild(div);
      total += item.price * item.qty;
    }
    orderTotal.innerText = `₱${total.toFixed(2)}`;

    const orderSummary = document.querySelector(".order-summary");
    if (total > 0) orderSummary.classList.add("active");
    else orderSummary.classList.remove("active");
  }

  // === Place Order Logic (enhanced validation for student info) ===
  let selectedPayment = null;
  const paymentButtons = document.querySelectorAll(".payment-method button");
  const studentNameInput = document.getElementById("studentName");
  const studentIdInput = document.getElementById("studentId");
  const nameErrorSpan = document.getElementById("nameError"); // For inline message (optional)
  const idErrorSpan = document.getElementById("idError");     // For inline message (optional)

  // Clear errors on user interaction (including messages)
  function clearNameError() {
    studentNameInput.classList.remove("error");
    if (nameErrorSpan) nameErrorSpan.textContent = "";
  }
  function clearIdError() {
    studentIdInput.classList.remove("error");
    if (idErrorSpan) idErrorSpan.textContent = "";
  }

  studentNameInput.addEventListener("input", clearNameError);
  studentIdInput.addEventListener("input", clearIdError);

  // Payment selection (unchanged)
  paymentButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      paymentButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedPayment = btn.innerText;
    });
  });

  // Define popup functions (unchanged)
  function showPopup(id, message) {
    const popup = document.getElementById(id);
    if (message) {
      const msgElem = popup.querySelector("p");
      if (msgElem) msgElem.innerText = message;
    }
    popup.style.display = "flex";
  }

  function closePopup(id) {
    document.getElementById(id).style.display = "none";
  }

  // Place order button
  const placeOrderBtn = document.querySelector(".place-order");
  placeOrderBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const id = studentIdInput.value.trim();
    const total = parseFloat(orderTotal.innerText.replace("₱", ""));

    // Clear any previous errors first
    clearNameError();
    clearIdError();

    // Validation for student name
    let nameValid = true;
    let nameErrorMsg = "";
    if (!name) {
      nameValid = false;
      nameErrorMsg = "Full Name is required.";
    } else if (name.length < 2 || name.length > 50) {
      nameValid = false;
      nameErrorMsg = "Name must be 2-50 characters long.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) { // Only letters, spaces, hyphens, apostrophes
      nameValid = false;
      nameErrorMsg = "Name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    // Validation for student ID
    let idValid = true;
    let idErrorMsg = "";
    if (!id) {
      idValid = false;
      idErrorMsg = "Student ID is required.";
    } else if (id.length !== 9) {
      idValid = false;
      idErrorMsg = "Student ID must be exactly 9 characters.";
    } else if (!/^\d{9}$/.test(id)) { // Only digits
      idValid = false;
      idErrorMsg = "Student ID must contain only numbers.";
    }

    // Apply errors if invalid
    let hasStudentErrors = !nameValid || !idValid;
    if (!nameValid) {
      studentNameInput.classList.add("error");
      if (nameErrorSpan) nameErrorSpan.textContent = nameErrorMsg;
    }
    if (!idValid) {
      studentIdInput.classList.add("error");
      if (idErrorSpan) idErrorSpan.textContent = idErrorMsg;
    }

    // If student info is invalid, stop here (user sees red outlines + messages)
    if (hasStudentErrors) {
      return; // Don't proceed with order
    }

    // Check empty cart (popup, unchanged)
    if (total <= 0) {
      showPopup("errorPopup", "Your cart is empty.");
      return;
    }

    // Check payment method (popup, unchanged)
    if (!selectedPayment) {
      showPopup("errorPopup", "Please select a payment method.");
      return;
    }

    // All validations passed - create and save order (unchanged)
    const orderData = {
      stall: stall.name,
      studentName: name,
      studentId: id,
      paymentMethod: selectedPayment,
      items: cart,
      total: total,
      timestamp: new Date().toISOString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    console.log("Order Saved:", orderData);

    const pickupCode = stallKey.substring(0, 2).toUpperCase() + Math.floor(100 + Math.random() * 900);
    showPopup("successPopup", `Order placed successfully! Your pickup code is ${pickupCode}.`);

    // Optional: Clear cart after successful order
    cart = {};
    updateCart();

    setTimeout(() => {
      showPopup("readyPopup");
    }, 10000);
  });
}