async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/userVerfication/loginWeb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: password, username: username})
    });
    const data = await response.json();
    console.log(data)

    if (data.message == false ) {
      document.getElementById("notes").innerHTML= data.content;

      localStorage.setItem('userLoggedIn', 'false')

    } else if (data.message == true ) {
      localStorage.setItem('userLoggedIn', 'true')
      
      localStorage.setItem('serverID', data.serverID)
      localStorage.setItem('userID', data.userID)

      checkDetails()
    }
}

async function checkDetails() {
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

  let c = 0;
  const toSet = {};

  
  if (data1.content.dob === "") {
    document.getElementById('dob-section').style.display = 'block';
    
    c++;
  } else {
    document.getElementById('dob-section').style.display = 'none';
  }
  
  if (data1.content.email === "") {
    document.getElementById('email-section').style.display = 'block';
    c++;
  }  else {
    document.getElementById('email-section').style.display = 'none';
  }
  
  if (data1.content.first_name === "") {
    document.getElementById('fname-section').style.display = 'block';
    c++;
  }  else {
    document.getElementById('fname-section').style.display = 'none';
  }
  
  if (data1.content.phone_number === "") {
    document.getElementById('phone-section').style.display = 'block';
    c++;
  } else {
    document.getElementById('phone-section').style.display = 'none';
  }
  
  if (data1.content.second_name === "") {
    document.getElementById('lname-section').style.display = 'block';
    c++;
  } else {
    document.getElementById('lname-section').style.display = 'none';
  }



  if (c > 0) {
    document.getElementById('popup-container').style.display = 'block';
  } else {
    window.location = "/dashboard";
  }
}