let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let temp;
//console.log(title, price, taxes, ads, discound, total, count, category, submit);
//get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discound.value;
    total.innerHTML = result;
    total.style.background = `#040`;
  } else {
    total.innerHTML = ``;
    total.style.background = `rgb(235, 68, 68)`;
  }
}
//save localstorge
//create product
let datapro = [];
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
//save localstorge
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (i = 0; i < count.value; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    cleanData();
  }

  localStorage.setItem("product", JSON.stringify(datapro));

  showdata();
};

//clear inputs
function cleanData() {
  title.value = "";
  taxes.value = "";
  ads.value = "";
  price.value = "";
  discound.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
//read in table

function showdata() {
  getTotal();
  let table = " ";
  for (let i = 0; i < datapro.length; i++) {
    table += ` 
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discound}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateDate(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnall = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btnall.innerHTML = `<button onclick="deleteAll()">delete All(${datapro.length})</button>`;
  } else {
    btnall.innerHTML = "";
  }
}
showdata();
//count

//delete
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
function deleteAll() {
  datapro.splice(0);
  localStorage.clear();
  showdata();
}
//update
function UpdateDate(i) {
  title.value = datapro[i].title;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  price.value = datapro[i].price;
  discound.value = datapro[i].discound;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getsreach(id) {
  let search = document.getElementById("searchinput");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "seatch by " + searchMood;
  search.focus();
  search.value = "";
  showdata();
}

function searchDate(value) {
  let table = "";
  for (i = 0; i < datapro.length; i++) {
    if ((searchMood = "title")) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += ` 
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discound}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateDate(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += ` 
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discound}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateDate(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data
