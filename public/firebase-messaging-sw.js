importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyD35tokGRZkHwWdMcV4Y3i30wVfEvpCtEo",
    authDomain: "letz-do.firebaseapp.com",
    databaseURL: "https://letz-do.firebaseio.com",
    projectId: "letz-do",
    storageBucket: "letz-do.appspot.com",
    messagingSenderId: "123060104528",
    appId: "1:123060104528:web:c7333f2eadcc3fda335055",
    measurementId: "G-DP3GRDJFF4"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle ="Lalit";
    const notificationOptions = {
        body: "Kaim"
    };
    console.log(notificationTitle, notificationOptions)
    return self.registration.showNotification(notificationTitle, notificationOptions);
});