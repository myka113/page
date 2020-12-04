const cardsContainer = document.getElementById('cardsContainer')
const navLogBtn = document.getElementById('navLogBtn')
const accBtn = document.getElementById('accBtn')
const sortNew = document.getElementById('sortNew')
const sortOld = document.getElementById('sortOld')
const searchBtn = document.getElementById('search')
const authorWarning = document.getElementById('authorWarning')

let userKey = ''
let dataArr = []
let selectedArticle = []
let logedIn = false
let sortTriger = true

userKey = localStorage.getItem('userKey')

function visitAuthor(event) {
    let select = dataArr.filter(el => el.id == event.path[2].id)[0]
    localStorage.setItem('user', JSON.stringify(select))
    console.log(event);
    window.location.href = 'author.html'
}


function openCreatePage() {
    window.location.href = 'createPost.html' 
}



function enterPost(event) {
    let select = dataArr.filter(el => el.id == event.path[1].id)[0]
    window.location.href = 'post.html' 
    localStorage.setItem('user', JSON.stringify(select))
}

function logCheck () {
    if(!!userKey && userKey.length>0){
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
    if(logedIn){
        createAddBtn()
    }
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
    fetch('http://167.99.138.67:1111/getallposts')
    .then(res => res.json())
    .then(data => {
        data.data.map ( item => {
            dataArr.push(item)
        })
        createPostCard()
        if(logedIn){
            createAddBtn()
            displayAcc()
        }
    })
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





function createAddBtn() {
    let addBtn = document.createElement('div')
    addBtn.classList.add('addBtn')
    addBtn.innerText = 'Create Post'
    cardsContainer.prepend(addBtn)
    addBtn.addEventListener('click', openCreatePage)
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
        let author = document.createElement('div')
        author.innerText = item.username.toUpperCase()
        author.classList.add('cardAuthor')
        let date = document.createElement('div')
        date.classList.add('cardDate')
        date.innerHTML = `&nbsp; / ${countDate(item)}`
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('cardTitle')
        cardHeader.innerText = item.title.toUpperCase()
        let cardText = document.createElement('p')
        cardText.classList.add('cardText')
        cardText.innerText = item.description.substr(0, 100)
        let readMoreBtn = document.createElement('div')
        readMoreBtn.innerText = 'READ MORE'
        readMoreBtn.classList.add('readMoreBtn')
        cardsContainer.prepend(cardFrame)
        cardFrame.appendChild(cardImg)
        cardFrame.appendChild(info)
        info.appendChild(author)
        info.appendChild(date)
        cardFrame.appendChild(cardHeader)
        cardFrame.appendChild(cardText)
        cardFrame.appendChild(readMoreBtn)
        cardHeader.addEventListener('click', enterPost)
        author.addEventListener('click', visitAuthor)
        cardImg.addEventListener('click', enterPost)
        readMoreBtn.addEventListener('click', enterPost)
    })
    
}



logCheck()
displayAllPosts()  

sortOld.addEventListener('click', sortCardsOld)
sortNew.addEventListener('click',sortCardsNew)

