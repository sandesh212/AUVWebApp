import os
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from getDownloadsCSVs import get_csvs_from_downloads, get_CSV_rows_from_downloads, read_csv_file, get_CSV_rows_with_limits
from getDownloadsImages import get_images_from_downloads

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for simplicity

@app.route('/api/images')
def get_images():
    image_paths = get_images_from_downloads()
    return jsonify(image_paths)

@app.route('/api/csvs')
def get_CSVs():
    csv_files = get_csvs_from_downloads()
    return jsonify(csv_files)

@app.route('/api/csvRows')
def get_CSV_rows():
    csv_rows = get_CSV_rows_from_downloads()
    return jsonify(csv_rows)

@app.route('/api/csvRowsWithLimits')
def get_CSV_rows_with_limits_endpoint():
    file_name = request.args.get('fileName')
    skip = int(request.args.get('skip', 0))
    limit = int(request.args.get('limit', 100))
    rows = get_CSV_rows_with_limits(file_name, skip, limit)
    return jsonify(rows)

@app.route('/download/<filename>')
def download_file(filename):
    downloads_path = os.path.expanduser("~\\Documents")
    try:
        return send_from_directory(directory=downloads_path, filename=filename, as_attachment=True)
    except FileNotFoundError:
        return "File not found", 404

@app.route('/images/<path:filename>')
def serve_image(filename):
    image_dir = "./images"
    try:
        return send_from_directory(directory=image_dir, filename=filename)
    except FileNotFoundError:
        return "File not found", 404

if __name__ == '__main__':
    app.run(debug=True)
