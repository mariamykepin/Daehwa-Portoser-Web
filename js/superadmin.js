document.addEventListener("DOMContentLoaded", function() {
    const invoiceData = document.getElementById("invoiceData");
    const messagesData = document.getElementById("messagesData");

    // Mengatur tampilan awal
    invoiceData.style.display = "none";
    messagesData.style.display = "none";

    // Mendengarkan klik pada tombol "Show Invoice"
    document.getElementById("showInvoice").addEventListener("click", function() {
        invoiceData.style.display = "block";
        messagesData.style.display = "none";
    });

    // Mendengarkan klik pada tombol "Show Messages"
    document.getElementById("showMessages").addEventListener("click", function() {
        invoiceData.style.display = "none";
        messagesData.style.display = "block";
    });

    // Panggil fungsi untuk memuat data invoice dan pesan
    loadInvoiceData();
    loadMessagesData();
});

function loadInvoiceData() {
    // Ambil data invoice dari server dan tampilkan di #invoiceData
    fetch("get_invoice.php")
    .then(response => response.json())
    .then(data => {
        const invoiceDataElement = document.getElementById("invoiceData");
        invoiceDataElement.innerHTML = ""; // Bersihkan isi sebelum menambahkan data baru
        data.forEach(invoice => {
            const invoiceElement = document.createElement("div");
            invoiceElement.classList.add("invoice");
            invoiceElement.innerHTML = `
                <p>Invoice ID: ${invoice.id}</p>
                <p>Nama: ${invoice.nama}</p>
                <p>Email: ${invoice.email}</p>
                <p>Service: ${invoice.service}</p>
                <p>Price: ${invoice.price}</p>
            `;
            invoiceDataElement.appendChild(invoiceElement);
        });
    })
    .catch(error => console.error("Error:", error));
}

function loadMessagesData() {
    // Ambil data pesan dari server dan tampilkan di #messagesData
    fetch("get_messages.php")
    .then(response => response.json())
    .then(data => {
        const messagesDataElement = document.getElementById("messagesData");
        messagesDataElement.innerHTML = ""; // Bersihkan isi sebelum menambahkan data baru
        data.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.innerHTML = `
                <p>From: ${message.name} &lt;${message.email}&gt;</p>
                <p>Message: ${message.message}</p>
            `;
            messagesDataElement.appendChild(messageElement);
        });
    })
    .catch(error => console.error("Error:", error));
}
