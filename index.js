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
const fetchLoadingBox = document.getElementById("fetchLoadingBox");
const fetchErrorBox = document.getElementById("fetchErrorBox");
const refreshTestimonialsBtn = document.getElementById("refreshTestimonialsBtn");

const scrollLeftBtn = document.getElementById("scrollLeftBtn");
const scrollRightBtn = document.getElementById("scrollRightBtn");

const defaultTestimonials = [
  {
    name: "Favour Johnson",
    email: "favourjohnson@example.com",
    location: "Lagos, Nigeria",
    message: "Quash Pay really surprised me. I started with watching videos and later moved into tasks and referrals. The platform is clean and easy to use."
  },
  {
    name: "Emmanuel Peters",
    email: "emmanuelpeters@example.com",
    location: "Abuja, Nigeria",
    message: "I love the fact that I can earn from reading news and viewing ads during my free time. It feels smooth and beginner friendly."
  },
  {
    name: "Mary Daniel",
    email: "marydaniel@example.com",
    location: "Port Harcourt, Nigeria",
    message: "The referral system is one of my favorite parts. I invited some friends and I still keep earning from them without stress. Very impressive."
  },
  {
    name: "Samuel Adeyemi",
    email: "samueladeyemi@example.com",
    location: "Ibadan, Nigeria",
    message: "I joined for the games but stayed because of how many ways there are to earn. The design also looks premium and trustworthy."
  },
  {
    name: "Queen Esther",
    email: "queenesther@example.com",
    location: "Benin City, Nigeria",
    message: "Very beautiful website. I can easily move from videos to tasks to referrals. Everything is arranged well and works in a simple way."
  },
  {
    name: "David Chukwu",
    email: "davidchukwu@example.com",
    location: "Owerri, Nigeria",
    message: "Support replied fast when I needed help urgently. Quash Pay made earning online look more professional and more enjoyable for me."
  }
];

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

function createTestimonialCard(data, isDefault = false) {
  const card = document.createElement("div");
  card.className = "testimonial-card";

  const name = escapeHtml(data.name || "Anonymous User");
  const email = escapeHtml(data.email || "No email");
  const location = escapeHtml(data.location || "Unknown Location");
  const message = escapeHtml(data.message || "");

  card.innerHTML = `
    <div class="quote">“</div>
    <p>${message}</p>
    <div class="user-info">
      <h4>${name} ${isDefault ? '<span style="font-size:12px;color:#4338ca;">• Fixed</span>' : ""}</h4>
      <span>${location}</span>
      <div class="user-email">${email}</div>
    </div>
  `;

  return card;
}

function renderDefaultTestimonials() {
  defaultTestimonials.forEach((item) => {
    const card = createTestimonialCard(item, true);
    testimonialsGrid.appendChild(card);
  });
}

async function loadTestimonials() {
  hideFetchMessages();
  fetchLoadingBox.style.display = "block";
  testimonialsGrid.innerHTML = "";

  renderDefaultTestimonials();

  try {
    const testimonialsRef = collection(db, "testimonials");
    const testimonialsQuery = query(testimonialsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(testimonialsQuery);

    let firestoreCount = 0;

    snapshot.forEach((docItem) => {
      const data = docItem.data();
      const card = createTestimonialCard(data, false);
      testimonialsGrid.appendChild(card);
      firestoreCount++;
    });

    testimonialCount.textContent = `Testimonials: ${defaultTestimonials.length + firestoreCount}`;
  } catch (error) {
    console.error("Error loading testimonials:", error);
    fetchErrorBox.textContent = "Failed to load Firestore testimonials. Please check your database rules and internet connection.";
    fetchErrorBox.style.display = "block";
    testimonialCount.textContent = `Testimonials: ${defaultTestimonials.length}`;
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
    submitErrorBox.textContent = "Unable to submit testimonial. Make sure Firestore is created and rules allow write access.";
    submitErrorBox.style.display = "block";
  } finally {
    setSubmitState(false);
  }
});

refreshTestimonialsBtn.addEventListener("click", async function () {
  await loadTestimonials();
});

scrollLeftBtn.addEventListener("click", function () {
  testimonialsGrid.scrollBy({
    left: -350,
    behavior: "smooth"
  });
});

scrollRightBtn.addEventListener("click", function () {
  testimonialsGrid.scrollBy({
    left: 350,
    behavior: "smooth"
  });
});

loadTestimonials();
