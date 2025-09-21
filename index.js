window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    const stalls = document.getElementById('stalls');
    const scrollY = window.scrollY;

    if(scrollY > stalls.offsetTop - 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// === Footer Forms Validation ===
document.querySelectorAll("#footer .form-container").forEach(formBox => {
  const btn = formBox.querySelector("button");

  btn.addEventListener("click", () => {
    const inputs = formBox.querySelectorAll("input, textarea");
    let valid = true;
    let message = "";

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        message = "Please fill in all fields.";
      }
      if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          valid = false;
          message = "Please enter a valid email address.";
        }
      }
    });

    if (!valid) {
      alert(message); // simple error handling
      return;
    }

    // Collect data
    let formData = {};
    inputs.forEach(input => {
      formData[input.placeholder] = input.value.trim();
    });
    console.log("Form Submission:", formData);

    alert("✅ Thank you! Your message has been sent.");
    inputs.forEach(input => input.value = ""); // clear form
  });
});
