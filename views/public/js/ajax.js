//Create product database (need only once)
// if (document.URL === "http://localhost:3000/shop") {
//     const nameArray = document.getElementsByTagName("h4");
//     const priceArray = document.getElementsByTagName("h5");
//     const imageArray = document.getElementsByClassName('img-fluid');

//     for(i=0;i<9;i++){
//         fetch('/create-product-db', {
//             method: 'POST', 
//             headers: {'Content-Type': 'application/json'}, 
//             body: JSON.stringify({
//                 name: (nameArray[i].innerText), 
//                 price: (priceArray[i].innerHTML.slice(2)), 
//                 image: imageArray[i].getAttribute('src')
//             })
//         })

//     }
// }

////////////////////////////////////////////////////////////
//GENERAL FUNCTIONS WHOLE WEBSITE
////////////////////////////////////////////////////////////////

//Newsletter
const newsletterButton = document.getElementById("newsletterButton");
newsletterButton.addEventListener("click",(e)=>{
    let newsletterEmail = document.getElementById("newsletterEmail").value;
    fetch('/newsletter', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
            email: newsletterEmail
        })
    })
})


//Get cart data and/or create new cart for session
fetch('/get-cart', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}
})
    .then(response => response.json())
    .then(data => {
        itemArray = data.items;
        totalAmount = data.totalAmount;
        totalPrice = data.totalPrice;
        createVisual (itemArray, totalAmount,totalPrice)
        shopButtons(itemArray,totalAmount);
    })    


//Create sidebar cart
function createVisual (itemArray, totalAmount, totalPrice) {

    //Create sidebar for each item
    itemArray.forEach(item => {

    //If element already exist - replace to update number
    if (document.getElementById(`${item.itemName}-side`)){
        document.getElementById(`${item.itemName}-side`).innerHTML = 
        `<a href="#" class="photo"><img src="${item.itemImage}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${item.itemName}</a></h6>
        <p>${item.itemAmount}x - <span class="price">$${(item.subTotal).toFixed(2)}</span></p>`    
    } else { //Otherwise create new list item
        newList = document.createElement("LI");
        newList.setAttribute('id', `${item.itemName}-side`);
        newList.innerHTML = 
        `<a href="#" class="photo"><img src="${item.itemImage}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${item.itemName}</a></h6>
        <p>${item.itemAmount}x - <span class="price">$${item.subTotal}</span></p>`;
        let parent = document.getElementById("sidebar-cart");
        parent.insertBefore(newList, parent.firstChild);    
    }

    })
    //Show total price
    document.getElementById("totalPrice").innerHTML = `<strong>Total</strong> $${totalPrice.toFixed(2)}`;

    //Show number of items in icon cart
    document.getElementById("cartBadge").innerText = totalAmount;

}


//Make the shop buttons work on each click
function shopButtons(itemArray,totalAmount){

    //Update cart with each click on an item
    document.querySelectorAll('.cart').forEach(element => {
        let count = 0;
        let price;
        let image;
        //On button click
        element.addEventListener('click', function(e){
            e.preventDefault();
            totalAmount++
            //Show number of items in icon cart
            document.getElementById("cartBadge").innerText = totalAmount;

            let itemName = element.getAttribute('id');

            //Check if fruit already in array - if not add, if yes replace
            let index = itemArray.findIndex(it => Object.values(it)[0] === itemName);
            if (index === -1) {
                count++

                //Get item details (price+pic)
                fetch('/get-item-details', {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        itemName: itemName,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        price = data.price;
                        image = data.image;
                        subTotal = (price*count);
                        totalPrice = 0;
                        itemArray.push({itemName: itemName, itemAmount: count, itemImage: image, subTotal: subTotal});
                        itemArray.forEach(item =>{
                            totalPrice += item.subTotal
                        })

                        createVisual(itemArray, totalAmount, totalPrice);
                        updateCartDatabase(itemArray,totalAmount,totalPrice);
                    })
                
            } else {
                price = (itemArray[index].subTotal) / (itemArray[index].itemAmount)
                itemAmount = itemArray[index].itemAmount+1
                image = itemArray[index].itemImage
                subTotal = (price*itemAmount);
                totalPrice = 0;
                itemArray[index] = {itemName: itemName, itemAmount: itemAmount, itemImage: image, subTotal: subTotal};
                itemArray.forEach(item =>{
                    totalPrice += item.subTotal
                })

                createVisual(itemArray, totalAmount, totalPrice);
                updateCartDatabase(itemArray,totalAmount,totalPrice);
            }

            
        })
    })
}


