{/* <div id="posts">
        <div>
          <p>Post 1</p>
          <span class="options">
            <i class="fas fa-edit"></i>
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
          </span>
        </div>
      </div> */}

window.addEventListener("load", function(){
    let form = document.getElementById("form");
    let textareaInput = document.getElementById("message");
    let posts = document.getElementById("posts");
    let postsArray = [];

    posts.innerHTML = "";
    
    // Adding new post
    form.addEventListener("submit", function(e){
        e.preventDefault();
        let message = textareaInput.value;
        let id = Math.floor(Math.random() * 1000);
        postsArray.push({
            id: id,
            message: message
        });
        let post = document.createElement("div");
        post.innerHTML = `
        <div>
          <p>${message}</p>
          <span class="options">
            <i class="fas fa-edit"></i>
            <i class="fas fa-edit" data-id="${id}"></i>
            <i class="fas fa-trash-alt" data-id="${id}"></i>
          </span>
        </div>
      </div>
        `
        posts.appendChild(post);
        textareaInput.value = "";
        localStorage.setItem("posts", JSON.stringify(postsArray));
        window.location.reload();
    })

    // Showing all the posts

    let allPosts = JSON.parse(localStorage.getItem("posts"));
    if(allPosts){
        console.log(allPosts)

        for(let i=0; i<allPosts.length; i++){
            let post = document.createElement("div");
            post.innerHTML = `
            <div>
            <p>${allPosts[i].message}</p>
            <span class="options">
              <i class="fas fa-edit"></i>
              <i class="fas fa-edit" data-id="${allPosts[i].id}"></i>
              <i class="fas fa-trash-alt" data-id="${allPosts[i].id}"></i>
            </span>
          </div>
        </div>
            `

            posts.appendChild(post);
            postsArray.push(allPosts[i]);
        }
    }
    
    // Deleting post
     let deleteElements = document.getElementsByClassName("fa-trash-alt");
     for(let i=0; i<deleteElements.length; i++){
        deleteElements[i].addEventListener("click", function(){
            let id = this.getAttribute("data-id");
            console.log(id)
            for(let i=0; i<postsArray.length; i++){
                if(postsArray[i].id == id){
                    postsArray.splice(i,1);
                }

            }
            localStorage.setItem("posts", JSON.stringify(postsArray));
            window.location.reload();
        });
     }
  // Editing post
  let editElements = document.getElementsByClassName("fa-edit");
  for (let i = 0; i < editElements.length; i++) {
    editElements[i].addEventListener("click", function () {
      let id = this.getAttribute("data-id");
      console.log(id);
      for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i].id == id) {
          textareaInput.value = postsArray[i].message;
          editPost = postsArray[i];
        }
      }
    });
  }

});