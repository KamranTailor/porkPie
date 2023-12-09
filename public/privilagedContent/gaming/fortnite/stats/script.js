let plat;
let user;

function start() {
    // Find all radio buttons with the name "platform"
    const platformRadios = document.querySelectorAll('input[name="platform"]');
    
    // Initialize a variable to store the selected platform
    let selectedPlatform = null;
    
    // Loop through the radio buttons to find the selected one
    platformRadios.forEach(radio => {
        if (radio.checked) {
            selectedPlatform = radio.value;
        }
    });
    
    // Check which platform is selected
    if (selectedPlatform) {
        console.log(`Selected platform: ${selectedPlatform}`);
        plat = selectedPlatform;
        findName();
    } else {
        document.getElementById("error").innerHTML= "No Platform Selected"
    }
}

function findName() {
    user = document.getElementById("name").value;

    send()
}

async function send() {
    const response = await fetch('/fn-stats/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, plat})
    });
    const data1 = await response.json();
    console.log(data1)

    if (data1.status != true) {
        document.getElementById('error').innerHTML= data1.error;
    } else {
        displayData(data1);
    }
}

function displayData(data) {
    var targetElement = document.getElementById('data');
    targetElement.style.display = 'block'; 

    const name = data.data.data.account.name;
    const level = `Level ${data.data.data.battlePass.level}`;
    document.getElementById("user").innerHTML= name;
    document.getElementById("levl").innerHTML= level;

    let r = data.data.data.stats.all.overall;
    const wins = `
    Total Wins ${r.wins} <br>
    Top 3: ${r.top3} <br>
    Top 5: ${r.top5} <br>
    Top 10: ${r.top10} <br>
    Top 25: ${r.top25} <br>`
    document.getElementById("oWinds").innerHTML= wins;
    const kills = `
    Total Kills ${r.kills} <br>
    Kills Per Match: ${r.killsPerMatch} <br>
    Kills Per Min: ${r.killsPerMin} <br>
    Deaths: ${r.deaths} <br>`
    document.getElementById("oKilles").innerHTML= kills;
    const mp = `
    Total Matches ${r.matches} <br>
    Minutes Played: ${r.minutesPlayed} <br>
    Players Out Lived: ${r.playersOutlived} <br>`
    document.getElementById("oMP").innerHTML= mp;


    r = data.data.data.stats.all.solo;
    const solo = `
    Total Matches ${r.matches} <br>
    Minutes Played: ${r.minutesPlayed} <br>
    Players Out Lived: ${r.playersOutlived} <br>
    Kills: ${r.kills} <br>
    Top Ten: ${r.top10} <br>
    Wins: ${r.wins} <br>`
    document.getElementById("solo").innerHTML= solo;

    r = data.data.data.stats.all.duo;
    const duo = `
    Total Matches ${r.matches} <br>
    Minutes Played: ${r.minutesPlayed} <br>
    Players Out Lived: ${r.playersOutlived} <br>
    Kills: ${r.kills} <br>
    Top Ten: ${r.top12} <br>
    Wins: ${r.wins} <br>`
    document.getElementById("duo").innerHTML= duo;

    r = data.data.data.stats.all.squad;
    const squad = `
    Total Matches ${r.matches} <br>
    Minutes Played: ${r.minutesPlayed} <br>
    Players Out Lived: ${r.playersOutlived} <br>
    Kills: ${r.kills} <br>
    Top Ten: ${r.top6} <br>
    Wins: ${r.wins} <br>`
    document.getElementById("squad").innerHTML= squad;

}