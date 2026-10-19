// Inserire qui il numero WhatsApp ufficiale, con prefisso internazionale e sole cifre.
const WHATSAPP_NUMBER = '';
const dialog = document.querySelector('#booking');
const form = document.querySelector('#booking-form');
const status = document.querySelector('#booking-status');
const dateInput = form.elements.date;
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  dateInput.min = localDate();
  status.textContent = WHATSAPP_NUMBER ? '' : 'Demo: il numero WhatsApp del ristorante deve ancora essere configurato. Puoi provare a compilare il modulo.';
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  const datetime = new Date(`${data.get('date')}T${data.get('time')}`);
  if (!name) { status.textContent = 'Inserisci il tuo nome.'; return; }
  if (Number.isNaN(datetime.getTime()) || datetime <= new Date()) { status.textContent = 'Scegli una data e un orario futuri.'; return; }
  const date = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('it-IT', {day:'numeric',month:'long',year:'numeric'});
  const message = `Ciao Assolo Mare! Vorrei prenotare un tavolo.\n\nNome: ${name}\nData: ${date}\nOra: ${data.get('time')}\nPersone: ${data.get('guests')}${data.get('notes').trim() ? `\nNote: ${data.get('notes').trim()}` : ''}\n\nPotete confermare la disponibilità? Grazie!`;
  if (!/^\d{7,15}$/.test(WHATSAPP_NUMBER)) { status.textContent = `Anteprima della richiesta (invio disponibile dopo la configurazione del numero):\n${message}`; status.style.whiteSpace = 'pre-line'; return; }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  status.textContent = 'Richiesta preparata. Inviala su WhatsApp e attendi la conferma del ristorante.';
});
