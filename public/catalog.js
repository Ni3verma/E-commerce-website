$(function () {
    let productList = $('#product_list')
    fetchProducts(function (products) {
        productList.empty()
        //console.log(products);

        for (product of products) {
            productList.append(createProductCard(product))
        }

        setUpClickListener()
    })

    function setUpClickListener() {
        let aTags = $('a')
        let len = aTags.length

        for (let i = 0; i < len; i++) {
            aTags[i].onclick = function (event) {
                let pid = event.target.id
                let uid = sessionStorage.getItem('uid')

                $.get('/api/cart/addToCart',
                    { uid: uid, pid: pid },
                    function (count) {
                        alert('Item added..!!'+'\nQuantity='+count)
                        //console.log('item count=' + count);
                    }
                )
            }
        }
    }
})
