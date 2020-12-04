const cardsContainer = document.getElementById('cardsContainer')
const navLogOut = document.getElementById('navLogOut')
const accBtn = document.getElementById('accBtn')
const authorName = document.getElementById('authorName')
const createPostSm = document.getElementById('createPostSm')

let userKey = ''
let accName = localStorage.getItem('accUser')
let dataArr = []
let selectedArticle = []
let logedIn = false
let author = localStorage.getItem('user')
let sortTriger = true

userKey = localStorage.getItem('userKey')

function logOut() {
    localStorage.setItem('userKey', '')
    localStorage.setItem('accUser', '')
}


function logCheck () {
    if(!!userKey){
        logedIn = true
    }
}

function sortCardsOld() {
    sortTriger = false
    createPostCard()
    sortNew.style.cursor = 'pointer'
    sortNew.style.backgroundColor = 'green'
    sortOld.style.cursor = 'default'
    sortOld.style.backgroundColor = 'gray'

}
function sortCardsNew() {
    sortTriger = true
    createPostCard()
    sortNew.style.cursor = 'default'
    sortNew.style.backgroundColor = 'gray'
    sortOld.style.cursor = 'pointer'
    sortOld.style.backgroundColor = 'green'
    if(logedIn){
        createAddBtn()
    }
}

function editCard(event) {
    let select = dataArr.filter(el => el.id == event.path[2].id)[0]
    window.location.href = 'editPost.html' 
    localStorage.setItem('user', JSON.stringify(select))
}

function compare(a, b) {
    
    const timeA = a.timestamp;
    const timeB = b.timestamp;
  
    let comparison = 0;
    if (timeA > timeB) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    if(sortTriger){
       return comparison; 
    } else {
        return comparison * -1;
    }
    
  }

function displayAllPosts() {
    fetch(`http://167.99.138.67:1111/getuserposts/${accName}`)
    .then(res => res.json())
    .then(data => {
        data.data.map ( item => {
            dataArr.push(item)
        })
        console.log(data);
        createPostCard()
        displayAuthorsName()
    })
}

function displayAuthorsName() {
    authorName.innerText = dataArr[0].username.toUpperCase()
}

function displayAcc() {
    navLogBtn.style.display = 'none'
    accBtn.style.display = 'block'
}


function countDate(item) {
    var ts = item.timestamp;
    var ts_ms = ts;
    var date_ob = new Date(ts_ms);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    let totalDate=year + "-" + month + "-" + date
    return totalDate
}

function enterPost(event) {
    let select = dataArr.filter(el => el.id == event.path[1].id)[0]
    window.location.href = 'post.html' 
    localStorage.setItem('user', JSON.stringify(select))
}

function createPostCard() {
    dataArr.sort(compare)
    cardsContainer.innerHTML = ''
    dataArr.map (item => {
        let cardFrame = document.createElement('div')
        cardFrame.classList.add('cardFrame')
        cardFrame.setAttribute('id', item.id)
        let cardImg = document.createElement('img')
        cardImg.src = item.image
        let info = document.createElement('div')
        info.classList.add('cardInfo')
        let date = document.createElement('div')
        date.classList.add('cardDate')
        date.innerText = `${countDate(item)}`
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('cardTitle')
        cardHeader.innerText = item.title.toUpperCase()
        let cardText = document.createElement('p')
        cardText.classList.add('cardText')
        cardText.innerText = item.description.substr(0, Math.round(Math.random()*(100-50) + 50))
        let readMoreBtn = document.createElement('div')
        readMoreBtn.innerText = 'READ MORE'
        readMoreBtn.classList.add('readMoreBtn')
        let buttons = document.createElement('div')
        buttons.classList.add('cardButtons')
        let deletePost = document.createElement('div')
        deletePost.innerHTML = 'DELETE'
        deletePost.classList.add('postBtn')
        let editPost = document.createElement('div')
        editPost.innerText = 'EDIT'
        editPost.classList.add('postBtn')
        cardsContainer.prepend(cardFrame)
        cardFrame.appendChild(cardImg)
        cardFrame.appendChild(info)
        info.appendChild(date)
        cardFrame.appendChild(cardHeader)
        cardFrame.appendChild(cardText)
        cardFrame.appendChild(readMoreBtn)
        cardFrame.appendChild(buttons)
        buttons.appendChild(editPost)
        buttons.appendChild(deletePost)

        cardHeader.addEventListener('click', enterPost)
        cardImg.addEventListener('click', enterPost)
        readMoreBtn.addEventListener('click', enterPost)
        editPost.addEventListener('click', editCard)
        deletePost.addEventListener('click', deleteCard)
    })
}

function deleteCard(event) {
    if (confirm("Delete This Post?")) {
        console.log(event);
        let data = {
            secretKey: userKey,
            id: event.path[3].id
          
        };
    
        fetch('http://167.99.138.67:1111/deletepost', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                window.location.href = 'myAcc.html'
            } 
        console.log('Success:', data);
        
        })
    } else {
     
    }
}

function openCreatePage() {
    window.location.href = 'createPost.html' 
}

logCheck()
displayAllPosts()  

sortOld.addEventListener('click', sortCardsOld)
sortNew.addEventListener('click',sortCardsNew)
navLogOut.addEventListener('click', logOut)
createPostSm.addEventListener('click', openCreatePage)

// delete existing post (have to have secret key)
// http://167.99.138.67:1111/deletepost
// send JSON object with these keys:
// secretKey, id (id stands for post id)