import os
import csv

def get_csvs_from_downloads():
    downloads_path = os.path.expanduser("~\\Documents")
    csv_files = [f for f in os.listdir(downloads_path) if f.endswith('.csv')]
    csv_files = sorted(csv_files, key=lambda x: os.path.getmtime(os.path.join(downloads_path, x)), reverse=True)
    return csv_files

def read_csv_file(file_path, skip=0, limit=100):
    rows = []
    with open(file_path, newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        for i, row in enumerate(csv_reader):
            if i < skip:
                continue
            if limit and len(rows) >= limit:
                break
            stripped_row = [cell.strip('"') for cell in row]
            rows.append(stripped_row)
    return rows

def get_CSV_rows_from_downloads():
    downloads_path = os.path.expanduser("~\\Documents")
    csv_files = [f for f in os.listdir(downloads_path) if f.endswith('.csv')]
    csv_paths = [os.path.join(downloads_path, f) for f in csv_files]
    full_csv = []
    for i, csv in enumerate(csv_paths):
        full_csv.append(csv_files[i])
        full_csv += read_csv_file(csv)
        full_csv.append(csv_files[i]+"||END||")
    return full_csv

def get_CSV_rows_with_limits(file_name, skip=0, limit=100):
    downloads_path = os.path.expanduser("~\\Documents")
    file_path = os.path.join(downloads_path, file_name)
    if not os.path.exists(file_path):
        return []  # Handle the case where the file does not exist
    return read_csv_file(file_path, skip, limit)
