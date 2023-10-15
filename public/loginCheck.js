async function onStartLC() {
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

    if (data1.success == false) {
      window.location= '/locked'
    }
}

onStartLC()