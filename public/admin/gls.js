let cps;

async function onStart() {
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

    adminCheck();
}

function adminCheck() {
    let disperce = true;
    for (i in cps.permississions) {
        const r = cps.permississions[i];
        if (r == true) {
            disperce = false;
            break
        }
    }
    if (disperce == true) {
        alert("You do not have admin permissions");
        //window.location = "/home"
    }
}

onStart();