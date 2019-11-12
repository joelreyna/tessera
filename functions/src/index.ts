import * as functions from 'firebase-functions';

const escapeHtml = require('escape-html');
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const helloHttp = functions.https.onRequest( (req, res) => {
    res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
  });

export const agregarticket = functions.https.onRequest( (req, res) => {
    res.send(`${escapeHtml(req.query.id)} ${req.query.pass}!`);
});

