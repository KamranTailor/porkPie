async function start() {
    const responce = await fetch("/nala/get");
    const data = await responce.json()
    console.log(data)

    let toset = "";
    for (var i = 0; i < data.length; i++) {
        var entry = data[i];

        const timestamp = entry.timestamp;
        var formattedTimestamp = timestamp.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$1/$2/$3 $4:$5');
        var dateObject = new Date(formattedTimestamp);
        var formattedDate = dateObject.toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short', hour12: false });
      
        toset += `<div id='log'>
            <h1 id='logT'>${formattedDate}</h1>
            <p id="logP">${entry.notes}</p>
        <div>`
      }

    document.getElementById("items").innerHTML= toset;
}

start()