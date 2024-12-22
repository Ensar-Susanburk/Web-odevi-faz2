const express = require('express'); 
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5500' })); 

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Sunucu Çalışıyor!');
});

app.post('/send-email', async (req, res) => {
    const { email, konu, mesaj } = req.body;


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ensarsusan@gmail.com',
            pass: 'pgsq kvqa ofie syrs', 
        },
    });

    const mailOptionsToReceiver = {
        from: email,
        to: 'ensarsusan@gmail.com', 
        subject: konu,
        text: `Gönderen: ${email}\n\n ${mesaj}`,
    };

    const mailOptionsToSender = {
        from: 'ensarsusan@gmail.com', 
        to: email,
        subject: 'Mesajınız başarıyla gönderildi!',
        text: 'İyi günler \n Mesajınızı aldık. İlginiz için teşekkürler.',
    };

    try {
       
        await transporter.sendMail(mailOptionsToReceiver);

       
        await transporter.sendMail(mailOptionsToSender);

        res.json({ message: 'Mesaj başarıyla gönderildi!' });
    } catch (error) {
        console.error('E-posta gönderim hatası:', error);
        res.status(500).json({
            message: 'E-posta gönderilemedi. Lütfen tekrar deneyin.',
            error: error.message,
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
