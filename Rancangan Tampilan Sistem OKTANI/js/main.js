// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Navigation scroll handling
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Mobile menu toggle (if needed)
  const createMobileMenu = () => {
    const nav = document.querySelector("nav");
    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-toggle");
    menuButton.innerHTML = "☰";

    menuButton.addEventListener("click", () => {
      nav.classList.toggle("mobile-menu-active");
    });

    nav.insertAdjacentElement("beforebegin", menuButton);
  };

  // Add mobile menu if screen width is less than 768px
  if (window.innerWidth < 768) {
    createMobileMenu();
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    const menuButton = document.querySelector(".menu-toggle");

    if (window.innerWidth < 768 && !menuButton) {
      createMobileMenu();
    } else if (window.innerWidth >= 768 && menuButton) {
      menuButton.remove();
    }
  });

  // Form handling example
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add your form handling logic here
      console.log("Form submitted");
    });
  });
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// login button
function redirectToHome() {
  window.location.href = "3. Halaman Beranda.html";
}

// Tambahkan event listener pada form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah form submit default
  redirectToHome();
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Password validation
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak cocok!");
    return;
  }

  // Password pattern validation
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordPattern.test(password)) {
    alert(
      "Password harus minimal 8 karakter dan mengandung kombinasi huruf dan angka!"
    );
    return;
  }

  // If validation successful, redirect to home page:
  window.location.href = "3. Halaman Beranda.html";
});

// Cek status login saat halaman dimuat
window.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // Jika belum login, redirect ke halaman login
    window.location.href = "1. Halaman Login.html";
  }
});

// Tambahkan fungsi ini di main.js
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentPage = window.location.pathname;

  // Jika belum login dan mencoba mengakses halaman beranda
  if (!isLoggedIn && currentPage.includes("Halaman Beranda.html")) {
    window.location.href = "1. Halaman Login.html";
    return;
  }

  // Jika sudah login dan mencoba mengakses halaman login/signup
  if (
    isLoggedIn &&
    (currentPage.includes("Halaman Login.html") ||
      currentPage.includes("Halaman Sign Up.html"))
  ) {
    window.location.href = "3. Halaman Beranda.html";
    return;
  }
}

// Jalankan pengecekan saat halaman dimuat
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// Perbaikan pada form login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    window.location.href = "3. Halaman Beranda.html";
  } else {
    alert("Mohon isi email dan password");
  }
});

// Tambahkan fungsi logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "1. Halaman Login.html";
}

// Handle tombol logout di halaman beranda
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// Pastikan DOM sudah dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        // Simpan status login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        // Redirect ke halaman beranda
        window.location.href = "3. Halaman Beranda.html";
      } else {
        alert("Mohon isi email dan password");
      }
    });
  }

  // Cek status login
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentPage = window.location.pathname;

  if (isLoggedIn && currentPage.includes("Halaman Login.html")) {
    window.location.href = "3. Halaman Beranda.html";
  }

  // Handle tombol sosial media login
  const googleBtn = document.querySelector(".google-btn");
  const facebookBtn = document.querySelector(".facebook-btn");

  if (googleBtn) {
    googleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Implementasi login Google
      console.log("Google login clicked");
    });
  }

  if (facebookBtn) {
    facebookBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Implementasi login Facebook
      console.log("Facebook login clicked");
    });
  }
});
