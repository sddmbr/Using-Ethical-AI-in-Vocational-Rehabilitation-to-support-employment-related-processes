document.addEventListener('DOMContentLoaded', () => {
  // Inject modal HTML if not present
  if (!document.getElementById('contactModal')) {
    const modalHTML = `
      <div id="modalOverlay" class="modal-overlay" hidden></div>
      <div id="contactModal" class="contact-modal" role="dialog" aria-labelledby="contactTitle" hidden>
          <button id="closeModal" class="close-btn" aria-label="Close Contact Form">&times;</button>
          <h2 id="contactTitle">Contact Us</h2>
          <div class="contact-info" style="margin-bottom: 1em; border-bottom: 1px solid var(--border-color); padding-bottom: 1em;">
              <p><strong>Billy Belz</strong></p>
              <p>Phone: 214-912-0619</p>
              <p>Email: Billy@vra11y.com</p>
              <p>Discord: #ethical-ai</p>
          </div>
          <form id="contactForm">
              <div class="form-group">
                  <label for="contactName">Name</label>
                  <input type="text" id="contactName" name="name" required>
              </div>
              <div class="form-group">
                  <label for="contactEmail">Email</label>
                  <input type="email" id="contactEmail" name="email" required>
              </div>
              <div class="form-group">
                  <label for="contactSubject">Subject</label>
                  <input type="text" id="contactSubject" name="subject" required>
              </div>
              <div class="form-group">
                  <label for="contactMessage">Message</label>
                  <textarea id="contactMessage" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
          </form>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  function openModal() {
    const modal = document.getElementById('contactModal');
    const overlay = document.getElementById('modalOverlay');
    const close = document.getElementById('closeModal');
    if (overlay && modal) {
      overlay.hidden = false;
      modal.hidden = false;
      if (close) close.focus();
    }
  }

  function closeModal() {
    const modal = document.getElementById('contactModal');
    const overlay = document.getElementById('modalOverlay');
    const btn = document.getElementById('contactBtn');
    if (overlay && modal) {
      overlay.hidden = true;
      modal.hidden = true;
      if (btn) btn.focus();
    }
  }

  // Event delegation for opening and closing the modal
  document.addEventListener('click', (event) => {
    if (event.target.id === 'contactBtn' || event.target.closest('#contactBtn')) {
      openModal();
    } else if (event.target.id === 'closeModal' || event.target.closest('#closeModal')) {
      closeModal();
    } else if (event.target.id === 'modalOverlay') {
      closeModal();
    }
  });

  // Event delegation for form submission
  document.addEventListener('submit', (event) => {
    if (event.target.id === 'contactForm') {
      event.preventDefault();
      alert('Form submitted');
      closeModal();
    }
  });

  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
