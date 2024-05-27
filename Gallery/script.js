let username = sessionStorage.getItem("username");
let login_data = document.querySelector("#login_data");
if (username == null) {
  login_data.innerHTML = `<button type="button" class="btn btn-outline-success w-auto" id="sign_in">Sign in</button>`;
  let sign_in = document.querySelector("#sign_in");
  sign_in.addEventListener("click", () => {
    window.location.assign("/Login and Register/login.html");
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

//  add to cart
let json_url =
  "https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart";
fetch(json_url)
  .then((res) => res.json())
  .then((data) => {
    var cartcount = 0;
    var totalprice = 0;
    for (i in data) {
      var quantity = parseInt(data[i].quantity);
      cartcount = cartcount + quantity;
      var tprice = parseInt(data[i].price);
      totalprice = totalprice + tprice * quantity;
    }
    document.querySelector(".cartcounting").innerHTML = cartcount;

    document.querySelector(".totalamount").innerHTML = totalprice;

    var main = "";
    for (i in data) {
      main += ` <div class="col-12 mt-3"><div class="card p-2 h-100" >
                            <div class="row d-flex justify-content-center align-item-center">
                                <div class="col-md-4 col-sm-2 col-lg-4 p-2" style="max-width:60px">
                                    <img src="${data[i].img}"
                                        class="img-fluid h-100 w-100" style="max-height:80px;" alt="...">
                                </div>
                                <div class="col-md-7 col-sm-8 col-lg-7 p-2 justify-content-center align-items-center h-100">
                                <div class="d-flex justify-content-center align-item-center h-100 gap-3 m-2">
                                    <h6 class="mt-2 me-2">Price: <span>${data[i].price}</span></h6>
                                    <input type="text" value="${data[i].quantity}" readonly maxlength="2" style="width: 50px; text-align: center;max-height: 50px;">
                                    <button class="btn btn-danger delete" style="max-height: 50px;"><i class="bi bi-trash"></i></button>
                                    </div>

                                </div>
                            </div>
                        </div></div>`;
      document.querySelector("#ShoppingCartBody").innerHTML = main;
      let deletebtn = document.querySelectorAll(".delete");
      for (let i = 0; i < deletebtn.length; i++) {
        deletebtn[i].addEventListener("click", () => {
          if (data[i].quantity > 1) {
            data[i].quantity = parseInt(data[i].quantity) - 1;
            fetch(
              `https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart/${data[i].id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data[i]),
              }
            );
            setTimeout(() => {
              window.location.reload();
            }, 800);
          } else {
            fetch(
              `https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart/${data[i].id}`,
              {
                method: "DELETE",
              }
            );
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        });
      }
    }
  });

setTimeout(() => {
  document.querySelector("#spinloader").style.display = "none";
}, 2000);
let fetchurl = "/Json/fetch.json";
fetch(fetchurl)
  .then((res) => res.json())
  .then((data) => {
    let keys = Object.keys(data);
    var catego = ` <option selected value="All Products">All Products</option>`;
    for (i in keys) {
      catego += `<option value="${keys[i]}">${keys[i]}</option>`;
    }
    document.getElementById("productcategory").innerHTML = catego;
  });
function categoryselect() {
  let category = document.getElementById("productcategory").value;
  if (category == "All Products") {
    fetch(fetchurl)
      .then((res) => res.json())
      .then((data) => {
        var gallery = "";
        for (i in data) {
          for (y in data[i]) {
            gallery += ` <div class="col-md-3 col-lg-3 col-sm-12 cardcolumn d-flex justify-content-center align-items-center">
                    <a href="/Description_page/index.html?id=${data[i][y].id}&img=${data[i][y].img}&heading=${data[i][y].heading}&price=${data[i][y].price}&description=${data[i][y].mdes}"><div class="card h-100 shadow" style="max-width:400px">
                            <img src="${data[i][y].img}" class="card-img-top" alt="...">
                          </div>
                        </a>
                </div>`;
          }
        }
        document.querySelector(".galleydata").innerHTML = gallery;
      });
  } else {
    fetch(fetchurl)
      .then((res) => res.json())
      .then((data) => {
        var gallery = "";
        let keys = Object.keys(data);
        for (i in keys) {
          if (keys[i] == category) {
            for (y in data[keys[i]]) {
              gallery += ` <div class="col-md-3 col-lg-3 col-sm-12 cardcolumn d-flex justify-content-center align-items-center">
              <a href="/Description_page/index.html?id=${
                data[keys[i]][y].id
              }&img=${data[keys[i]][y].img}&heading=${
                data[keys[i]][y].heading
              }&price=${data[keys[i]][y].price}&description=${
                data[keys[i]][y].mdes
              }"><div class="card h-100 shadow" style="max-width:400px">
                          <img src="${
                            data[keys[i]][y].img
                          }" class="card-img-top" alt="...">
                        </div>
                      </a>
              </div>`;
            }
          }
        }
        document.querySelector(".galleydata").innerHTML = gallery;
      });
  }
}

fetch(fetchurl)
  .then((res) => res.json())
  .then((data) => {
    var gallery = "";
    for (i in data) {
      for (y in data[i]) {
        gallery += ` <div class="col-md-3 col-lg-3 col-sm-12 cardcolumn d-flex justify-content-center align-items-center">
                    <a href="/Description_page/index.html?id=${data[i][y].id}&img=${data[i][y].img}&heading=${data[i][y].heading}&price=${data[i][y].price}&description=${data[i][y].mdes}"><div class="card h-100 shadow" style="max-width:400px">
                            <img src="${data[i][y].img}" class="card-img-top" alt="...">
                          </div>
                        </a>
                </div>`;
      }
    }
    document.querySelector(".galleydata").innerHTML = gallery;
  });
let col3 = document.querySelector(".threecol");
let col5 = document.querySelector(".fivecol");
let col12 = document.querySelector(".twelvecol");

col12.addEventListener("click", () => {
  let column = document.querySelectorAll(".cardcolumn");
  for (i = 0; i < column.length; i++) {
    column[i].classList.remove("col-md-3");
    column[i].classList.remove("col-lg-3");
    column[i].classList.remove("col-md-5");
    column[i].classList.remove("col-lg-5");
    column[i].classList.add("col-md-12");
    column[i].classList.add("col-lg-12");
  }
});

col3.addEventListener("click", () => {
  let column = document.querySelectorAll(".cardcolumn");
  for (i = 0; i < column.length; i++) {
    column[i].classList.remove("col-md-12");
    column[i].classList.remove("col-lg-12");
    column[i].classList.remove("col-md-5");
    column[i].classList.remove("col-lg-5");
    column[i].classList.add("col-md-3");
    column[i].classList.add("col-lg-3");
  }
});

col5.addEventListener("click", () => {
  let column = document.querySelectorAll(".cardcolumn");
  for (i = 0; i < column.length; i++) {
    column[i].classList.remove("col-md-12");
    column[i].classList.remove("col-lg-12");
    column[i].classList.remove("col-md-3");
    column[i].classList.remove("col-lg-3");
    column[i].classList.add("col-md-5");
    column[i].classList.add("col-lg-5");
  }
});
