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

let url = location.href;
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

document.querySelector("#buy").addEventListener("click", () => {
  let imgdata = document.querySelector("#image").src;
  let titledata = document.querySelector("#title").innerHTML;
  let pricedata = document.querySelector("#price").innerHTML;
  let url = "https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var main = [];
      function checking() {
        for (i in data) {
          if (data[i].title == titledata) {
            main = data[i];
            console.log(main)
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
      } else {
        fetch(url, {
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
      }
    });
});
