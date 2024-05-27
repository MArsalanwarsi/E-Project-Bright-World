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
    alert("Please enter a pakistani mobile number (+920000000000) without spaces");
    return false;
  }
  if (!addressinput.value.match(/[A-z0-9\W]/)) {
    alert("Please enter a Valid Address");
    return false;
  }
  if (!addressinput.value.match(/[A-z]/)) {
    alert("Please write a message using Alphabets Only");
    return false;
  }
  alert("Your message has been sent successfully");
 window.location.reload()
  return false;
});
