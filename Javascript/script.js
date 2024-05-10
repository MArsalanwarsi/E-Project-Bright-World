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
