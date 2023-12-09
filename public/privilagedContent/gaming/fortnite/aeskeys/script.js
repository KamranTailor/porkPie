//fortniteAES

async function onStart() {
    const response = await fetch('/fn-get/fortniteAES');
    const data = await response.json();
    const keys = data.data.data;
    console.log(keys);

    setMetData(keys);
    setDynamicKeys(keys);
}

function setMetData(keys) {
    document.getElementById("build").innerHTML= keys.build;
    document.getElementById("mKey").innerHTML= keys.mainKey;
    document.getElementById("lUpdated").innerHTML= keys.updated;
}

function setDynamicKeys(keys) {
    const r = keys.dynamicKeys;

    let td = "";
    for ( i in r) {
        const f = r[i];
        td += `<span id="item">
        <h3> ${f.pakFilename} </h3>
        Key: ${f.key} <br>
        Pak Guid: ${f.pakGuid}
        </span>`
    }

    document.getElementById("dynamicKeys").innerHTML= td;
}
onStart()