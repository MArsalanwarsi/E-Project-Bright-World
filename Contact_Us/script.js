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
};

let submitbtn = document.querySelector(".submitbtn");
let nameinput = document.querySelector(".nameinput");
let emailinput = document.querySelector(".emailinput");
let numberinput = document.querySelector(".numberinput");
let message = document.querySelector(".messageinput");
let addressinput = document.querySelector(".addressinput");

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();
});
