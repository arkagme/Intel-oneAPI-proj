import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove , get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRE096DfU3ZLC-yASMFEqtBDDuM-HIV74",
    authDomain: "intel-oneapi.firebaseapp.com",
    databaseURL: "https://intel-oneapi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "intel-oneapi",
    storageBucket: "intel-oneapi.appspot.com",
    messagingSenderId: "745920387030",
    appId: "1:745920387030:web:5e0343b1ace47803f9b677",
    measurementId: "G-3RKMDQHT1E"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const uploadbutton = document.getElementById('upload-button')
let signInButton = document.getElementById('signin-button');
let signUpButton = document.getElementById('signup-button');
let welcomeMessage = document.getElementById('username');


function signIn(email, password) {
    console.log('signIn', email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            const userId = user.uid;
            console.log('User signed in:', user);
            window.location.href = 'dashboard.html?uid=' + userId;
            })
          
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
        });
}



function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            const user = userCredential.user;
            console.log('User signed up:', user);
            window.location.href = 'get-user-detail.html?uid=' + user.uid;

            const userRef = ref(database, '/' + user.uid);
            push(userRef, {
                email: email, 
            })
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
            alert(errorMessage)
        })
    }

if(signInButton){
signInButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signIn(email, password);
});
}

if(signUpButton){
signUpButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signUp(email, password);
});
}

function loadDashboard() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('uid');

    if (userId && welcomeMessage) {
        const userRef = ref(database, '/' + userId);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const username = userData.name;
                    welcomeMessage.textContent = `Welcome ${username}`;
                } else {
                    console.log('No data available');
                    welcomeMessage.textContent = 'Welcome User';
                }
            })
            .catch((error) => {
                console.error('Error loading user data:', error);
                welcomeMessage.textContent = 'Welcome User';
            });
    }
}


if (welcomeMessage) {
    loadDashboard();
}

function getUID(){
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('uid'))
    return urlParams.get('uid');
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('videoInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
            uid : getUID()
        });
        console.log(response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Force browser to reload the image
        const resultDiv = document.getElementById('result');
        print(getUID())
        resultDiv.innerHTML = `<img src="smtgelse.png" alt="Processed Image">`;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert(`Error: ${error.message}`);
    }
});


const usersRef = ref(database, 'users');
onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Users data:', data);
});