let cps;

async function onStartData() {
    const serverID = localStorage.getItem('serverID');
    const userID = localStorage.getItem('userID');

    const response = await fetch('/secureCheck/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({serverID, userID})
    });
    const data1 = await response.json();
    console.log(data1)
    cps = data1.content;

    if (data1.success == false) {
      window.location= '/locked'
    }

    setInitContent()
}

function setInitContent() {
    var currentHour = new Date().getHours();

    // Initialize a variable to store the greeting
    var greeting;

    // Set the greeting based on the current hour
    if (currentHour >= 5 && currentHour < 12) {
        greeting = `Good morning ${cps.first_name} ☀️`;
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = `Good afternoon ${cps.first_name} 👋`;
    } else {
        greeting = `Good evening ${cps.first_name} 🌙 `;
    }

    // Log the greeting to the console

    document.getElementById("greeting").innerHTML = greeting;
}

function navigateTo(section) {
    var contentDiv = document.getElementById('content');
    switch (section) {
        case 'user-settings':
            window.location = '/userSettings';
            break;
        case 'tube-time':
            window.location = '/privilagedContent/tubeTime';
            break;
        case 'coded-items':
            window.location = '/privilagedContent/coded-items';
            break;
        case 'gaming':
            window.location = '/privilagedContent/gaming';
            break;
        case 'space':
            window.location = '/privilagedContent/space';
            break;
        case 'aviation':
            window.location = '/privilagedContent/avation';
            break;
        case 'transport':
            window.location = '/privilagedContent/transport';
            break;
        case 'other':
            window.location = '/privilagedContent/other';
            break;
        case 'admin':
            window.location = '/admin';
            break;
        case 'music':
            window.location = '/privilagedContent/music';
            break;
        default:
            contentDiv.innerHTML = '<p>Please select an item from the dashboard.</p>';
    }
}

onStartData()