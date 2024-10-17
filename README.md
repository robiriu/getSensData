# getSensData

## Overview

getSensData is a web application designed to collect, display, and visualize medical data such as oxygen saturation and heart rate. The application uses a form to gather user information and displays the data in real-time using Chart.js. The backend is built with Node.js and Express, and it stores data in a MongoDB database.

## Features

- **User Data Collection**: Collects user information including name, age, height, and weight.
- **Sensor Data Integration**: Displays real-time oxygen saturation and heart rate data.
- **Data Visualization**: Visualizes collected data using bar charts.
- **Data Management**: Allows users to submit and clear data.
- **Serial Port Communication**: Receives data from an Arduino via a serial port.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/robiriu/getSensData.git
   cd getSensData
2. Install dependencies:
   ```sh
   npm install
3. Start MongoDB: Ensure MongoDB is running on your local machine. You can start MongoDB using:
   ```sh
   mongod
 4. Run the application:
    ```sh
    node server.js
 5. Open the application: Open your browser and navigate to http://localhost:3000

## Usage
- Fill out the form with your name, age, height, and weight.
- Submit the form to send the data to the server.
- View the data in the “Submitted Data” section and the visualizations.
- Clear the data using the “Clear Data” button.
- Arduino Integration.
The application is designed to receive real-time sensor data from an Arduino. The Arduino should be programmed to read data from connected sensors (e.g., oxygen and heart rate sensors) and send this data via the serial port to the server.

## File Structure
- index.html: The front-end of the application.
- server.js: The back-end server handling requests and serial port communication.
- public/: Contains static files served by the server.

## Dependencies
- Express
- Mongoose
- Body-Parser
- Cors
- Path
- SerialPort
- Chart.js
