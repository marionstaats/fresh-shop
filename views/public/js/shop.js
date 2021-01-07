const addButton = document.getElementsById('carrots');

addButton.addEventListener('click',(e) =>{
    e.preventDefault();

    fetch('/add-to-cart', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({itemName: 'carrots', itemPrice: 10})})
        .then(function(response) {
                if(response.ok) {
                    console.log('Click was recorded');
                    return;
                }
        })
        .catch((error) => {
            console.log(error);
        });

})