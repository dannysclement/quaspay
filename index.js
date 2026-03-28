import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
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

const whatsappNumber = "2348116788630";
const whatsappMessage = "Good day boss I need your assistance please very urgently";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

document.getElementById("supportTop").href = whatsappLink;
document.getElementById("supportHero").href = whatsappLink;
document.getElementById("supportCta").href = whatsappLink;
document.getElementById("floatingWhatsapp").href = whatsappLink;

const testimonialForm = document.getElementById("testimonialForm");
const submittedBox = document.getElementById("submittedBox");
const submitErrorBox = document.getElementById("submitErrorBox");
const submitLoadingBox = document.getElementById("submitLoadingBox");
const submitBtn = document.getElementById("submitBtn");

const testimonialsGrid = document.getElementById("testimonialsGrid");
const testimonialCount = document.getElementById("testimonialCount");
const emptyState = document.getElementById("emptyState");
const fetchLoadingBox = document.getElementById("fetchLoadingBox");
const fetchErrorBox = document.getElementById("fetchErrorBox");
const refreshTestimonialsBtn = document.getElementById("refreshTestimonialsBtn");

const fixedTestimonialsCount = 6;

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value || "";
  return div.innerHTML;
}

function hideSubmissionMessages() {
  submittedBox.style.display = "none";
  submitErrorBox.style.display = "none";
  submitLoadingBox.style.display = "none";
}

function hideFetchMessages() {
  fetchErrorBox.style.display = "none";
  fetchLoadingBox.style.display = "none";
}

function setSubmitState(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.style.opacity = isLoading ? "0.7" : "1";
  submitBtn.style.cursor = isLoading ? "not-allowed" : "pointer";
  submitLoadingBox.style.display = isLoading ? "block" : "none";
}

function createFirestoreTestimonialCard(data) {
  const card = document.createElement("div");
  card.className = "testimonial-card firestore-testimonial";

  const name = escapeHtml(data.name || "Anonymous User");
  const location = escapeHtml(data.location || "Unknown Location");
  const message = escapeHtml(data.message || "");

  card.innerHTML = `
    <div class="quote">“</div>
    <p>${message}</p>
    <div class="user-info">
      <h4>${name}</h4>
      <span>${location}</span>
    </div>
  `;

  return card;
}

function clearFirestoreTestimonialsOnly() {
  const oldFirestoreCards = document.querySelectorAll(".firestore-testimonial");
  oldFirestoreCards.forEach((card) => card.remove());
}

async function loadTestimonials() {
  hideFetchMessages();
  fetchLoadingBox.style.display = "block";
  emptyState.style.display = "none";

  clearFirestoreTestimonialsOnly();

  try {
    const testimonialsRef = collection(db, "testimonials");
    const testimonialsQuery = query(testimonialsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(testimonialsQuery);

    let firestoreCount = 0;

    if (!snapshot.empty) {
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const card = createFirestoreTestimonialCard(data);
        testimonialsGrid.appendChild(card);
        firestoreCount++;
      });
    }

    const totalCount = fixedTestimonialsCount + firestoreCount;
    testimonialCount.textContent = `Testimonials: ${totalCount}`;

    if (firestoreCount === 0) {
      emptyState.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading testimonials:", error);
    fetchErrorBox.textContent = "Failed to load testimonials. Please check your Firestore rules and internet connection.";
    fetchErrorBox.style.display = "block";
    testimonialCount.textContent = `Testimonials: ${fixedTestimonialsCount}`;
  } finally {
    fetchLoadingBox.style.display = "none";
  }
}

testimonialForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  hideSubmissionMessages();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const location = document.getElementById("location").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !location || !message) {
    submitErrorBox.textContent = "Please fill in all fields.";
    submitErrorBox.style.display = "block";
    return;
  }

  try {
    setSubmitState(true);

    await addDoc(collection(db, "testimonials"), {
      name,
      email,
      location,
      message,
      createdAt: serverTimestamp()
    });

    testimonialForm.reset();
    submittedBox.style.display = "block";

    await loadTestimonials();

    setTimeout(() => {
      submittedBox.style.display = "none";
    }, 5000);
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    submitErrorBox.textContent = "Unable to submit testimonial. Make sure Firestore database is created and rules allow write access.";
    submitErrorBox.style.display = "block";
  } finally {
    setSubmitState(false);
  }
});

refreshTestimonialsBtn.addEventListener("click", async function () {
  await loadTestimonials();
});

loadTestimonials();
