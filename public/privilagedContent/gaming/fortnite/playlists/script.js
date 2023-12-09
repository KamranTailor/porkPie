//fortnitePlaylists

async function onStart() {
    const response = await fetch('/fn-get/fortnitePlaylists')
    const data = await response.json()
    console.log(data)
    
    for (i in data.data.data) {
        const r = data.data.data[i];
        console.log(r.gameType)
        for (f in r.gameplayTags) {
            //console.log(r.gameplayTags[f])
        }
    }
}

onStart()