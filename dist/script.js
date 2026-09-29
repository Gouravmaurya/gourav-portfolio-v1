const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  const german = window.portfolioLanguage?.() !== 'en';
  try {
    await navigator.clipboard.writeText('anuragmaurya51489@gmail.com');
    copyStatus.textContent = german ? 'E-Mail-Adresse kopiert.' : 'Email copied.';
    copyButton.textContent = german ? 'Kopiert ✓' : 'Copied ✓';
    setTimeout(() => {
      copyButton.innerHTML = german ? 'E-Mail kopieren <span>↗</span>' : 'Copy email <span>↗</span>';
      copyStatus.textContent = '';
    }, 3000);
  } catch {
    copyStatus.textContent = german
      ? 'Bitte die E-Mail-Adresse markieren und kopieren oder den E-Mail-Link verwenden.'
      : 'Please select and copy the email address, or use the email link.';
  }
});
