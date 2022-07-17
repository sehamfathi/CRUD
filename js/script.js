/** selecting the elements* */
var productInputName = document.getElementById("productInputName");
var productInputPrice = document.getElementById("productInputPrice");
var productInputCategory = document.getElementById("productInputCategory");
var productInputDescription = document.getElementById(
  "productInputDescription"
);
var tableData = document.getElementById("tableData");
var btnAdd = document.getElementById("btnAdd");
var inputs = document.getElementsByTagName("input");

/** Variables */
var product;
var products;
var tempIndex = 0;
if (localStorage.getItem("myproducts") != null) {
  products = JSON.parse(localStorage.getItem("myproducts"));
} else {
  products = [];
}
/* functions */
// 1. add product
function addProduct() {
  if (valitionProuductName()) {
    product = {
      name: productInputName.value,
      price: productInputPrice.value,
      category: productInputCategory.value,
      desription: productInputDescription.value,
    };

    if (btnAdd.innerHTML == "Add Product") {
      products.push(product);
      localStorage.setItem("myproducts", JSON.stringify(products));
    } else {
      updateProduct(tempIndex);
      btnAdd.innerHTML = "Add Product";
    }

    displayProduct(products);
    clearForm();
  } else {
  }
}
document.onload = displayProduct(products);
// 2.function to clear the form
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  btnAdd.innerHTML = "Add Product";
}

function displayProduct(productList) {
  var container = "";
  for (var i = 0; i < productList.length; i++) {
    container += `  <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].desription}</td>
    <td> <button Onclick="getProductInfo(${i})" class="btn btn-sm btn-outline-warning  "><i class="fa-solid fa-pen-to-square"></i></button></td>
    <td> <button  Onclick="deleteProduct(${i})" class="btn btn-sm  btn-outline-danger  "><i class="fa-solid fa-trash-can"></i></button></td>

    </tr>`;
  }
  tableData.innerHTML = container;
}

// 4.function to delete products
function deleteProduct(index) {
  products.splice(index, 1);

  displayProduct(products);
}

//5.function to get information and display it into yhe form products
function getProductInfo(index) {
  productInputName.value = products[index].name;
  productInputPrice.value = products[index].price;
  productInputCategory.value = products[index].category;
  productInputDescription.value = products[index].desription;
  window.scroll({ top: 0, behavior: "smooth" });
  btnAdd.innerHTML = "update product";
  tempIndex = index;
}

//6. actual upadte
function updateProduct() {
  products[tempIndex] = product;
}
// 7.search

function searchProduct(searchText) {
  var searchProducts = [];
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().includes(searchText.toLowerCase()) == true
    ) {
      searchProducts.push(products[i]);
    }
  }
  /**/
  var container = "";
  for (var i = 0; i < searchProducts.length; i++) {
    console.log("iam o", searchProducts[i].name);
    var pattern = new RegExp(`${searchText}`, "gi");

    container += `  <td>${i + 1}</td>
   
        <td>${searchProducts[i].name.replace(
          pattern,
          (match) => `<span class=bg-warning >${match}</span>`
        )}</td>
        <td>${searchProducts[i].price}</td>
        <td>${searchProducts[i].category}</td>
        <td>${searchProducts[i].desription}</td>
        <td> <button Onclick="getProductInfo(${i})" class="btn btn-sm btn-outline-warning  "><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td> <button  Onclick="deleteProduct(${i})" class="btn btn-sm  btn-outline-danger  "><i class="fa-solid fa-trash-can"></i></button></td>
    
        </tr>`;
  }
  tableData.innerHTML = container;
}

// 7.function valition
// must start with capitail letter and next 3 or 8 ccharchter
function valitionProuductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productInputName.value)) {
    productInputName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    productInputName.classList.add("is-invalid");
    return false;
  }
}

console.log("performanc is", performance.now());
