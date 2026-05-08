const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger && navLinks){
  hamburger.addEventListener('click',function(){
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click',function(){
      navLinks.classList.remove('open');
    });
  });
}

function sendEnquiry(){
  const form = document.querySelector('.contact-form');
  if(!form) return;

  const inputs = form.querySelectorAll('input');
  const name = inputs[0] ? inputs[0].value || 'Customer' : 'Customer';
  const reach = inputs[1] ? inputs[1].value || '' : '';
  const partNumber = inputs[2] ? inputs[2].value || 'Not provided' : 'Not provided';
  const modelSelect = form.querySelector('select');
  const model = modelSelect ? modelSelect.value : 'Not provided';
  const partsArea = form.querySelector('textarea');
  const parts = partsArea ? partsArea.value || 'Parts enquiry' : 'Parts enquiry';

  const body = encodeURIComponent(
    `Hi Louis,

I would like to enquire about forklift parts.

Name: ${name}
Contact: ${reach}
Forklift: ${model}
OEM / part number: ${partNumber}
Parts needed: ${parts}

Thank you`
  );

  const mailto = `mailto:ylspecialistengineering@gmail.com?subject=Parts%20Enquiry%20-%20${encodeURIComponent(model)}&body=${body}`;
  const status = form.querySelector('.form-status');

  if(status){
    status.innerHTML = 'Opening your email app. If nothing opens, email <a href="mailto:ylspecialistengineering@gmail.com">ylspecialistengineering@gmail.com</a> with the details above.';
  }

  window.location.href = mailto;
}

function quickEnquiry(){
  const input = document.getElementById('quickPart');
  const part = input && input.value ? input.value : 'Forklift parts availability';

  window.location.href = `contact.html?part=${encodeURIComponent(part)}`;
}

window.sendEnquiry = sendEnquiry;
window.quickEnquiry = quickEnquiry;

const params = new URLSearchParams(window.location.search);
const requestedPart = params.get('part');
const contactForm = document.querySelector('.contact-form');

if(requestedPart && contactForm){
  const textarea = contactForm.querySelector('textarea');
  if(textarea){
    textarea.value = `Please check availability for: ${requestedPart}`;
  }
}
