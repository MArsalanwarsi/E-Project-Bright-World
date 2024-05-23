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

let submitbtn = document.querySelector(".submitbtn");
let nameinput = document.querySelector(".nameinput");
let emailinput = document.querySelector(".emailinput");
let numberinput = document.querySelector(".numberinput");
let message = document.querySelector(".messageinput");
let addressinput = document.querySelector(".addressinput");

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nameinput.value == "" ||
    emailinput.value == "" ||
    numberinput.value == "" ||
    message.value == "" ||
    addressinput.value == ""
  ) {
    alert("Please fill all the fields");
    return false;
  }
  if (!nameinput.value.match(/[A-z]/)) {
    alert("Name can only contain letters and spaces");
    return false;
  }
  if (!emailinput.value.match(/[A-z0-9]+[@]+[a-z]{5}[.]+[a-z]{3}/)) {
    alert("Please enter a valid email address");
    return false;
  }
  if (!numberinput.value.match(/[+92][0-9]{12}/)) {
    alert("Please enter a pakistani mobile number (+920000000000");
    return false;
  }
  if (!addressinput.value.match(/[A-z0-9\W]/)) {
    alert("Please enter a Valid Adress");
    return false;
  }
  if (!addressinput.value.match(/[A-z]/)) {
    alert("Please write a message with words");
    return false;
  }

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "mohammadarsalanwarsi@gmail.com",
    Password: "3E291BD3AFB9B35F7EFFE702BB5D972098EF",
    To: "mohammadarsalanwarsi@gmail.com",
    From: emailinput.value,
    Subject: "New Contact Form Enquiry",
    Body:
      "full Name:" +
      nameinput.value +
      "<br> Email:" +
      emailinput.value +
      "<br> Phone no:" +
      numberinput.value +
      "<br> Address:" +
      addressinput.value +
      "<br> Message:" +
      message.value,
  }).then((message) => alert("Form Submit Sucessfully"));
});
