from firebase_admin import credentials, storage, db, auth
from datetime import datetime
import firebase_admin

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://intel-oneapi-default-rtdb.asia-southeast1.firebasedatabase.app/',
                                     'storageBucket': 'intel-oneapi.appspot.com'})
def url(image_path):
    # Put your local file path
    fileName = image_path
    #print(image_path)
    bucket = storage.bucket()
    blob = bucket.blob(fileName)
    blob.upload_from_filename(fileName)

    # Opt : if you want to make public access from the URL
    blob.make_public()
    public_url = blob.public_url
    #print(f"Image uploaded successfully. Public URL: {public_url}")
    return public_url

def add_history(uid,png):
    current_date = datetime.now()
    formatted_date = current_date.strftime("%Y-%m-%d")
    #formatted_date = str(formatted_date)
    #print(formatted_date)
    img_url = url(png)

    user_ref = db.reference(f'/{uid}/history/{formatted_date}')
    user_ref.set({'ecgImg': img_url})
    print("updation successful")

def get_details(uid):
    # Reference the user data node (replace 'user_id' with the actual user identifier)
    user_ref = db.reference(f'/{uid}')

    # Retrieve the user data
    user_data = user_ref.get()

    # Extract and print the name, age, and gender (if available)
    if user_data:
        name = user_data.get('name', 'No name available')
        age = user_data.get('age', 'No age available')
        gender = user_data.get('gender', 'No gender available')  # Add gender if it's available in the data
        return [name,age,gender]
    else:
        print("User data not found.")
        return None
