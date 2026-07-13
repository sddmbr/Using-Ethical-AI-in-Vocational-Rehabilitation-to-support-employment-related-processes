document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('modalOverlay')) {
    const modalHTML = `
      <div id="modalOverlay" class="modal-overlay" hidden></div>
      <div id="contactModal" class="contact-modal" role="dialog" aria-labelledby="contactTitle" hidden>
          <button id="closeModal" class="close-btn" aria-label="Close Contact Form">&times;</button>
          <h2 id="contactTitle">Contact Us</h2>
          <form id="contactForm" onsubmit="event.preventDefault(); alert('Form submitted'); document.getElementById('closeModal').click();">
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
  const btn = document.getElementById('contactBtn');
  const modal = document.getElementById('contactModal');
  const overlay = document.getElementById('modalOverlay');
  const close = document.getElementById('closeModal');
  if (btn && modal && overlay && close) {
    function openModal() {
      overlay.hidden = false;
      modal.hidden = false;
      close.focus();
    }
    function closeModal() {
      overlay.hidden = true;
      modal.hidden = true;
      btn.focus();
    }
    btn.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  }

  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
