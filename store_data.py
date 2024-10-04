import firebase_admin
from firebase_admin import credentials, auth, db
from datetime import date

# Initialize Firebase app
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://intel-oneapi-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

def create_user(email, password,name,age):
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        print(f"User created successfully: {user.uid}")

        # Create a node for the user in the Realtime Database
        user_ref = db.reference(f'/{user.uid}')
        user_ref.set({
            'email': email,
            'name': name,
            'age': age,
            'history':{'date1':{'status':0,
                                'ecgImg':'https://youtu.be/dQw4w9WgXcQ?si=b4640JS83rWOcQXw'},
                       'date2':{'status':0,
                                'ecgImg':'https://youtu.be/dQw4w9WgXcQ?si=b4640JS83rWOcQXw'}76yujnnh
                       }
            # Add any other user data you want to store
        })
        print(f"User data added to database for UID: {user.uid}")

        return user.uid
    except Exception as e:
        print(f"Error creating user: {e}")
        return None


def get_user(email):
    try:
        user = auth.get_user_by_email(email)
        print(f"User found: {user.uid}")
        return user.uid
    except auth.UserNotFoundError:
        print(f"No user found for email: {email}")
        return None

def add_history(email,png,status):
    current_date = date.today()
    formatted_date = current_date.strftime("%B %d, %Y")
    uid = get_user(email)
    user_ref = db.reference(f'/{uid}/history/{formatted_date}')
    user_ref.set({'status': status,
                  'ecgImg': png
                    })
    print("updation successful")

# Example usage
if __name__ == "__main__":
    # Create a new user
    #new_user_uid = create_user("user@example.com", "password123",'shree',43)

    # Get an existing user
    #existing_user_uid = get_user("user@example.com")
    add_history("user@example.com",'https://youtu.be/dQw4w9WgXcQ?si=b4640JS83rWOcQXw',1)
