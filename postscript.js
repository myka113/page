const postContainerBig = document.getElementById('postContainerBig')
const navLogBtn = document.getElementById('navLogBtn')
const accBtn = document.getElementById('accBtn')
let userKey = ''
userKey = localStorage.getItem('userKey')
let user = JSON.parse(localStorage.getItem('user'));
console.log(user);
let dataArr

function getPost() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${user.username}/${user.id}`)
    .then(res => res.json())
    .then(data => {
        dataArr = data.data
        displayPostPage ()
        console.log(dataArr);
        if(logedIn){
            displayAcc()
        }
        })
}


function countDate() {
    var ts = dataArr.timestamp;
    var ts_ms = ts;
    var date_ob = new Date(ts_ms);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    let totalDate=year + "-" + month + "-" + date
    return totalDate
}

function visitAuthor(event) {
    localStorage.setItem('user', JSON.stringify(dataArr))
    console.log(event);
    window.location.href = 'author.html'
}

function displayPostPage () {
    let image = document.createElement ('img')
    image.src = dataArr.image
    image.classList.add('postImage')
    let textContainer = document.createElement('div')
    textContainer.classList.add('textContaner')
    let date = document.createElement('div')
    date.classList.add('cardDate')
    date.innerText = countDate()
    let postAuthor = document.createElement('div')
    postAuthor.classList.add('cardAuthor')
    postAuthor.innerText = dataArr.username
    let postText = document.createElement('div')
    postText.classList.add('postText')
    postText.innerHTML = 
    `
    <h2>
        ${dataArr.title}
    </h2>
    <p>
        ${dataArr.description}
    </p>
    `
    postContainerBig.appendChild(image)
    postContainerBig.appendChild(textContainer)
    textContainer.appendChild(postAuthor)
    textContainer.appendChild(date)
    textContainer.appendChild(postText)

    postAuthor.addEventListener('click', visitAuthor)
}

getPost()

function logCheck () {
    if(!!userKey){
        logedIn = true
    }
}

function displayAcc() {
    navLogBtn.style.display = 'none'
    accBtn.style.display = 'block'
}

logCheck()