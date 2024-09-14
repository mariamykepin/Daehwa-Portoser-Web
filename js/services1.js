let slideIndex = [1,1,1,1];
let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"]
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block";  
}




const priceList = {
    'IDR': {
        'Headshot': { 'Sketch': 10000, 'Line': 20000, 'Rendering': 35000 },
        'Bust Up': { 'Sketch': 15000, 'Line': 25000, 'Rendering': 50000 },
        'Half body': { 'Sketch': 30000, 'Line': 45000, 'Rendering': 80000 },
        'Full body': { 'Sketch': 60000, 'Line': 80000, 'Rendering': 100000 }
    },
    'USD': {
        'Headshot': { 'Sketch': 3, 'Line': 4, 'Rendering': 5 },
        'Bust Up': { 'Sketch': 8, 'Line': 9, 'Rendering': 10 },
        'Half body': { 'Sketch': 14, 'Line': 16, 'Rendering': 20 },
        'Full body': { 'Sketch': 20, 'Line': 25, 'Rendering': 35 }
    }
};

document.getElementById('calculate-cost').addEventListener('click', function() {
    // Check if a currency is selected
    const selectedCurrency = document.querySelector('input[name="currency"]:checked');
    if (!selectedCurrency) {
        alert('Please select a currency before calculating cost.');
        return;
    }

    let totalPrice = 0;
    const currency = selectedCurrency.value;

    // Loop through each option (Headshot, Bust Up, etc.)
    document.querySelectorAll('.option').forEach(optionElement => {
        const optionName = optionElement.textContent.trim();

        // Loop through each sub-option (Sketch, Line, Rendering)
        optionElement.nextElementSibling.querySelectorAll('li').forEach(subOptionElement => {
            const checkbox = subOptionElement.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const subOptionName = checkbox.parentElement.textContent.trim().split(' ')[0];
                const quantity = parseInt(subOptionElement.querySelector('input[type="number"]').value);
                totalPrice += priceList[currency][optionName][subOptionName] * quantity;
            }
        });
    });

    // Update total price with currency symbol
    const formattedTotalPrice = (currency === 'IDR') 
                                ? totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                : `$${totalPrice.toFixed(2)}`;

    document.getElementById('total-price').textContent = formattedTotalPrice;
});








Document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form form');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const services = form.querySelector('#services').value;
      const currency = form.querySelector('#currency').value;
      const type = form.querySelector('#type').value;
      const price = form.querySelector('#price').value;

      // Validasi Email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|yandex\.com|hotmail\.com|outlook\.com|aol\.com)$/i;
      if (!emailRegex.test(email)) {
          alert('Email tidak valid atau bukan dari domain yang diizinkan!');
          return;
      }
      // Simpan data formulir ke dalam objek
      const formData = {
          name: name,
          email: email,
          services: services,
          currency: currency,
          type: type,
          price: price
      };

      // Simpan data ke dalam sessionStorage (atau localStorage jika perlu data tetap tersimpan)
      sessionStorage.setItem('formData', JSON.stringify(formData));

      // Arahkan pengguna ke halaman baru
      window.location.href = 'halaman_baru.html';
  });
});