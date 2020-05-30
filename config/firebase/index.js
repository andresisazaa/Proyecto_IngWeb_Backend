const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { sendEmail, generateRandomPassword } = require('../../app/services/utils')

const initializeFirebaseApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://proyecto-ing-web.firebaseio.com"
    });
}

const sendPasswordResetLink = async (employee) => {
    admin.auth().generatePasswordResetLink(employee.email)
        .then(async (link) => {
            return await sendEmail(employee, link)
        })
        .catch((error) => {
            return false
        });

}

const register = async (employee) => {
    const password = generateRandomPassword(5, 3, 2);
    return new Promise((resolve, reject) => {
        admin.auth().createUser({
            uid: `${employee.id}`,
            email: employee.email,
            password
        })
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                resolve(false);
            });

    })
}

const getPermissions = (component) => {
    let ref = admin.database().ref().child(component);
    console.log(getPermissions.name)
    var data;
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on('value', function (snapshot) {
        data = snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    return data;
}

initializeFirebaseApp()
getPermissions('Brand')

module.exports = { initializeFirebaseApp, sendPasswordResetLink, register, getPermissions }