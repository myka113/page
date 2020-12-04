const postBtn = document.getElementById('postBtn')
let postInfo = JSON.parse(localStorage.getItem('user'))
let userKey = localStorage.getItem('userKey')

console.log(userKey);

let postTitle = document.getElementById('postTitle')
postTitle.value = postInfo.title
let postText = document.getElementById('postText')
postText.value = postInfo.description
let postURL = document.getElementById('postImage')
postURL.value = postInfo.image
let validation = {}
let postId = localStorage.getItem('postId')

function checkFields(item) {
    if(postTitle.value.length < 20) {
        item.path[1].children[2].style.display = 'block'
        validation.title = false
    } else {
        item.path[1].children[2].style.display = 'none'
        validation.title = true
    }
    if(postText.value.length < 50) {
        item.path[1].children[5].style.display = 'block'
        validation.text = false
    } else {
        item.path[1].children[5].style.display = 'none'
        validation.text = true
    }
    if(postURL.value.length==0) {
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
            title: postTitle.value,
            image: postURL.value,
            description: postText.value,
            id: postInfo.id
          
        };
    
        fetch('http://167.99.138.67:1111/updatepost', {
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
    }
}
function setData(event) {
    checkFields(event)
    createPost()
}

postBtn.addEventListener('click', setData)

// create new post (have to have secret key)
// http://167.99.138.67:1111/createpost
// send object JSON object with these keys:
// secretKey, title, image, description