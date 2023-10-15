async function onPageLoad() {
    const userAgent = navigator.userAgent;
    const loginStatus = loginStatu();
    toSend = { pageName, userAgent, loginStatus };
    const response = await fetch('/pageinit/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageName: pageName, userAgent: userAgent, loginStatus: loginStatus })
    });
    const data = await response.json();
    insertHeader();
    insertFooter();
}


function loginStatu() {
    if (localStorage.getItem('userLoggedIn')) {
        if (localStorage.getItem('userLoggedIn') === 'true') { // Use strict comparison
            var userLoggedInData = localStorage.getItem('userLoggedIn');
            console.log('User Logged In:');

            return userLoggedInData;
        } else {
            console.log('User is not logged in.');
            localStorage.setItem('userLoggedIn', 'false'); // Corrected syntax

            return false;
        }
    } else {
        console.log('User is not logged in.');
        localStorage.setItem('userLoggedIn', 'false'); // Corrected syntax

        return false;
    }
}


async function insertHeader() {
    let r;
    if (localStorage.getItem('userLoggedIn')) {
        if (localStorage.getItem('userLoggedIn') === 'true') { // Use strict comparison
            r = 'My Dashboard';
        } else {
            r = 'Login';
        }
    } else {
        r = 'Login';
    }

    const data = `<header>
    <nav>
        <a href='/home'>
            <div class="logo">
                🌐 Kamran Tailor
            </div> 
        </a>
        <ul id='big'>
            <li><a href="/home/#about">About</a></li>
            <li><a href="/home/#news">News</a></li>
            <li><a href="/home/#services">Services</a></li>
            <li><a href="/home/#contact">Contact</a></li>
            <li><a href="/login">${r}</a></li>
        </ul>
        <ul id='small'>
            <li><a href="/home/#about">About</a></li>
            <li><a href="/home/#news">News</a></li>
            <li><a href="/home/#services">Services</a></li>
            <li><a href="/home/#contact">Contact</a></li>
            <li><a href="/login">${r}</a></li>
        </ul>
    </nav>
    </header>`

    var header = document.createElement("div");
    header.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.insertBefore(header, body.firstChild);
}

async function insertFooter() {
    const response = await fetch ('/items/footer.txt');
    const data = await response.text();

    var footer = document.createElement("div");
    footer.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', onPageLoad);