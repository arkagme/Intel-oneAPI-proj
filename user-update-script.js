import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set , push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

    // Update user details in the database
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
        // You can redirect to another page or update the UI here
        // For example: window.location.href = 'welcome.html';
    }).catch((error) => {
        console.error('Error updating user details:', error);
        alert('An error occurred. Please try again.');
    });
});