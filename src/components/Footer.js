import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/Footer.css'; // Ensure the CSS file is imported

function Footer() {
    const location = useLocation();

    // Static data simulating fetched data
    const footerData = {
        connectedUnit: 'Device AUV-001',
        currentStatus: 'Active, Depth 300m',
        missionObjective: 'Survey Coral Reefs in the Pacific',
        batteryStatus: 'Battery at 75%'
    };

    // Do not show footer on the login page
    if (location.pathname === '/login') {
        return null;
    }

    return (
      <div className="footer">
        <div className="footer-section">
            <h4>Connected Unit</h4>
            <p>{footerData.connectedUnit}</p>
        </div>
        <div className="footer-section">
            <h4>Current Status</h4>
            <p>{footerData.currentStatus}</p>
        </div>
        <div className="footer-section">
            <h4>Mission & Objective</h4>
            <p>{footerData.missionObjective}</p>
        </div>
        <div className="footer-section">
            <h4>Battery Status</h4>
            <p>{footerData.batteryStatus}</p>
        </div>
      </div>
    );
}

export default Footer;
