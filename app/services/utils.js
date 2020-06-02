const nodemailer = require('nodemailer');
const { emailSender } = require('../../config/config');
const credentials = require('./auth/credentials.json').installed;
const token = require('./auth/token.json');
const { getPermissions } = require('../../config/firebase/index')

const sendEmail = (employee, link) => {
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
            from: `no-reply <${emailSender}>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: employee.email,
            subject: `Create password`,
            html: `<p style="font-size: 16px;">${link}</p>`
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

const generateRandomPassword = (letters, numbers, either) => {
    const chars = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        "0123456789",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
       ];
       return [letters, numbers, either].map(function(len, i) {
         return Array(len).fill(chars[i]).map(function(x) {
           return x[Math.floor(Math.random() * x.length)];
         }).join('');
       }).concat().join('').split('').sort(function(){
         return 0.5-Math.random();
       }).join('')
}


const isValidScope = async(name, component, role) => {
    const componentPermissions = await getPermissions(component);    
    const servicePermissions = componentPermissions[name];
    if(servicePermissions.find( rol => rol === role)) {
        return true;
    } else {
        return false;
    }
}


module.exports = { sendEmail, generateRandomPassword, isValidScope };