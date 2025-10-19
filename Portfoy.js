function toggleText(id) { 
    
    $(`#${id} p, #${id} ul`).toggle();

   
    if (id === 'mesajSayfası') {
        $(`#${id}`).toggle();
    }
}



document.getElementById('contactForm').addEventListener('submit', function (e) { //olay dinleniyor
    e.preventDefault(); //sayfanın yenilenmesi engelleniyor

   // form verileri toplanıyor
    const formData = {
        email: document.getElementById('email').value,
        konu: document.getElementById('konu').value,
        mesaj: document.getElementById('mesaj').value,
    };  


   // sunucudaki adrese http post isteği ile form Data daki veriler gönderiliyor
    fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

      // sunucu bir cevap dönerse
        .then((response) => response.json())
        .then((data) => {
            alert(data.message); 
        })
         
        // bir hata oluşursa consolda gösterilir
        .catch((error) => {
            console.error('Hata:', error);
            alert('Mesaj gönderilemedi.');
        });
});



