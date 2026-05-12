// YL Specialist Engineering — site JS
(function(){
  // Mobile menu
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if(ham && nav){
    ham.addEventListener('click',()=>nav.classList.toggle('open'));
  }
  const contactEmail = 'ylspecialistengineering@gmail.com';

  function fieldValue(form, selector, fallback){
    const field = form.querySelector(selector);
    return field && field.value.trim() ? field.value.trim() : fallback;
  }

  window.sendEnquiry = function(){
    const form = document.querySelector('.contact-form');
    const status = document.querySelector('.form-status');
    if(!form) return;

    const name = fieldValue(form, '[name="customerName"]', 'Not provided');
    const contact = fieldValue(form, '[name="customerContact"]', 'Not provided');
    const company = fieldValue(form, '[name="company"]', 'Not provided');
    const model = fieldValue(form, '[name="forkliftModel"]', 'Not sure');
    const oem = fieldValue(form, '[name="partNumber"]', 'Not provided');
    const serial = fieldValue(form, '[name="serialNumber"]', 'Not provided');
    const parts = fieldValue(form, '[name="partsNeeded"]', 'Not provided');
    const delivery = fieldValue(form, '[name="deliveryLocation"]', 'Not provided');

    const subject = `Parts enquiry - ${model}`;
    const body = [
      'Hi Louis,',
      '',
      'I would like to request a forklift parts quote.',
      '',
      `Name: ${name}`,
      `Phone or email: ${contact}`,
      `Company / workshop: ${company}`,
      `Forklift make and model: ${model}`,
      `OEM / part number: ${oem}`,
      `Serial number: ${serial}`,
      `Parts needed: ${parts}`,
      `Delivery suburb / postcode: ${delivery}`,
      '',
      'Thank you.'
    ].join('\n');

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if(status){
      status.innerHTML = `Your email app should open with the enquiry ready to send. If it does not open, email <a href="${mailto}">${contactEmail}</a>.`;
      status.style.color = '#1e7a4d';
    }

    window.location.href = mailto;
  };

  const params = new URLSearchParams(window.location.search);
  const requestedPart = params.get('part');
  const partsField = document.querySelector('[name="partsNeeded"]');
  if(requestedPart && partsField && !partsField.value.trim()){
    partsField.value = requestedPart;
  }
  const productTables = document.querySelectorAll('[data-products-table]');
  if(productTables.length){
    fetch('data/catalog.json')
      .then(response => response.json())
      .then(products => {
        productTables.forEach(table => {
          table.innerHTML = products.map(item => `
            <div class="tbl-row">
              <span class="ref">${item.ref}</span>
              <span class="name">${item.part}</span>
              <span class="oem">${item.oem}</span>
              <span class="app">${item.application}</span>
              <span class="status status-onq">${item.availability}</span>
              <a class="quote" href="contact.html?part=${encodeURIComponent(item.part + ' ' + item.oem)}">Quote →</a>
            </div>
          `).join('');
        });
      })
      .catch(() => {
        productTables.forEach(table => {
          table.innerHTML = '<div class="tbl-row"><span class="ref">INFO</span><span class="name">Catalogue data could not be loaded.</span><span class="oem">-</span><span class="app">Please contact YL with your part details.</span><span class="status status-onq">Contact us</span><a class="quote" href="contact.html">Quote →</a></div>';
        });
      });
  }
})();
