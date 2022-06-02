var gender;
var emailData;

var form = document.getElementById("form");
var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var email = document.getElementById("email");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zip = document.getElementById("zip");
var file = document.getElementById("file");
var addressContainer = document.getElementById("address-box");
var country = document.getElementById("country");
var btn_Submit=document.getElementById('btn-submit')



var btn = document.getElementById("address-btn");

var flag = 0;

btn.addEventListener("click", (e) => {
  if (flag < 1) {
    addressContainer.innerHTML += `

    
        <div class="address-container">
              <input
                type="text"
                id="city-alter"
                placeholder="Please Enter Your city"
              />

              <input type="text" id="state-alter" placeholder="Please Enter state" />

              <input type="text" id="zip-alter" placeholder="Please Enter Your zip" />
          </div>
       
       
       
   `;

    flag++;
  } else {
    // return alert("You  cannot add More address");
  }
});

async function getAdress() {
  const result = await fetch("http://localhost:8000/getData");
  const data = await result.json();

  console.log(data);
  for (let key in data.address) {
    country.innerHTML += `<option value="${data.address[key].name}">${data.address[key].name}</option>`;
  }
  emailData = data.email;
}
getAdress();

function showError(id, msg) {
  id.style.border = "none";
  id.style.outline = "1px solid red";
  id.value = "";

  id.placeholder = `${msg}`;
}
function showSuccess(id, msg) {
  id.style.border = "none";
  id.style.outline = "1px solid green";
}
function feildChacker(field) {
  if (!field.value) {
    var msg = "Please Enter Fields";
    return showError(field, msg);
  } else {
    return showSuccess(field);
  }
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return showSuccess(email);
  }
  var msg = "You have entered an invalid email address!";
  return showError(email, msg);
}

function emailChecker(email) {
  for (var key in emailData) {
    if (emailData[key] == email.value) {
    
    }
  }
}

btn_Submit.addEventListener("click", async function (e) {
  e.preventDefault();
  if (document.getElementById("Male").checked) {
    gender = document.getElementById("Male").value;
  } else {
    gender = document.getElementById("Female").value;
  }
  var zip_alter = document.getElementById("zip-alter");
  var city_alter = document.getElementById("city-alter");
  var state_alter = document.getElementById("state-alter");

  const fd = new FormData();

  fd.append("fName", fName.value);
  fd.append("lName", lName.value);
  fd.append("email", email.value);
  fd.append("gender", gender);
  fd.append("city", city.value);
  fd.append("state", state.value);
  fd.append("zip", zip.value);
  fd.append("file", file.files[0]);
  fd.append("country", country.value);
  if (!zip_alter && !city_alter && !state_alter) {
  } else {
    fd.append("state_alter", state_alter.value);
    fd.append("city_alter", city_alter.value);
    fd.append("zip_alter", zip_alter.value);
  }
  feildChacker(fName);
  feildChacker(lName);
  feildChacker(email);
  ValidateEmail(email);
  feildChacker(city);
  feildChacker(state);
  emailChecker(email);
  feildChacker(zip);
  const res = await fetch("http://localhost:8000/saveuser", {
    method: "POST",
    body: fd,
  });
  data=await res.json();
  console.log(data);
});
