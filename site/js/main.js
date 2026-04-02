/* ============================================================
   samcrawford.dev — JavaScript
   Handles: visitor counter, contact form, nav toggle, smooth scroll
   ============================================================ */

// --- Visitor Counter ---
// Calls GET /api/visitors (CloudFront routes /api/* to API Gateway)
async function updateVisitorCount() {
  try {
    var response = await fetch('/api/visitors');
    var data = await response.json();
    var el = document.getElementById('visitor-count');
    el.textContent = data.count.toLocaleString() + ' visitors and counting';
  } catch (error) {
    // Silently fail — don't break the page if the API is down
    document.getElementById('visitor-count').textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', updateVisitorCount);

// --- Contact Form ---
// Calls POST /api/contact (CloudFront routes /api/* to API Gateway)
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  var submitBtn = this.querySelector('button[type="submit"]');
  var statusEl = document.getElementById('form-status');

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  var payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    var response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    var data = await response.json();

    if (response.ok) {
      statusEl.textContent = 'Message sent! I\'ll get back to you soon.';
      statusEl.classList.add('form-status-success');
      this.reset();
    } else {
      statusEl.textContent = data.error || 'Something went wrong. Please try again.';
      statusEl.classList.add('form-status-error');
    }
  } catch (error) {
    statusEl.textContent = 'Network error. Please try again later.';
    statusEl.classList.add('form-status-error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// --- Mobile Navigation Toggle ---
document.querySelector('.nav-toggle').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('nav-open');
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.remove('nav-open');
  });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
