from firebase_admin import credentials, initialize_app, storage, db
from datetime import date
import firebase_admin

def url(image_path):
    cred = credentials.Certificate("credentials.json")
    initialize_app(cred, {'storageBucket': 'intel-oneapi.appspot.com'})

    # Put your local file path
    fileName = "satori.jpg"
    bucket = storage.bucket()
    blob = bucket.blob(fileName)
    blob.upload_from_filename(fileName)

    # Opt : if you want to make public access from the URL
    result = blob.make_public()
    return result

def add_history(uid,png):
    current_date = date.today()
    formatted_date = current_date.strftime("%B %d, %Y")
    img_url = url(png)

    # Initialize Firebase app
    cred = credentials.Certificate("credentials.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://intel-oneapi-default-rtdb.asia-southeast1.firebasedatabase.app/'
    })

    user_ref = db.reference(f'/{uid}/history/{formatted_date}')
    user_ref.set({'ecgImg': img_url})
    print("updation successful")
