// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
        
// Display the submitted values
document.getElementById('display-firstname').textContent = urlParams.get('firstname') || 'Not provided';
document.getElementById('display-lastname').textContent = urlParams.get('lastname') || 'Not provided';
document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';
document.getElementById('display-phone').textContent = urlParams.get('phone') || 'Not provided';
document.getElementById('display-organization').textContent = urlParams.get('organization') || 'Not provided';

// Format membership level
const membership = urlParams.get('membership');
let membershipText = 'Not provided';
if (membership === 'NP') membershipText = 'NP Membership (Non-Profit)';
else if (membership === 'Bronze') membershipText = 'Bronze Membership';
else if (membership === 'Silver') membershipText = 'Silver Membership';
else if (membership === 'Gold') membershipText = 'Gold Membership';
document.getElementById('display-membership').textContent = membershipText;

// Format timestamp
const timestamp = urlParams.get('timestamp');
if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById('display-timestamp').textContent = date.toLocaleString();
} else {
    document.getElementById('display-timestamp').textContent = 'Not recorded';
}