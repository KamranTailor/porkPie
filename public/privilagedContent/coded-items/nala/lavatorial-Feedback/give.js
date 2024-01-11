async function submitFeedback() {
    const timestamp = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const comments = document.getElementById('comments').value;

  
    console.log(timestamp)
    const notes = `${location}. ${comments}`

    const response = await fetch('/nala/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({timestamp, notes})
    });
    const data1 = await response.json();
    console.log(data1)
}