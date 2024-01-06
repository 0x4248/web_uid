/* Web UID
 * Create unique IDs for front end web applications
 * Github: https://www.github.com/lewisevans2007/web_uid
 * By: Lewis Evans
 */

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hexHash = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return hexHash;
}

/**
 * uid - Create a unique ID
 * @returns {string} uid
 */
async function uid() {
    this.userAgent = navigator.userAgent.replace(/\D+/g, '');
    this.ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => console.error(error));
    this.hour = new Date().getHours();
    this.day = new Date().getDay();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.hash = await sha256(this.userAgent + this.ip + this.hour + this.day + this.month + this.year);
    this.uid = this.hash.slice(0, 8) + '-' + this.hash.slice(8, 12) + '-' + this.hash.slice(12, 16) + '-' + this.hash.slice(16, 20) + '-' + this.hash.slice(20, 32);
    return this.uid;
}