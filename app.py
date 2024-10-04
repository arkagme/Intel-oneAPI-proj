from flask import Flask, send_file
from flask_cors import CORS
import os
import subprocess
import tempfile

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/')
def index():
    return 'Welcome to the video processing server!'

@app.route('/upload', methods=['GET'])
def process_video():
    # Hardcoded video filename
    video_filename = 'thirty.mp4'
    video_path = os.path.join(os.path.dirname(__file__), video_filename)

    if not os.path.exists(video_path):
        return f'Video file {video_filename} not found', 404

    # Create a temporary directory to store the processed image
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Path where the processed image will be saved
        processed_image_path = os.path.join(tmpdirname, 'smtgelse.png')

        # Run the video processing script
        # Ensure 'face_to_ecg.py' is in the same directory as 'app.py'
        try:
            subprocess.run(['python3', 'face_to_ecg.py', '-f', video_path], check=True)
        except subprocess.CalledProcessError as e:
            return f'Video processing failed: {str(e)}', 500

        # Check if the image was created
        if not os.path.exists(processed_image_path):
            return 'Processed image not found', 500

        # Send the processed image back to the frontend
        return send_file(processed_image_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)