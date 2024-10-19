import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set , push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID ,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('userDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');

    if (!uid) {
        console.error('No UID found in URL');
        alert('Error: User ID not found. Please sign up again.');
        return;
    }

    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const gender = document.getElementById('genderInput').value;

    const timestamp = new Date().toISOString().slice(0,10).replace(/[:.]/g, '-');

    
    set(ref(database, '/' + uid), {
        name: name,
        age: age,
        gender : gender,
        history : {[timestamp]: {
            status: 0,
            ecgImg: 'https://youtu.be/dQw4w9WgXcQ?si=b4640JS83rWOcQXw'
        }
        }
    }).then(() => {
        console.log('User details updated successfully');
        alert('Profile created successfully!');
      
    }).catch((error) => {
        console.error('Error updating user details:', error);
        alert('An error occurred. Please try again.');
    });
});