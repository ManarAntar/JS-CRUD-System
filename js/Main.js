var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var productContainer;
var addBtn = document.getElementById("addBtn");
var thisIndex;

//Step 7 : Check if there is already exist objects in array and display it
if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);
} else {
    productContainer = [];
}

addBtn.onclick = function () {
    if (validateProductName() == true) {
        if (addBtn.innerHTML == "Update") {

            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                desc: productDescriptionInput.value
            };
            productContainer.splice(thisIndex, 1, product);

        } else {

            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                desc: productDescriptionInput.value
            };
            productContainer.push(product);
        }


        //Step 6 : Saving in LocalStorage

        localStorage.setItem('myProducts', JSON.stringify(productContainer));

        clearForm();
        displayProducts(productContainer);
    } else {
        alert("ProductName is invalid")
    }
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayProducts(productList) {
    var container = "";
    for (i = 0; i < productList.length; i++) {
        container += `<tr>
     <td class="p-2">${i}</td>
     <td class="p-2">${productList[i].name}</td>
     <td class="p-2">${productList[i].price}</td>
     <td class="p-2">${productList[i].category}</td>
     <td class="p-2">${productList[i].desc}</td>
     <td class="p-2"> 
         <button class="btn btn-outline-warning"onclick="Update(${i})">Update</button>
     </td>
     <td class="p-2">
         <button onclick="deleteProducts(${i})" class="btn btn-outline-danger">Delete</button>
     </td>
 </tr>`;
    }
    document.getElementById("tableBody").innerHTML = container;
}
//Step 7 :Search Products
function searchProducts(searchTerm) {
    var searchResult = [];
    for (i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}

//Step 8 Delete Products
function deleteProducts(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    displayProducts(productContainer);
}


//step 9 Update 
function Update(index) {
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescriptionInput.value = productContainer[index].desc;
    addBtn.innerHTML = "Update";
    thisIndex = index;

}

//Step 10 Validation 
function validateProductName() {

    var regex = /^[A-Z][a-z]{3,8}.[A-Z][a-z]{3,8}?.[0-9]{1,3}?/;
    if (regex.test(productNameInput.value) == true) {
        productNameInput.classList.replace("is-invalid", "is-valid");
        return true;
    } else {

        productNameInput.classList.add("is-invalid");
    }
}