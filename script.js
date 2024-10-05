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

let app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let database = getDatabase(app);

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
    const uid = getUID();
    formData.append('uid', uid); 

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        console.log(response.uid);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Force browser to reload the image
        const resultDiv = document.getElementById('result');
        const finalDiv = document.getElementById('final');
        console.log(getUID());
        resultDiv.innerHTML = `<img src="${getUID()}1.png" alt="Processed Image">`;
        finalDiv.innerHTML = 


    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert(`Error: ${error.message}`);
    }
});


let usersRef1 = ref(database, 'users');
onValue(usersRef1, (snapshot) => {
    const data = snapshot.val();
    console.log('Users data:', data);
});

let usersRef2 = ref(database, 'users');
onValue(usersRef2, (snapshot) => {
    const data = snapshot.val();
    const finalDiv = document.getElementById('final');  // Get finalDiv
    finalDiv.innerHTML = '';  // Clear previous content

    if (data) {
        // Loop through all users and update `finalDiv` with status and date
        Object.keys(data).forEach(userId => {
            const user = data[userId];
            const status = user.status || 'Unknown';  // Default status if not available
            const date = user.date || 'Unknown Date'; // Default date if not available

            // Create new elements for status and date
            const statusElement = document.createElement('p');
            const dateElement = document.createElement('p');

            // Set the text content of the elements
            statusElement.textContent = `Status: ${status}`;
            dateElement.textContent = `Last Updated: ${date}`;

            // Append the new elements to finalDiv
            finalDiv.appendChild(statusElement);
            finalDiv.appendChild(dateElement);
        });
    } else {
        finalDiv.textContent = 'No user data available';
    }
}, {
    onlyOnce: false // Keeps listening for real-time updates
});