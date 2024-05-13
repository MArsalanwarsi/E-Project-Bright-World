let username = sessionStorage.getItem("username");
let login_data = document.querySelector("#login_data");
if (username == null) {
  login_data.innerHTML = `<button type="button" class="btn btn-outline-success w-auto" id="sign_in">Sign in</button>`;
  let sign_in = document.querySelector("#sign_in");
  sign_in.addEventListener("click", () => {
    window.location.assign("Login and Register/login.html");
  });
} else {
  login_data.innerHTML = `<h6>Welcome: <i><span id="login_user" class="h5">${username}</span></i></h6>
                <button type="button" class="btn btn-danger w-100" id="logout">Logout</button>
               </div>`;
  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    sessionStorage.removeItem("username");
    window.location.reload();
  });
};

fetch("/Json Files/blogs.json")
  .then((res) => res.json())
  .then((json) => {
    var url = window.location.href;
    var product_id = url.substring(url.lastIndexOf("=") + 1);
    var desc = "";
    var img = "";
    var title = "";
    for (i in json) {
      for (j in json[i]) {
        if (json[i][j].id == product_id) {
          title = json[i][j].title;
          desc = json[i][j].c_discription;
          img = `<img src="${json[i][j].img}" class="w-100" alt="..." style="min-height: 400px;">`;
        }
      }
    }
    document.getElementById("title").innerHTML = title;
    document.getElementById("description").innerHTML = desc;
    document.getElementById("image").innerHTML = img;
  });
