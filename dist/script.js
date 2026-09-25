const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('gouravmaurya351@gmail.com');
    copyStatus.textContent = 'Email copied';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy email ↗'; copyStatus.textContent = ''; }, 3000);
  } catch {
    copyStatus.textContent = 'Please select and copy the email address, or use the email link.';
  }
});
