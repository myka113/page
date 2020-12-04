
const postBtn = document.getElementById('postBtn')


let userKey = localStorage.getItem('userKey')

console.log(userKey);

let postTitle = ''
let postText = ''
let postURL = ''
let validation = {}

function checkFields(item) {
    if(postTitle.length < 20) {
        item.path[1].children[2].style.display = 'block'
        validation.title = false
    } else {
        item.path[1].children[2].style.display = 'none'
        validation.title = true
    }
    if(postText.length < 50) {
        item.path[1].children[5].style.display = 'block'
        validation.text = false
    } else {
        item.path[1].children[5].style.display = 'none'
        validation.text = true
    }
    if(postURL.length==0) {
        item.path[1].children[8].style.display = 'block'
        validation.url = false
    } else {
        item.path[1].children[8].style.display = 'none'
        validation.url = true
    }
}

function createPost() {
    if(validation.title && validation.text && validation.url) {
        console.log("lets post something");

        let data = {
            secretKey: userKey,
            title: postTitle,
            image: postURL,
            description: postText
          
        };
    
        fetch('http://167.99.138.67:1111/createpost', {
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
                window.location.href = 'index.html'
            } 
        console.log('Success:', data);
        
        })
    }
}
function setData(event) {
    postTitle = event.path[1].children[1].value
    postText = event.path[1].children[4].value
    postURL = event.path[1].children[7].value
    checkFields(event)
    createPost()
}

postBtn.addEventListener('click', setData)

// create new post (have to have secret key)
// http://167.99.138.67:1111/createpost
// send object JSON object with these keys:
// secretKey, title, image, description