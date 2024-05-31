let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
console.log(title, price, taxes, ads, discound, total, count, category, submit);
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
//create product
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

let datapro = [];
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  datapro.push(newpro);
  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(datapro);
};

//save localstorge
//clear inputs
//read in table
//count
//delete
//update
//search
//clean data
