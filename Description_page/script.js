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

let url = location.href;
let json_url =
  "https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart";
let url_obj = new URL(url);
let id = url_obj.searchParams.get("id");
let img = url_obj.searchParams.get("img");
let heading = url_obj.searchParams.get("heading");
let price = url_obj.searchParams.get("price");
let description = url_obj.searchParams.get("description");
let discount = document.querySelector("#discount");
let persantage = document.querySelector("#persentage");
let number = (parseInt(price) / (parseInt(price) + 500)) * 100;
let number_rounded = number.toFixed();
document.querySelector("#image").src = img;
document.querySelector("#title").innerHTML = heading;
document.querySelector("#price").innerHTML = price;
document.querySelector("#discount").innerHTML = parseInt(price) + 500;
document.querySelector("#persentage").innerHTML = number_rounded;
document.querySelector("#description").innerHTML = description;
if (document.querySelector("#title").innerHTML == "") {
  document.querySelector(
    "main"
  ).innerHTML = `<h1 class="text-center p-5 text-danger">Not Available</h1>`;
}
fetch(json_url)
  .then((res) => res.json())
  .then((data) => {
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

document.querySelector("#buy").addEventListener("click", () => {
  let imgdata = document.querySelector("#image").src;
  let titledata = document.querySelector("#title").innerHTML;
  let pricedata = document.querySelector("#price").innerHTML;

  fetch(json_url)
    .then((res) => res.json())
    .then((data) => {
      var main = [];
      function checking() {
        for (i in data) {
          if (data[i].title == titledata) {
            main = data[i];
            console.log(main);
            return true;
          }
        }
      }

      if (checking() == true) {
        main.quantity = parseInt(main.quantity) + 1;
        fetch(
          `https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart/${main.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(main),
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        fetch(json_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: imgdata,
            title: titledata,
            price: pricedata,
            quantity: 1,
          }),
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
});
setTimeout(() => {
  document.querySelector("#spinloader").style.display = "none";
}, 3000);
