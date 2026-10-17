// Sign-up form. Tool-agnostic: set SIGNUP_ENDPOINT to the form endpoint of the email tool
// (Brevo, Mailchimp, Buttondown, Formspree…). The form posts email, project and lang as
// form data. Until it is set, the form says sign-ups open soon and sends nothing.
const SIGNUP_ENDPOINT = '';

document.querySelectorAll('.signup-form').forEach((form) => {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!SIGNUP_ENDPOINT) {
      status.textContent = form.dataset.soon;
      return;
    }
    const button = form.querySelector('button');
    button.disabled = true;
    try {
      const res = await fetch(SIGNUP_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.textContent = form.dataset.thanks;
    } catch {
      status.textContent = form.dataset.error;
    } finally {
      button.disabled = false;
    }
  });
});
