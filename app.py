from flask import Flask, request, send_file
import os
import subprocess
import tempfile

app = Flask(__name__)
@app.route('/')
def index():
    return 'Welcome to the video processing server!'
@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return 'No video part in the request', 400

    video_file = request.files['video']

    if video_file.filename == '':
        return 'No selected video', 400

    # Create a temporary directory to store the uploaded video and processed image
    with tempfile.TemporaryDirectory() as tmpdirname:
        video_path = os.path.join(tmpdirname, video_file.filename)
        video_file.save(video_path)

        # Path where the processed image will be saved
        processed_image_path = os.path.join(tmpdirname, 'smtgelse.png')

        # Run the video processing script
        # Ensure 'process_video.py' is in the same directory as 'app.py'
        try:
            subprocess.run(['python3', 'face_to_ecg.py', '-f', video_path], check=True)
        except subprocess.CalledProcessError as e:
            return 'Video processing failed: ' + str(e), 500

        # Check if the image was created
        if not os.path.exists(processed_image_path):
            return 'Processed image not found', 500

        # Send the processed image back to the frontend
        return send_file(processed_image_path, mimetype='image/png')

if __name__ == '__main__':
    # Ensure the uploads directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(host='0.0.0.0', port=5000, debug=True)
