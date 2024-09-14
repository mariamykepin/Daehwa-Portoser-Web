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

// Initialize the slides
document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < slideIndex.length; i++) {
        slideIndex[i].currentSlide = 1; // Reset currentSlide to 1 for each carousel
        showSlides(1, i); // Show the first slide for each carousel
    }
    // Create a timer to update each carousel concurrently
    for (let i = 0; i < slideIndex.length; i++) {
        setInterval(function (no) {
            plusSlides(1, no); // Update the carousel every 3 seconds
        }, 5, i);
    }
});

/*estimator*/
const priceList = {
    'IDR': {
        'Headshot': { 'Sketch': 50000, 'Line': 75000, 'Rendering': 100000 },
        'Bust Up': { 'Sketch': 70000, 'Line': 90000, 'Rendering': 130000 },
        'Half body': { 'Sketch': 90000, 'Line': 120000, 'Rendering': 160000 },
        'Full body': { 'Sketch': 120000, 'Line': 150000, 'Rendering': 200000 }
    },
    'USD': {
        'Headshot': { 'Sketch': 5, 'Line': 7.5, 'Rendering': 10 },
        'Bust Up': { 'Sketch': 7, 'Line': 9, 'Rendering': 13 },
        'Half body': { 'Sketch': 9, 'Line': 12, 'Rendering': 16 },
        'Full body': { 'Sketch': 12, 'Line': 15, 'Rendering': 20 }
    }
    };

    const calculateCostButton = document.getElementById('calculate-cost');
    const totalPriceSpan = document.getElementById('total-price');

    calculateCostButton.addEventListener('click', function() {
    // Check if a currency is selected
    const selectedCurrency = document.querySelector('input[name="currency"]:checked');
    if (!selectedCurrency) {
        alert('Please select a currency before calculating cost.');
        return;
    }

    let totalPrice = 0;
    const currency = selectedCurrency.value;

    // Loop through each option (Headshot, Bust Up, etc.)
    const optionElements = document.querySelectorAll('.option');
    for (const optionElement of optionElements) {
        const optionName = optionElement.querySelector('h5').textContent.trim();

        // Loop through each sub-option (Sketch, Line, Rendering)
        const subOptionElements = optionElement.querySelectorAll('li');
        for (const subOptionElement of subOptionElements) {
        const subOptionName = subOptionElement.querySelector('label').textContent.trim().split(' ')[0];
        const quantityInput = subOptionElement.querySelector('input[type="number"]');
        const quantity = parseInt(quantityInput.value);

        // Check if checkbox is checked and add price to total
        if (subOptionElement.querySelector('input[type="checkbox"]').checked) {
            totalPrice += priceList[currency][optionName][subOptionName] * quantity;
        }
        }
    }

        // Update total price with currency symbol
        totalPriceSpan.textContent = (currency === 'IDR') 
                                    ? totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                    : totalPrice.toFixed(2);

        // Show the total price
        totalPriceSpan.style.display = 'block';
    });

/*invoice*/
document.addEventListener("DOMContentLoaded", function() {
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
        window.location.href = 'successinvoice.html';
    });
});