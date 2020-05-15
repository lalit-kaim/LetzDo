import firebase from 'firebase'
import $ from 'jquery'
import brand from './brand.jpg'

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

export const initialize = firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

let FCMToken = null



messaging.usePublicVapidKey("BMDFO_y1-6lbYF0HyE-ieDyTiVZfscUJ1mmG2cStKtu14gzlOqSBUnG1NDI0b4RGg7_bwxtLiW_DmVWpDIl0bPU");

messaging.requestPermission()
.then(function(){
})
.catch(function(err){
    console.log(err)
})

messaging.getToken()
.then(function(token){
    FCMToken = token
    console.log(token)
    timerNotification();
})
.catch(function(err){
    console.log(err)
})

messaging.onTokenRefresh(()=>{
messaging.getToken()
.then(function(token){
})
.catch(function(err){
    console.log(err)
})
})

function timerNotification(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setTimeout(getNotification , 5000);
        }
    });
}

function getNotification(){
    const mydate = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
    const todolist = {...JSON.parse(localStorage.getItem('localstate'))};
    for(var i=0; i<todolist.todoRoot.length;i++){
        if(mydate===todolist.todoRoot[i].date){
            $.ajax({        
                type : 'POST',
                url : "https://fcm.googleapis.com/fcm/send",
                headers : {
                    Authorization : 'key=' + 'AAAAHKb0LVA:APA91bEpffArNDoHFNFQ9Sd2IpwODTAHYXW6cQl8kryS1gj-XV3A8FxFg9g4AuRLvtSr2h97iYTpLTOCysiNABqf0AfLtTkbkUWegg1nfgrzINAFF0XFOVzxb-z1V3cxHDDuYN4H3QaR'
                },
                contentType : 'application/json',
                dataType: 'json',
                data: JSON.stringify({"to": FCMToken, "notification": {"title":todolist.todoRoot[i].mytitle, "body":"LetzDo it.", "icon": brand, "requireInteraction": "true", "click_action":"/"}}),
                success : function(response) {
                    
                },
                error : function(xhr, status, error) {
                    console.log(xhr.error);                   
                }
            });
        }
    }
}



messaging.onMessage(function(payload){
    if(payload.notification){
    let title = payload.notification.title
    let options ={
        body:payload.notification.body,
        click_action:payload.notification.click_action
    }
    const myNotification = new Notification(title, options)
}
})


