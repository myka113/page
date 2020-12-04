const regsterBtn = document.getElementById('regsterBtn')
const loginBtn = document.getElementById('loginBtn')
const regCont = document.getElementById('regCont')
const congrats = document.getElementById('congrats')
const usernameWarning = document.getElementById('usernameWarning')
const pass1Warning = document.getElementById('pass1Warning')
const pass2Warning = document.getElementById('pass2Warning')
const logWarning = document.getElementById('logWarning')




regsterBtn.addEventListener('click', registerUser)
loginBtn.addEventListener('click', loginUser)

function registerUser (event) {
    let data = {
        name: event.path[1].children[0].value,
        passwordOne: event.path[1].children[2].value,
        passwordTwo: event.path[1].children[4].value
    };
    console.log(event);
    if(data.name.length > 4) {
        if (data.passwordOne.length>5) {
            if(data.passwordOne == data.passwordTwo) {
                fetch('http://167.99.138.67:1111/createaccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Success:', data);
                regCont.style.display = 'none'
                congrats.style.display = 'flex'
    
                })
            } else {
                pass2Warning.style.display = 'block'            }
        } else {
            pass1Warning.style.display = 'block'
        }
    } else {
        usernameWarning.style.display = 'block'
    }
}

function loginUser (event) {
    console.log(event);
    let data = {
        name: event.path[1].children[0].value,
        password: event.path[1].children[2].value,
      
    };

    fetch('http://167.99.138.67:1111/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            localStorage.setItem('userKey', data.secretKey)
            localStorage.setItem('accUser', event.path[1].children[0].value)
            window.location.href = 'index.html'
        } else {
            logWarning.style.display = 'block'
        }
    console.log('Success:', data);
    
    })
}
