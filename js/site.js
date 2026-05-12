// YL Specialist Engineering — site JS
(function(){
  // Mobile menu
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if(ham && nav){
    ham.addEventListener('click',()=>nav.classList.toggle('open'));
  }
  // Contact form
  window.sendEnquiry = function(){
    const status = document.querySelector('.form-status');
    if(status){
      status.textContent = 'Thanks. Your enquiry has been prepared. We will review the details and reply with the next step.';
      status.style.color = '#1e7a4d';
    }
  };
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
