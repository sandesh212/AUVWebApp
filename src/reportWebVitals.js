// Import the specific metrics functions from the web-vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * This function takes an optional onPerfEntry function as a parameter,
 * which allows you to handle the performance entries however you'd like
 * (e.g., logging them to the console, sending them to a backend, etc.)
 */
function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Import and use the specific web vitals metrics as needed
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// Export the function for use in other parts of your application, such as `index.js`
export default reportWebVitals;
