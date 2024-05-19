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
    let url_obj = new URL(url);
    var product_id = url_obj.searchParams.get("id");
    var data = "";
    let keys = Object.keys(json);
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
                           }&img=${json[keys[i]][y].img}&heading=${
            json[keys[i]][y].heading
          }&price=${json[keys[i]][y].price}&description=${
            json[keys[i]][y].mdes
          }" role="button" class="btn btn-outline-success"><i class="bi bi-globe2"></i> Learn More</a>
                        </div>
                       </div>
                    </div> `;
        }
      }
    }
    document.getElementById("product_data").innerHTML = data;
    document.querySelector("#current_page").innerHTML=product_id;
    let prev_page = document.querySelector("#prev_page");
    if (
      product_id == "phillips_indoor_downlight" ||
      product_id == "phillips_indoor_surfacemounted" ||
      product_id == "phillips_indoor_suspended"
    ) {
      prev_page.innerHTML = "Philips_indoor";
    }
    if (
      product_id == "phillips_outdoor_roadandstreet" ||
      product_id == "phillips_outdoor_sportandflood" ||
      product_id == "phillips_outdoor_urban"
    ) {
      prev_page.innerHTML = "Philips_outdoor";
    }
    if (
      product_id == "phillips_lamps_ledtube" ||
      product_id == "phillips_lamps_ledbulb" ||
      product_id == "phillips_lamps_ledbulb"
    ) {
      prev_page.innerHTML = "Philips_lamp";
    }
    if (
      product_id == "feit_downlights_smart" ||
      product_id == "feit_downlights_canless" ||
      product_id == "feit_downlights_adjustable"
    ) {
      prev_page.innerHTML = "feit_downlights";
    }
    if (
      product_id == "feit_string_smart" ||
      product_id == "feit_string_fairy" ||
      product_id == "feit_string_led"
    ) {
      prev_page.innerHTML = "feit_string";
    }
    if (
      product_id == "feit_fixtures_security" ||
      product_id == "feit_fixtures_flatpanel" ||
      product_id == "feit_fixtures_bath"
    ) {
      prev_page.innerHTML = "feit_fixtures";
    }
    if (
      product_id == "vorlane_downlight_spotdownlight" ||
      product_id == "vorlane_downlight_cobled" ||
      product_id == "vorlane_downlight_downlightbulb"
    ) {
      prev_page.innerHTML = "vorlane_downlight";
    }
    if (
      product_id == "vorlane_strip_linear" ||
      product_id == "vorlane_strip_smart" ||
      product_id == "vorlane_strip_recessed"
    ) {
      prev_page.innerHTML = "vorlane_strip";
    }
    if (
      product_id == "vorlane_flood_solar" ||
      product_id == "vorlane_flood_motion" ||
      product_id == "vorlane_flood_security"
    ) {
      prev_page.innerHTML = "vorlane_flood";
    }
  });
