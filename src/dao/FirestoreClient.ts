const { plainToClass, classToPlain } = require('class-transformer');
const admin = require('firebase-admin');

const serviceAccount = require('../../resources/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ipl2023-league.firebaseio.com',
});

export const db = admin.firestore();
