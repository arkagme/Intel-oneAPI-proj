from firebase_admin import credentials, storage, db
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
