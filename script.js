import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
const signInButton = document.getElementById('signin-button');
const signUpButton = document.getElementById('signup-button');

function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Example of writing to the database
            const userRef = ref(database, 'users/' + user.uid);
            push(userRef, {
                email: user.email,
                lastLogin: new Date().toISOString()
            });

            // You can redirect the user or update the UI here
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
            // Signed up 
            const user = userCredential.user;
            console.log('User signed up:', user);
            window.location.href = 'get-user-detail.html?uid=' + user.uid;

            const userRef = ref(database, '/' + user.uid);
            push(userRef, {
                email: email, 
            })
            // You can add additional user data to the database here if needed
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
            alert(errorMessage)
        })
    }




signInButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signIn(email, password);
});

signUpButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signUp(email, password);
});

const usersRef = ref(database, 'users');
onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Users data:', data);
});
