function toggleText(id) { 
    
    $(`#${id} p, #${id} ul`).toggle();

   
    if (id === 'mesajSayfası') {
        $(`#${id}`).toggle();
    }
}



document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

   
    const formData = {
        email: document.getElementById('email').value,
        konu: document.getElementById('konu').value,
        mesaj: document.getElementById('mesaj').value,
    };

  
    fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message); 
        })
        .catch((error) => {
            console.error('Hata:', error);
            alert('Mesaj gönderilemedi.');
        });
});



