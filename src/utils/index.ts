import axios from 'axios';
export function convertTimestampToReadableFormat(timestamp:string) {
    // Create a Date object from the timestamp
    let date = new Date(timestamp);

    // Array of month names
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Extract day, month, year, and time
    let day = date.getUTCDate();
    let month = monthNames[date.getUTCMonth()]; // Get month name from array
    let year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
   

    // Format the date and time
    let formattedDate = `${day} ${month} ${year}`;
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return {
        date: formattedDate,
        time: formattedTime
    };
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type':'application/json',
    Athorization:`Bearer ${localStorage.getItem("token")}`
  },
});






