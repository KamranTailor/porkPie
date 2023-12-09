// Function to update the countdown timer
function updateCountdown() {
    const now = new Date(); // Get the current date and time
    const target = new Date(); // Create a target date for 00:00 UTC

    // Set the target time to 00:00:00 UTC for the next day
    target.setUTCHours(0);
    target.setUTCMinutes(0);
    target.setUTCSeconds(0);
    target.setUTCDate(target.getUTCDate() + 1); // Add one day to the target date

    const timeDifference = target - now; // Calculate the time difference

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    // Update the timer text
    document.getElementById('countdown-timer').innerHTML = `🕘 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} `;
}

// Update the timer every second
setInterval(updateCountdown, 1000);

// Initial call to set the timer immediately
updateCountdown();