//Fetch to update the database
function updateCartDatabase(itemArray,totalAmount,totalPrice){
    fetch('/add-to-cart', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
            items: itemArray,
            totalAmount: totalAmount,
            totalPrice: totalPrice.toFixed(2)
        })
    })    
}


////////////////////////////////////////
//Cart
///////////////////////////////////////
if (document.URL === "http://localhost:3000/cart") {

    fetch('/get-cart', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(data => {
            itemArray = data.items;
            totalAmount = data.totalAmount;
            totalPrice = data.totalPrice;
            createVisualCart (itemArray,totalPrice);
            cartRemoveButton(itemArray);
            cartIncrement(itemArray)
        })    

    function createVisualCart(itemArray,totalPrice){
        //Total and subtotal price
        document.getElementById("cartTotal").innerHTML = `$ ${totalPrice.toFixed(2)}`;
        document.getElementById("cartSubtotal").innerHTML = `$ ${totalPrice.toFixed(2)}`;
        //Create itembars
        itemArray.forEach(item=>{
            let fruit = document.createElement("tr")
            fruit.setAttribute("class", "cartItemBlock");
            fruit.setAttribute("id", `cartItem${item.itemName}`);
            fruit.innerHTML =
            
            `<td class="thumbnail-img">
                <a href="#">
            <img class="img-fluid" src="${item.itemImage}" alt="${item.itemName}" />
            </a>
            </td>
            <td class="name-pr">
                <a href="#">
            ${item.itemName}
            </a>
            </td>
            <td class="price-pr">
                <p>$ ${((item.subTotal)/(item.itemAmount)).toFixed(2)}</p>
            </td>
            <td class="quantity-box"><input type="number" size="4" value="${item.itemAmount}" min="0" step="1" id="${item.itemName}" class="cartIncrement" c-input-text qty text"></td>
            <td class="total-pr">
                <p>$ ${(item.subTotal).toFixed(2)}</p>
            </td>
            <td class="remove-pr">
                <a class="removeButton" id="${item.itemName}">
            <i class="fas fa-times"></i>
            </a>
            </td>`

            document.getElementById("cartItemBlock").appendChild(fruit)


        })
    }

    //Increment item number
    function cartIncrement(itemArray){
        document.getElementById("updateCartButton").addEventListener("click", (e)=>{
            e.preventDefault();

            document.querySelectorAll(".cartIncrement").forEach(element=>{
                //Find element and change amount and subtotal
                let itemName = element.getAttribute('id');
                let index = itemArray.findIndex(it => Object.values(it)[0] == itemName);
                itemArray[index].subTotal = ((itemArray[index].subTotal)/(itemArray[index].itemAmount)) * Number(element.value);
                itemArray[index].itemAmount = Number(element.value);
            })

            //Recalculate new total price
            totalPrice = 0;
            itemArray.forEach(item => {
                totalPrice += item.subTotal;
            });

            //Recalculate new total amount
            totalAmount = 0;
            itemArray.forEach(item => {
                totalAmount += item.itemAmount;
            });

            //Show new number of items in icon cart
            document.getElementById("cartBadge").innerText = totalAmount;

            //Remove all items from the cart (recreate after)
            document.getElementById("cartItemBlock").innerHTML = "";

            updateCartDatabase(itemArray, totalAmount, totalPrice);
            createVisualCart(itemArray, totalPrice);
            cartRemoveButton(itemArray);
            cartIncrement(itemArray);

        })

    }

    //Buttons in list of items
    function cartRemoveButton(itemArray) {
        document.querySelectorAll(".removeButton").forEach(element => {
            element.addEventListener("click", (e) => {
                    e.preventDefault();
                    //Find element and remove from array
                    let itemName = element.getAttribute('id');
                    let index = itemArray.findIndex(it => Object.values(it)[0] == itemName);
                    if (index !== -1) {
                        itemArray.splice(index, 1);
                    }
                    //Recalculate new total price
                    totalPrice = 0;
                    itemArray.forEach(item => {
                        totalPrice += item.subTotal;
                    });

                    //Recalculate new total amount
                    totalAmount = 0;
                    itemArray.forEach(item => {
                        totalAmount += item.itemAmount;
                    });

                    //Show new number of items in icon cart
                    document.getElementById("cartBadge").innerText = totalAmount;

                    //Remove all items from the cart (recreate after)
                    document.getElementById("cartItemBlock").innerHTML = "";

                    updateCartDatabase(itemArray, totalAmount, totalPrice);
                    createVisualCart(itemArray, totalPrice);
                    cartRemoveButton(itemArray)
                })
        })
    }
}


