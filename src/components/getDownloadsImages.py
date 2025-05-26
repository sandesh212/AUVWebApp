import os
import shutil
from PIL import Image

def convert_tif_to_png(input_path, output_path):
    try:
        # Open the TIF image
        with Image.open(input_path) as im:
            im = im.convert("RGB")
            im.save(output_path, "PNG")
            print(f"Image converted successfully: {output_path}")
    except Exception as e:
        print(f"Error converting image: {e}")

def get_images_from_downloads():
    downloads_path = os.path.expanduser("~\\Documents")
    image_files = [f for f in os.listdir(downloads_path) if f.endswith(('.jpg', '.jpeg', '.png', '.tif'))]
    image_files2 = [f for f in os.listdir("./images") if f.endswith(('.jpg', '.jpeg', '.png', '.tif'))]
    image_paths = [os.path.join(downloads_path, f) for f in image_files]
    for x in range(len(image_files)):
        if (image_files[x].rstrip(".tif")+".png") not in (image_files2):
            if image_files[x].endswith('.tif'):
                convert_tif_to_png(image_paths[x], "./images/"+(image_files[x].rstrip(".tif"))+".png")
                image_files[x] = "./images/"+(image_files[x].rstrip(".tif"))+".png"
            else:
                newPath = "./images/"+image_files[x]
                shutil.copy(image_paths[x], newPath)
    return sorted(image_files, key=lambda x: os.path.getmtime(os.path.join(downloads_path, x)), reverse=True)