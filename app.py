from flask import Flask, request, send_file
from flask_cors import CORS
import os
import subprocess
import tempfile
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/')
def index():
    return 'Welcome to the video processing server!'

@app.route('/upload', methods=['POST'])
def process_video():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part in the request', 400
    file = request.files['file']

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return 'No selected file', 400

    # Save the uploaded file to a temporary location
    with tempfile.TemporaryDirectory() as tmpdirname:
        video_path = os.path.join(tmpdirname, secure_filename(file.filename))
        file.save(video_path)

        # Path where the processed image will be saved
        processed_image_path = os.path.join(tmpdirname, './smtgelse.png')

        # Run the video processing script
        # Ensure 'face_to_ecg.py' is in the same directory as 'app.py'
        try:
            subprocess.run(['python', './face_to_ecg.py', '-f', video_path], check=True,
            cwd=tmpdirname,  # Set the working directory to the temporary directory
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        except subprocess.CalledProcessError as e:
            return f'Video processing failed: {str(e)}', 500

        # Check if the image was created
        if not os.path.exists(processed_image_path):
            return 'Processed image not found', 500

        # Send the processed image back to the frontend
        return send_file(processed_image_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
