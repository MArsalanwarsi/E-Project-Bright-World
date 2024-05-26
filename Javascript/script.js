let username = sessionStorage.getItem("username");
let login_data = document.querySelector("#login_data");
if (username == null) {
  login_data.innerHTML = `<button type="button" class="btn btn-outline-success w-auto" id="sign_in">Sign in <i class="bi bi-box-arrow-in-right"></i></button>`;
  let sign_in = document.querySelector("#sign_in");
  sign_in.addEventListener("click", () => {
    window.location.assign("Login and Register/login.html");
  });
} else {
  login_data.innerHTML = `<h6>Welcome: <i><span id="login_user" class="h5">${username}</span></i></h6>
                <button type="button" class="btn btn-danger w-100" id="logout">Logout <i class="bi bi-box-arrow-right"></i></button>
               </div>`;
  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    sessionStorage.removeItem("username");
    window.location.reload();
  });
}
let color_change_img = document.querySelector("#color_change_img");
document.querySelector(".box1").addEventListener("click", () => {
  color_change_img.src = "/Images/color_change_slider/slider2.webp";
});
document.querySelector(".box2").addEventListener("click", () => {
  color_change_img.src = "/Images/color_change_slider/slider1.webp";
});
document.querySelector(".box3").addEventListener("click", () => {
  color_change_img.src = "/Images/color_change_slider/slider3.webp";
});
// owl slider

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    center: true,
    margin: 15,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    URLhashListener: true,
    startPosition: "URLHash",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });
});

//  add to cart
let json_url =
  "https://663647d4415f4e1a5e26de9c.mockapi.io/E-Project/Addtocart";
fetch(json_url)
  .then((res) => res.json())
  .then((data) => {
    var cartcount = 0;
    for (i in data) {
      var quantity = parseInt(data[i].quantity);
      cartcount = cartcount + quantity;
    }
    document.querySelector(".cartcounting").innerHTML = cartcount;

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
}, 3000);
