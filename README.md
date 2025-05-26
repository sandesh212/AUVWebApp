## **TECHNICAL DOCUMENTATION**

## **Project Overview**
This project integrates a web-based interface and a backend server, allowing users to interact with AUV. The application features a **React-based frontend** and a **Flask backend**. It is designed for **real-time data visualization**, **image processing**, and **system administration** tasks.

---

## **Project Setup Instructions**

### **Prerequisites**
Ensure you have the following software installed on your machine:
- **[Python (3.x.x)](https://www.python.org/downloads/)**: Required for running the backend server (Flask).
- **[Node.js (LTS version)](https://nodejs.org/en/download/prebuilt-installer/current)**: Required for managing and running the frontend (React).
- **PIP**: Python's package manager, included with Python.
- **Administrative Access**: For installing dependencies and running scripts.

---

### **1. Python Installation**
- Download and install **Python 3.x.x** from the official [Python Downloads page](https://www.python.org/downloads/).
- **Add Python to PATH**: Ensure the option to "Add Python to PATH" is checked during installation.

### **2. Node.js Installation**
- Download and install the latest **LTS version of Node.js** from the [Node.js Downloads page](https://nodejs.org/en/download/).
- Confirm that **Node.js** and **NPM** (Node Package Manager) are installed correctly by running:
    ```bash
    node -v
    npm -v
    ```

### **3. Install Flask**
- Flask is required for the backend server. Install it by running:
    ```bash
    py -m pip install flask
    ```

### **4. Install Flask-CORS**
- Install Flask-CORS to handle cross-origin requests:
    ```bash
    py -m pip install flask-cors
    ```

### **5. Install Frontend Dependencies**
- Navigate to the frontend directory (where `package.json` is located) and install the necessary dependencies:
    ```bash
    npm install
    ```

---

## **Features Overview**

This section outlines the currently implemented features of the application, focusing on the functionality available across different pages such as the **Home**, **Log Files**, **Images**, **Database**,and **Graphs**. Some parts of the project are still under development (e.g., Graphs and Config pages).

### **1. Home Page**
The Home Page serves as the primary dashboard, displaying key system components and data visualizations.
- **Sidebar Navigation**:  The sidebar allows users to navigate between different sections of the application, such as Log Files, Images, Graphs, and Admin.
- **Recent Image Display**: The most recent image collected from the system is displayed directly on the homepage for quick access.
- **Recent Graph Display**: The most recent graph is displayed on the homepage. The user can interact with it or create new graphs.
- **Plot Graphs from Home**: Users can plot graphs using data from log files directly from the homepage. This feature provides flexibility for quick graph generation.

### **2. Login and Authorization (MySQL Integration)**
- **MySQL Database Authentication**: User login and authorization are managed through a MySQL database. This ensures secure access control based on stored credentials.
- **Session Management**: User sessions are maintained, and unauthorized access is redirected to the login page.
- 
### **3. Log Files Page**
The Log Files Page provides comprehensive access to system logs stored in CSV format, with features designed to improve performance and user interaction.
- **Log File List (Paginated)**: Displays all log files, sorted from recent to older. Users can browse through paginated lists of log files.
- **CSV File Details**: Upon selecting a CSV file, the first 100 rows of the log file are loaded for quick access. Additional rows are loaded in chunks of 100 as the user scrolls down, optimizing the performance and reducing rendering time.
- **Switch Between Views**: Users can switch between viewing logs as CSV data and visualizing them as graphs. This flexibility allows for quick analysis in either format.
- **Download Log File**: There is an option in the menu to download the selected log file directly to the user's system for offline analysis.

### **4. Graph Visualization Page**
Users can create and manage multiple graphs with custom settings. The page allows for a high degree of customization and data comparison.

- **Create up to 6 Graphs**: Users can create up to 6 graphs simultaneously. Each graph can be customized with different data points for comparison.
- **Flexible Y-Axis Selection**: For each graph, users can select up to 5 different Y properties to plot. This provides flexibility in data analysis.
- **Locked X-Axis (Time)**:The X-axis is locked to time, providing consistent time-series analysis for all graphs.
- **Graph Creation and Downloading**:Users can generate graphs with custom configurations and download the corresponding log files for further analysis.

### **5. Images Page**
The Images Page offers a gallery of images collected from various sensors. It supports multiple formats and allows users to view, enlarge, and download images.
- **Image Formats**: The system can handle images in TIF, PNG, and JPG formats, automatically converting and displaying images for ease of use.
- **Image Display (Old to Recent)**: Images are displayed in reverse chronological order (from oldest to most recent), allowing users to easily browse through past and recent sensor data.
- **Full-Screen Image View**: Upon clicking an image, it opens in a larger view on the same page, providing better visualization.
- **Image Download**: Users can download any image directly from the page for offline review and analysis.

---

## **Features in Development**

### **6. Graphs Page (Planned)**
The Graphs Page will allow users to create complex data visualizations with a more detailed interface, compared to the basic graph plotting available on the logfile page.

Future features will include advanced graph customization, saving graphs, and further analysis tools.

### **7. Config Page (Planned)**
The Config Page will provide users with system configuration options. This will include system settings, sensor data configurations, and user management features.

Future development will integrate this page with backend configuration APIs to allow for real-time system adjustments.

---

## **Frontend Setup**

### **1. Running the Frontend**
Once all dependencies are installed, start the React frontend server:  
**npm start**

The frontend runs on **http://localhost:3000** by default.

### **2. Key Components**
- **App.js**: The main entry point for the React application. Manages routing and user login state.
- **Sidebar**: Provides navigation between different sections like logs, images, graphs, and admin panel.
- **LoginPage**: Handles user authentication.
- **Graphs.js**: Visualizes data using dynamic graph generation. future implementation is needed.
- **Images.js**: Displays and manages images. handles downloads.
- **LogFiles.js**: Displays CSV files and provides options to view and download them. helps to create graph and visualise data.

---

## **Backend Setup**

### **1. Running the Backend**
Navigate to the directory containing `app.py` and run the backend server using Python: 
```bash
py app.py
```

### **2. Backend Structure**
- **app.py**: The main backend application using Flask, with several API endpoints.
- **Image Processing**: Handles image format conversion using the PIL library.
- **CSV Management**: Fetches and serves log files from a specified directory, providing CSV data to the frontend.

### **3. Flask API Endpoints**

| **Endpoint**              | **Method** | **Description**                                          |
|---------------------------|------------|----------------------------------------------------------|
| `/api/images`              | `GET`      | Fetches a list of images available for display.           |
| `/api/csvs`                | `GET`      | Returns a list of available CSV log files.                |
| `/api/csvRowsWithLimits`   | `GET`      | Fetches paginated rows from a specified CSV file.         |



