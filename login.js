import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs
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
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;
}

function setLoading(isLoading) {
  if (!loginBtn) return;
  loginBtn.disabled = isLoading;
  loginBtn.textContent = isLoading ? "Checking account..." : "Login to Quash Pay";
}

function normalizeValue(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return normalizeValue(value).toLowerCase();
}

function normalizePhone(value) {
  return normalizeValue(value).replace(/\s+/g, "");
}

function saveUserSession(userData) {
  const safeUser = {
    uid: userData.uid || userData.userId || userData.id || "",
    docId: userData.id || "",
    email: userData.email || userData.userEmail || "",
    username: userData.username || userData.userName || "",
    phone: userData.phone || userData.phoneNumber || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    fullName: userData.fullName || "",
    isLoggedIn: true
  };

  localStorage.removeItem("quashpayUser");
  sessionStorage.removeItem("quashpayUser");

  if (rememberMe && rememberMe.checked) {
    localStorage.setItem("quashpayUser", JSON.stringify(safeUser));
  } else {
    sessionStorage.setItem("quashpayUser", JSON.stringify(safeUser));
  }
}

async function getUserFromCollection(collectionName, fieldName, value) {
  const ref = collection(db, collectionName);
  const q = query(ref, where(fieldName, "==", value), limit(1));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      collectionName,
      ...doc.data()
    };
  }

  return null;
}

async function findUser(identity) {
  const rawIdentity = normalizeValue(identity);
  const emailIdentity = normalizeEmail(identity);
  const phoneIdentity = normalizePhone(identity);

  const collectionsToCheck = ["user", "users"];

  const fieldChecks = [
    { field: "email", value: emailIdentity },
    { field: "userEmail", value: emailIdentity },
    { field: "username", value: rawIdentity },
    { field: "userName", value: rawIdentity },
    { field: "phone", value: phoneIdentity },
    { field: "phoneNumber", value: phoneIdentity }
  ];

  for (const collectionName of collectionsToCheck) {
    for (const check of fieldChecks) {
      try {
        const foundUser = await getUserFromCollection(collectionName, check.field, check.value);
        if (foundUser) {
          return foundUser;
        }
      } catch (error) {
        console.warn(`Query failed for ${collectionName}.${check.field}:`, error);
      }
    }
  }

  return null;
}

function getUserPassword(user) {
  return (
    user.password ??
    user.userPassword ??
    user.pass ??
    user.loginPassword ??
    ""
  );
}

function identityMatchesUser(identity, user) {
  const rawIdentity = normalizeValue(identity);
  const emailIdentity = normalizeEmail(identity);
  const phoneIdentity = normalizePhone(identity);

  const emailValues = [
    normalizeEmail(user.email),
    normalizeEmail(user.userEmail)
  ];

  const usernameValues = [
    normalizeValue(user.username),
    normalizeValue(user.userName)
  ];

  const phoneValues = [
    normalizePhone(user.phone),
    normalizePhone(user.phoneNumber)
  ];

  return (
    emailValues.includes(emailIdentity) ||
    usernameValues.includes(rawIdentity) ||
    phoneValues.includes(phoneIdentity)
  );
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identity = normalizeValue(identityInput ? identityInput.value : "");
    const password = normalizeValue(passwordInput ? passwordInput.value : "");

    if (!identity || !password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    setLoading(true);
    showMessage("Checking your account...", "info");

    try {
      const user = await findUser(identity);

      if (!user) {
        showMessage("Not yet registered, please create an account.", "error");
        setLoading(false);
        return;
      }

      if (!identityMatchesUser(identity, user)) {
        showMessage("Account not found.", "error");
        setLoading(false);
        return;
      }

      const savedPassword = normalizeValue(getUserPassword(user));

      if (!savedPassword) {
        showMessage("Password record not found for this account.", "error");
        setLoading(false);
        return;
      }

      if (savedPassword !== password) {
        showMessage("Password incorrect.", "error");
        setLoading(false);
        return;
      }

      saveUserSession(user);
      showMessage("Login successful. Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "very.html";
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      showMessage("Something went wrong. Check your Firestore collection name, field names, and rules.", "error");
    } finally {
      setLoading(false);
    }
  });
}
