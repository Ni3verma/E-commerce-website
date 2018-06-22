function fetchProducts(done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}


function createProductCard(product) {
    return $(
        `
            <div class="card mx-3 shadow-sm p-3 mb-5 bg-white rounded float-left" style="width: 18rem;">
                <img class="card-img-top" src="bg.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center">${product.name}</h5>
                    <a href="#" class="btn btn-primary d-flex justify-content-center" id="${product.id}">Add to Cart</a>
                    <p class="text-right mt-2">Rs. ${product.price}</p>
                </div>
            </div>
        `
    )
}

function addProduct(name,price,done){
    $.post('/api/products',{
        name:name,
        price:price
    },function (data){
        done(data)
    })
}