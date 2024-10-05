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
        finalDiv.innerHTML = ``


    } 
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert(`Error: ${error.message}`);
    }
});


let usersRef1 = ref(database, 'users');
onValue(usersRef1, (snapshot) => {
    const data = snapshot.val();
    console.log('Users data:', data);
});

// Get the UID from the URL parameters
function getUID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

// Listen to changes for the specific user based on the UID
function listenToUserData(uid) {
    const userRef = ref(database, 'users/' + uid);
    
    onValue(userRef, (snapshot) => {
        const user = snapshot.val();
        const finalDiv = document.getElementById('final');  // Get finalDiv
        finalDiv.innerHTML = '';  // Clear previous content

        if (user) {
            const userName = user.name || 'Unknown Name';  // Default name if not available
            const userAge = user.age || 'Unknown Age';  // Default age if not available
            const userGender = user.gender || 'Unknown Gender';  // Default gender if not available

            // Create elements for user's basic info
            const nameElement = document.createElement('h3');
            const ageElement = document.createElement('p');
            const genderElement = document.createElement('p');

            nameElement.textContent = `Name: ${userName}`;
            ageElement.textContent = `Age: ${userAge}`;
            genderElement.textContent = `Gender: ${userGender}`;

            // Append user's basic info to finalDiv
            finalDiv.appendChild(nameElement);
            finalDiv.appendChild(ageElement);
            finalDiv.appendChild(genderElement);

            // Now, loop through the user's history if available
            const history = user.history || {};

            Object.keys(history).forEach(date => {
                const historyEntry = history[date];
                const status = historyEntry.status !== undefined ? historyEntry.status : 'Unknown';  // Default status
                const ecgImg = historyEntry.ecgImg || '';  // Default empty string if no ecgImg

                // Create elements for each entry in history
                const statusElement = document.createElement('p');
                const dateElement = document.createElement('p');
                const ecgImgElement = document.createElement('img');

                // Set the text content and attributes
                statusElement.textContent = `Status: ${status}`;
                dateElement.textContent = `Date: ${date}`;
                
                // Check if ecgImg is a URL and create an image if it is
                if (ecgImg) {
                    ecgImgElement.src = ecgImg;
                    ecgImgElement.alt = `ECG Image for ${userName} on ${date}`;
                    ecgImgElement.style.width = '300px';  // Adjust the width as needed
                }

                // Append the history data to finalDiv
                finalDiv.appendChild(dateElement);
                finalDiv.appendChild(statusElement);
                if (ecgImg) {
                    finalDiv.appendChild(ecgImgElement);
                }
            });
        } else {
            finalDiv.textContent = 'No user data available';
        }
    }, {
        onlyOnce: false // Keeps listening for real-time updates
    });
}

// Get UID and listen for updates
const uid = getUID();
if (uid) {
    listenToUserData(uid);
} else {
    console.error("UID not found in the URL.");
}

