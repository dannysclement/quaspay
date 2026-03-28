import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCH_4TjFyvrOmpc-UHTBH9Hv4d_iNzkoJ0",
  authDomain: "quash-pay-mobile.firebaseapp.com",
  projectId: "quash-pay-mobile",
  storageBucket: "quash-pay-mobile.firebasestorage.app",
  messagingSenderId: "563374600709",
  appId: "1:563374600709:web:0b5f39ee5e803c219fe26c",
  measurementId: "G-ZSZEDWTXJM"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

const loginForm = document.getElementById("loginForm");
const identityInput = document.getElementById("identity");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const messageBox = document.getElementById("messageBox");
const rememberMe = document.getElementById("rememberMe");

function showMessage(message, type = "info") {
  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;
}

function setLoading(isLoading) {
  loginBtn.disabled = isLoading;
  loginBtn.textContent = isLoading ? "Checking account..." : "Login to Quash Pay";
}

function saveUserSession(userData) {
  const sessionData = {
    uid: userData.uid || userData.id || "",
    docId: userData.docId || "",
    email: userData.email || "",
    username: userData.username || "",
    phone: userData.phone || "",
    firstName: userData.firstName || "",
    fullName: userData.fullName || ""
  };

  if (rememberMe.checked) {
    localStorage.setItem("quashpayUser", JSON.stringify(sessionData));
  } else {
    sessionStorage.setItem("quashpayUser", JSON.stringify(sessionData));
  }
}

async function findUserByIdentity(identity) {
  const usersRef = collection(db, "user");

  const qEmail = query(usersRef, where("email", "==", identity), limit(1));
  const qUsername = query(usersRef, where("username", "==", identity), limit(1));
  const qPhone = query(usersRef, where("phone", "==", identity), limit(1));

  const [emailSnap, usernameSnap, phoneSnap] = await Promise.all([
    getDocs(qEmail),
    getDocs(qUsername),
    getDocs(qPhone)
  ]);

  if (!emailSnap.empty) {
    const doc = emailSnap.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  if (!usernameSnap.empty) {
    const doc = usernameSnap.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  if (!phoneSnap.empty) {
    const doc = phoneSnap.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  return null;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identity = identityInput.value.trim();
  const password = passwordInput.value.trim();

  if (!identity || !password) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  setLoading(true);
  showMessage("Checking your account...", "info");

  try {
    const user = await findUserByIdentity(identity);

    if (!user) {
      showMessage("Not yet registered, please create an account.", "error");
      setLoading(false);
      return;
    }

    if (!("password" in user)) {
      showMessage("Account password record not found.", "error");
      setLoading(false);
      return;
    }

    if (user.password !== password) {
      showMessage("Password incorrect.", "error");
      setLoading(false);
      return;
    }

    saveUserSession({
      uid: user.uid || user.userId || user.id,
      docId: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      firstName: user.firstName,
      fullName: user.fullName
    });

    showMessage("Login successful. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "very.html";
    }, 700);
  } catch (error) {
    console.error("Login error:", error);
    showMessage("Something went wrong. Please try again.", "error");
  } finally {
    setLoading(false);
  }
});
