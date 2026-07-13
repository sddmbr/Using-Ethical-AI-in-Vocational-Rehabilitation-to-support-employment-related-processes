document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('contactBtn');
  const modal = document.getElementById('contactModal');
  const overlay = document.getElementById('modalOverlay');
  const close = document.getElementById('closeModal');
  const contactForm = document.getElementById('contactForm');
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

    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted');
        closeModal();
      });
    }
  }

  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
