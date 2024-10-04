import firebase_admin
import json
from firebase_admin import db,auth

print(f'CSV file has been successfully converted to JSON file .')

cred_obj = firebase_admin.credentials.Certificate("test-my-will-firebase-adminsdk-a4rsk-0d737cd68f.json")
default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL':'https://test-my-will-default-rtdb.asia-southeast1.firebasedatabase.app/'
    })

def verify_user(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        print('User is authenticated:', uid)
        return uid
    except Exception as e:
        print('Token verification failed:', e)
        return None

# Set up the database reference
ref = db.reference('users/' + uid)

# Write data (if the user is authenticated and has access)
ref.set({
    'name': 'John Doe',
    'email': 'user@example.com'
})

# Read data
data = ref.get()
print(data)