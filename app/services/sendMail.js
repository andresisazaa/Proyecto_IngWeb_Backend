const nodemailer = require('nodemailer');
const { emailSender } = require('../../config/config');
const credentials = require('./auth/credentials.json').installed;
const token = require('./auth/token.json');

const sendEmail = (employee) => {
    return new Promise ( (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'pruebas199608@gmail.com',
                clientId: credentials.client_id,
                clientSecret: credentials.client_secret,
                refreshToken: token.refresh_token,
                accessToken: token.access_token,
                expires: token.expiry_date
            }
        });
    
        const mailOptions = {
            from: `Prueba de email sender <${emailSender.auth.user}>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: employee.email,
            subject: `Hi ${employee.name} I\'M A PICKLE!!`, // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` //
        };
    
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error){
                console.error(error.toString())
                resolve(false);
            }
            resolve(true);; 
        });
    })
}

module.exports = { sendEmail };