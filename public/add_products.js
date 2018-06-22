$(function(){
    let name=$('#productName')
    let price=$('#productPrice')

    $('#btnAddProduct').click(function(){
        addProduct(
            name.val(),
            price.val(),
            function(addedProduct){
                console.log('product added:'+addedProduct.name)
            })
    })
})