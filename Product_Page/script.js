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
}

fetch("/Json/fetch.json")
  .then((res) => res.json())
  .then((json) => {
    var url = window.location.href;
    var product_id = url.substring(url.lastIndexOf("=") + 1);
    var data = "";
    let keys = Object.keys(json);
    console.log(keys);
    for (i in keys) {
      if (keys[i] == product_id) {
        // document.getElementById("breadcumbdata").innerHTML = keys[i];
        for (y in json[keys[i]]) {
          data += `<div class="col-md-6 col-sm-12 col-lg-3 m-lg-4 m-md-2 m-sm-2" role="button">
               <div class="card h-100 p-4" style="max-height:450px;min-height:100px;">
                        <img src="${
                          json[keys[i]][y].img
                        }" class="card-img-top w-100 h-100" style="max-height:250px;min-height:100px;"  alt="${
            json[keys[i]][y].title
          } image">
                        <div class="card-body">
                           <h5 class="card-title text-dark text-decoration-none">${
                             json[keys[i]][y].heading
                           }</h5>
                           <p>${json[keys[i]][y].sdes}</p>
                           <a href="/Description_page/index.html?id=${
                             json[keys[i]][y].id
                           }" role="button" class="btn btn-outline-success">Learn More</a>
                        </div>
                       </div>
                    </div> `;
        }
      }
    }
    document.getElementById("product_data").innerHTML = data;
  });
