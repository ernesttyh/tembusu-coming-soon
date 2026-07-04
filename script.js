// Email / WhatsApp signup handler
async function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[name="contact"]');
  const contact = input.value.trim();
  
  if (!contact) return;

  const btn = form.querySelector('.signup-btn');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, timestamp: new Date().toISOString() })
    });

    if (res.ok) {
      input.value = '';
      btn.textContent = '✓ Added';
      // Show success message
      const successEl = form.querySelector('.form-success');
      if (successEl) successEl.style.display = 'block';
      // Hide the form note
      const noteEl = form.querySelector('.form-note');
      if (noteEl) noteEl.style.display = 'none';
    } else {
      btn.textContent = 'Try again';
    }
  } catch (err) {
    // Fallback: store locally
    const stored = JSON.parse(localStorage.getItem('tembusu_signups') || '[]');
    stored.push({ contact, timestamp: new Date().toISOString() });
    localStorage.setItem('tembusu_signups', JSON.stringify(stored));
    
    input.value = '';
    btn.textContent = '✓ Added';
    const successEl = form.querySelector('.form-success');
    if (successEl) successEl.style.display = 'block';
    const noteEl = form.querySelector('.form-note');
    if (noteEl) noteEl.style.display = 'none';
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
  }, 3000);
}

// Watch the film functionality
function toggleFilm() {
  const video = document.getElementById('bgVideo');
  if (video) {
    if (video.muted) {
      video.muted = false;
      video.currentTime = 0;
    } else {
      video.muted = true;
    }
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.querySelector('input')?.focus();
      }
    });
  });
});
