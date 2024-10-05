from flask import Flask, request, send_file, jsonify
import os
import subprocess
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)

# Initialize Cron
CORS(app)

# Specify the upload and output directories
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'testfolder'

# Create the directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded video file
    video_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(video_path)

    # Process the video using face_to_ecg.py

    output_image_path = os.path.join('smtgelse.png')
    try:
        subprocess.run(['python', 'face_to_ecg.py', '-f', video_path, '-u', 'OYkHeVYEU9Zi2YxmDXK0Wu6YiT82'], check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Processing failed: {e}'}), 500

    # Check if the processed image exists
    if not os.path.exists(output_image_path):
        return jsonify({'error': 'Processed image not found'}), 500

    return send_file(output_image_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
