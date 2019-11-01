// global variables
const apiUrl = "http://localhost:3000/articles"
const commentsUrl = "http://localhost:3000/comments"



let container = document.getElementById('article-container')

container.addEventListener("submit", postComment)
// container.addEventListener('click', () => deleteComment())
container.addEventListener('click', () => {
    if (event.target.parentNode.id == "comments-list") {
        let li = document.getElementById(event.target.id)
        li.style.backgroundColor = "#8BACA8"
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete Comment"
        if (li.innerHTML.includes("button") == false) {
            li.append(deleteButton)
            let e = event.target
            deleteButton.addEventListener('click', () => commentDelete(e))
        }
        else {
            li.innerHTML = event.target.innerHTML.replace("<button>Delete Comment</button>", "")
            li.style.backgroundColor = "#FBFBFB"
        }
    }
})

container.addEventListener('click', () => fakeUnfake())

const commentDelete = (eventTarget) => {
    fetch(`http://localhost:3000/comments/${eventTarget.id}`, {
           method: "DELETE"
       }).then(resp => eventTarget.remove())
}




function getComments(theArticle) {
    return theArticle.comments.map(getComment).join(' ')
}

function getComment(com){
    return `<li class="comment" id = "${com.id}"> ${com.content}</li>`
}

function postComment() {
    let ev = event
    event.preventDefault()
    configurationObject = {
        method: "POST",
        headers: {"Content-Type": "application/json",  
        "Accept": "application/json"},
        body: JSON.stringify({'content': event.target.querySelector('textarea').value, 'user_id': 1, 'article_id': event.target.id})
          }
        
   fetch("http://localhost:3000/comments", configurationObject)
   .then(resp => resp.json())
   .then(el =>  {
       let ul = ev.target.parentNode.querySelector('ul')
       let newComment = getComment(el)
       ul.innerHTML += newComment
       
       let input = ev.target.querySelector("textarea")
       input.value = "";

   })

}


fetch(apiUrl)
  .then(resp => resp.json())
  .then(articles => {
    const articleContainer = document.getElementById("article-container")
    articleContainer.innerHTML = renderAllArticles(articles)
})


function renderAllArticles(articleArray) {
    return articleArray.map(renderSingleArticle).join('')
  }
  
function renderSingleArticle(article) {
    return (`
        <div class="article-card">
            <div class="article-frame">
                    <a href=${article.link}>${article.title}</a>
                <div class="article-image">
                    <img class="${toggleImgClass(article)}" src=${article.url}>
                </div>
                <div id="likeBtn" data-id="${getRating(article)}">
                    <button data-id="${article.id}" type="button" >${toggleFake(article)}</button>
                    <audio src="/Users/ipadurean79/Desktop/coding/news-app-frontend/donald-trump-fake-news-sound-effect.mp3" type="audio/mpeg"></audio>
                </div>
            </div>
                <div id="comments-container">
                        <form id=${article.id}>
                            <p>Create Comment:</p>
                            <textarea id="content-input" class="input" type="text" placeholder="Add Comment"></textarea>
                            <input id="submit" class="comment-box" type="submit">
                        </form>
                        <h3>Comments:</h3>
                        <ul id="comments-list">
                            ${getComments(article)} 
                        </ul>
                </div>
        </div>
    `)
  }


function getRating(item) {
      if (item.ratings[0] !== undefined) {
      return  item.ratings[0].id
          } else {
      return 0
   }
}

function toggleFake(item){
    if (item.ratings[0] !== undefined){
           return "Not Fake"
       } else {
           return "Report Fake"
    }
}

function toggleImgClass(item) {
    if (item.ratings[0] !== undefined){
        return "articlefake"
      } else {
        return "articlenotfake"
    }
}





function fakeUnfake() {
      let ev = event.target
        if (ev.parentNode.id == "likeBtn"){ 
            if(ev.parentNode.dataset.id != 0) {
                removeFake(ev)
            } else {
                addFake(ev)
            }
            
        }
  }

    


function addFake(item) {
    let sound = item.parentNode.querySelector('audio')
    sound.play()
    item.innerText = "Not Fake"
    item.parentNode.parentNode.querySelector('img').className = "articlefake"
    fetch("http://localhost:3000/ratings", {
        method: "POST",
        headers: {"Content-Type": "application/json",  
        "Accept": "application/json"},
        body: JSON.stringify({'user_id': 1, 'article_id': item.dataset.id}) 
    })
    .then(resp => resp.json())
    .then(el => {
        item.parentNode.dataset.id = el.id
        
    })
} 



function removeFake(item) {
    item.innerText = "Report Fake"
    item.parentNode.parentNode.querySelector('img').className = "articlenotfake"
    fetch(`http://localhost:3000/ratings/${item.parentNode.dataset.id}`, {
        method: "DELETE"
    })
    .then(resp => {
        item.parentNode.dataset.id = 0
        
    })
}
  



