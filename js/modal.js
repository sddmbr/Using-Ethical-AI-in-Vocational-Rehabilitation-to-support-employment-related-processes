document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('contactBtn');

  // Inject modal HTML into body
  const modalHTML = `
    <div id="modalOverlay" class="modal-overlay" hidden></div>
    <div id="contactModal" class="contact-modal" role="dialog" aria-labelledby="contactTitle" hidden>
        <button id="closeModal" class="close-btn" aria-label="Close Contact Form">&times;</button>
        <h2 id="contactTitle">Contact Us</h2>
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

  const modal = document.getElementById('contactModal');
  const overlay = document.getElementById('modalOverlay');
  const close = document.getElementById('closeModal');
  const form = document.getElementById('contactForm');

  function openModal() {
    if (overlay) overlay.hidden = false;
    if (modal) modal.hidden = false;
    if (close) close.focus();
  }
  function closeModal() {
    if (overlay) overlay.hidden = true;
    if (modal) modal.hidden = true;
    if (btn) btn.focus();
  }

  if (btn) btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Form submitted');
      closeModal();
    });
  }

  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
