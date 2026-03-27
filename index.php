<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NovaBank - Smart Banking</title>
  <style>
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    body{
      background:#f5f8ff;
      color:#1b1b1b;
      line-height:1.6;
    }

    a{
      text-decoration:none;
      color:inherit;
    }

    .container{
      width:90%;
      max-width:1200px;
      margin:auto;
    }

    header{
      background:linear-gradient(135deg,#0d1b5e,#1f4fd6,#4fa3ff);
      color:white;
      padding-bottom:70px;
      position:relative;
      overflow:hidden;
    }

    nav{
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:25px 0;
    }

    .logo{
      font-size:30px;
      font-weight:bold;
      letter-spacing:1px;
    }

    .logo span{
      color:#ffd34d;
    }

    .nav-links{
      display:flex;
      gap:25px;
      align-items:center;
      font-size:15px;
    }

    .nav-links a:hover{
      color:#ffd34d;
    }

    .btn{
      display:inline-block;
      padding:13px 24px;
      border-radius:30px;
      font-weight:bold;
      transition:0.3s ease;
    }

    .btn-primary{
      background:#ffd34d;
      color:#111;
    }

    .btn-primary:hover{
      background:#ffbf00;
      transform:translateY(-2px);
    }

    .btn-light{
      background:white;
      color:#1f4fd6;
    }

    .btn-light:hover{
      background:#e9f0ff;
      transform:translateY(-2px);
    }

    .hero{
      display:grid;
      grid-template-columns:1.1fr 1fr;
      gap:40px;
      align-items:center;
      padding-top:30px;
    }

    .hero-text h1{
      font-size:55px;
      line-height:1.1;
      margin-bottom:20px;
    }

    .hero-text p{
      font-size:18px;
      margin-bottom:28px;
      color:#eef4ff;
      max-width:520px;
    }

    .hero-buttons{
      display:flex;
      gap:15px;
      flex-wrap:wrap;
      margin-bottom:30px;
    }

    .hero-stats{
      display:flex;
      gap:20px;
      flex-wrap:wrap;
      margin-top:15px;
    }

    .hero-stats .stat{
      background:rgba(255,255,255,0.12);
      backdrop-filter:blur(8px);
      padding:15px 18px;
      border-radius:18px;
      min-width:130px;
    }

    .hero-stats .stat h3{
      font-size:22px;
      margin-bottom:4px;
    }

    .hero-image{
      position:relative;
    }

    .hero-image img.main-img{
      width:100%;
      border-radius:28px;
      box-shadow:0 20px 60px rgba(0,0,0,0.25);
      display:block;
    }

    .floating-card{
      position:absolute;
      background:white;
      color:#111;
      padding:18px;
      border-radius:20px;
      box-shadow:0 15px 35px rgba(0,0,0,0.15);
      width:220px;
    }

    .card-one{
      top:20px;
      left:-30px;
    }

    .card-two{
      bottom:25px;
      right:-20px;
    }

    .floating-card h4{
      color:#1f4fd6;
      margin-bottom:8px;
      font-size:16px;
    }

    section{
      padding:80px 0;
    }

    .section-title{
      text-align:center;
      margin-bottom:50px;
    }

    .section-title h2{
      font-size:40px;
      color:#0d1b5e;
      margin-bottom:10px;
    }

    .section-title p{
      color:#666;
      max-width:650px;
      margin:auto;
    }

    .features{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
      gap:25px;
    }

    .feature-box{
      background:white;
      border-radius:22px;
      padding:30px 24px;
      box-shadow:0 10px 30px rgba(20,45,100,0.08);
      transition:0.3s ease;
    }

    .feature-box:hover{
      transform:translateY(-8px);
    }

    .feature-icon{
      width:60px;
      height:60px;
      border-radius:18px;
      background:linear-gradient(135deg,#1f4fd6,#66b3ff);
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:28px;
      margin-bottom:18px;
    }

    .feature-box h3{
      margin-bottom:10px;
      color:#0d1b5e;
    }

    .about{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:45px;
      align-items:center;
    }

    .about img{
      width:100%;
      border-radius:28px;
      box-shadow:0 15px 40px rgba(0,0,0,0.12);
    }

    .about-text h2{
      font-size:42px;
      color:#0d1b5e;
      margin-bottom:18px;
    }

    .about-text p{
      color:#555;
      margin-bottom:18px;
    }

    .about-list{
      margin-top:20px;
    }

    .about-list div{
      margin-bottom:12px;
      background:white;
      padding:14px 16px;
      border-radius:14px;
      box-shadow:0 8px 20px rgba(20,45,100,0.06);
    }

    .stats-section{
      background:linear-gradient(135deg,#0d1b5e,#1f4fd6);
      color:white;
    }

    .stats-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:20px;
    }

    .stats-box{
      background:rgba(255,255,255,0.1);
      border-radius:22px;
      padding:30px;
      text-align:center;
      backdrop-filter:blur(8px);
    }

    .stats-box h3{
      font-size:38px;
      color:#ffd34d;
      margin-bottom:8px;
    }

    .gallery{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
      gap:20px;
    }

    .gallery img{
      width:100%;
      height:260px;
      object-fit:cover;
      border-radius:22px;
      box-shadow:0 12px 30px rgba(0,0,0,0.1);
    }

    .testimonials{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
      gap:25px;
    }

    .testimonial{
      background:white;
      border-radius:22px;
      padding:28px;
      box-shadow:0 10px 28px rgba(20,45,100,0.08);
    }

    .testimonial img{
      width:65px;
      height:65px;
      border-radius:50%;
      object-fit:cover;
      margin-bottom:15px;
    }

    .testimonial h4{
      color:#0d1b5e;
      margin-top:14px;
    }

    .cta{
      background:linear-gradient(135deg,#1f4fd6,#6ac0ff);
      border-radius:30px;
      padding:60px 35px;
      color:white;
      text-align:center;
    }

    .cta h2{
      font-size:42px;
      margin-bottom:15px;
    }

    .cta p{
      max-width:650px;
      margin:0 auto 25px;
      color:#eef7ff;
    }

    footer{
      background:#08133f;
      color:white;
      padding:30px 0;
      margin-top:80px;
    }

    .footer-content{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:20px;
      flex-wrap:wrap;
    }

    .footer-links{
      display:flex;
      gap:18px;
      flex-wrap:wrap;
      color:#d6e2ff;
    }

    .footer-links a:hover{
      color:#ffd34d;
    }

    @media (max-width: 900px){
      .hero,
      .about{
        grid-template-columns:1fr;
      }

      .hero-text h1{
        font-size:40px;
      }

      .about-text h2,
      .section-title h2,
      .cta h2{
        font-size:32px;
      }

      .nav-links{
        display:none;
      }

      .floating-card{
        position:static;
        width:100%;
        margin-top:15px;
      }
    }

    @media (max-width: 500px){
      .hero-text h1{
        font-size:32px;
      }

      .btn{
        width:100%;
        text-align:center;
      }

      .hero-buttons{
        flex-direction:column;
      }
    }
  </style>
</head>
<body>

<header>
  <div class="container">
    <nav>
      <div class="logo">Nova<span>Bank</span></div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact" class="btn btn-primary">Open Account</a>
      </div>
    </nav>

    <div class="hero">
      <div class="hero-text">
        <h1>Bank Smarter, Faster and Safer With NovaBank</h1>
        <p>
          Experience modern banking with instant transfers, secure savings,
          smart cards, real-time alerts, and a beautiful digital experience
          designed for everyone.
        </p>

        <div class="hero-buttons">
          <a href="#" class="btn btn-primary">Get Started</a>
          <a href="#" class="btn btn-light">Download App</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <h3>2M+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="stat">
            <h3>99.9%</h3>
            <p>Secure Banking</p>
          </div>
          <div class="stat">
            <h3>24/7</h3>
            <p>Customer Care</p>
          </div>
        </div>
      </div>

      <div class="hero-image">
        <img class="main-img" src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80" alt="Banking woman using phone">

        <div class="floating-card card-one">
          <h4>Account Balance</h4>
          <p><strong>$12,480.50</strong></p>
          <small>Updated just now</small>
        </div>

        <div class="floating-card card-two">
          <h4>Quick Transfer</h4>
          <p>Send money to anyone in seconds with zero stress.</p>
        </div>
      </div>
    </div>
  </div>
</header>

<section id="features">
  <div class="container">
    <div class="section-title">
      <h2>Why Choose NovaBank</h2>
      <p>
        Everything you need in a modern banking platform, crafted with beauty,
        speed, safety and simplicity.
      </p>
    </div>

    <div class="features">
      <div class="feature-box">
        <div class="feature-icon">💳</div>
        <h3>Smart Cards</h3>
        <p>Get stylish physical and virtual cards for online and offline payments worldwide.</p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">🔐</div>
        <h3>Top Security</h3>
        <p>Your money and data are protected with advanced encryption and fraud monitoring.</p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">⚡</div>
        <h3>Instant Transfers</h3>
        <p>Move your money quickly with fast local and international transfers anytime.</p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">📈</div>
        <h3>Smart Savings</h3>
        <p>Save automatically, grow your funds, and track your financial goals easily.</p>
      </div>
    </div>
  </div>
</section>

<section id="about">
  <div class="container">
    <div class="about">
      <div>
        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80" alt="People discussing banking">
      </div>
      <div class="about-text">
        <h2>Beautiful Digital Banking For Modern Life</h2>
        <p>
          NovaBank helps individuals and businesses manage money with confidence.
          From savings to payments, our platform is designed to make your financial
          life simple and stress-free.
        </p>
        <p>
          Open an account in minutes, send and receive money, track expenses,
          and enjoy a polished banking experience from anywhere.
        </p>

        <div class="about-list">
          <div>✔ Easy account opening process</div>
          <div>✔ Real-time notifications and transaction tracking</div>
          <div>✔ Secure mobile and web banking experience</div>
          <div>✔ Friendly support team always ready to help</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      <div class="stats-box">
        <h3>150+</h3>
        <p>Countries Supported</p>
      </div>
      <div class="stats-box">
        <h3>5B+</h3>
        <p>Transactions Processed</p>
      </div>
      <div class="stats-box">
        <h3>10K+</h3>
        <p>Business Accounts</p>
      </div>
      <div class="stats-box">
        <h3>4.9/5</h3>
        <p>Customer Rating</p>
      </div>
    </div>
  </div>
</section>

<section id="gallery">
  <div class="container">
    <div class="section-title">
      <h2>Banking Experience Gallery</h2>
      <p>Clean, modern, and attractive visuals that make your bank look premium and trustworthy.</p>
    </div>

    <div class="gallery">
      <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80" alt="Bank card">
      <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80" alt="Finance woman">
      <img src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80" alt="Mobile banking">
      <img src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80" alt="ATM card payment">
    </div>
  </div>
</section>

<section id="reviews">
  <div class="container">
    <div class="section-title">
      <h2>What Customers Say</h2>
      <p>Trusted by thousands of people for speed, reliability, and excellent banking service.</p>
    </div>

    <div class="testimonials">
      <div class="testimonial">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer 1">
        <p>
          “NovaBank changed the way I handle my money. The app is fast, beautiful,
          and transfers are super easy.”
        </p>
        <h4>Amara Johnson</h4>
        <small>Entrepreneur</small>
      </div>

      <div class="testimonial">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer 2">
        <p>
          “I love the clean design and instant alerts. It feels safe and premium.
          Customer care is also very responsive.”
        </p>
        <h4>Daniel Smith</h4>
        <small>Business Owner</small>
      </div>

      <div class="testimonial">
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer 3">
        <p>
          “Saving money has become easier for me. The whole platform looks professional
          and works perfectly.”
        </p>
        <h4>Sophia Lee</h4>
        <small>Freelancer</small>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="container">
    <div class="cta">
      <h2>Open Your Bank Account Today</h2>
      <p>
        Join millions of users enjoying secure, smart and beautiful digital banking.
        Take control of your money with confidence.
      </p>
      <a href="#" class="btn btn-primary">Create Free Account</a>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-content">
      <div>
        <h3>NovaBank</h3>
        <p style="color:#c8d8ff;">Smart banking for your modern lifestyle.</p>
      </div>

      <div class="footer-links">
        <a href="#">Home</a>
        <a href="#">Accounts</a>
        <a href="#">Loans</a>
        <a href="#">Cards</a>
        <a href="#">Support</a>
      </div>
    </div>
  </div>
</footer>

</body>
</html>
