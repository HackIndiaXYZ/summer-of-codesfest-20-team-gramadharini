// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC1ohik6pk4F7Wkm0VaEsNMj51WO-wvcQ4",
  authDomain: "rural-hub-95d1d.firebaseapp.com",
  projectId: "rural-hub-95d1d",
  storageBucket: "rural-hub-95d1d.firebasestorage.app",
  messagingSenderId: "1016893078350",
  appId: "1:1016893078350:web:168bbb5c019cf6e6f9bc1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {

  // Register button
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', async () => {
      const name     = document.getElementById('regName').value;
      const email    = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const location = document.getElementById('regLocation').value;
      const errorDiv   = document.getElementById('registerError');
      const successDiv = document.getElementById('registerSuccess');

      if (!name || !email || !password || !location) {
        errorDiv.innerText = 'Please fill in all fields.';
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        errorDiv.innerText = '';
        successDiv.innerText = '✅ Account created! You can now login.';
        setTimeout(() => {
          document.getElementById('registerBox').style.display = 'none';
          document.getElementById('loginBox').style.display = 'block';
        }, 2000);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          errorDiv.innerText = 'Email already registered. Please login.';
        } else if (error.code === 'auth/weak-password') {
          errorDiv.innerText = 'Password must be at least 6 characters.';
        } else {
          errorDiv.innerText = error.message;
        }
      }
    });
  }

  // Login button
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const email    = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const errorDiv = document.getElementById('loginError');

      if (!email || !password) {
        errorDiv.innerText = 'Please fill in all fields.';
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
      } catch (error) {
        errorDiv.innerText = 'Incorrect email or password.';
      }
    });
  }

  // Show register form
  const showRegisterLink = document.getElementById('showRegister');
  if (showRegisterLink) {
    showRegisterLink.addEventListener('click', () => {
      document.getElementById('loginBox').style.display = 'none';
      document.getElementById('registerBox').style.display = 'block';
    });
  }

  // Show login form
  const showLoginLink = document.getElementById('showLogin');
  if (showLoginLink) {
    showLoginLink.addEventListener('click', () => {
      document.getElementById('registerBox').style.display = 'none';
      document.getElementById('loginBox').style.display = 'block';
    });
  }

  // Check login status
  onAuthStateChanged(auth, (user) => {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
      if (user) {
        loginLink.innerHTML = `<a href="#" id="logoutBtn">Logout (${user.email})</a>`;
        document.getElementById('logoutBtn').addEventListener('click', async () => {
          await signOut(auth);
          window.location.href = 'login.html';
        });
      } else {
        loginLink.innerHTML = `<a href="login.html">Login</a>`;
      }
    }
  });

});