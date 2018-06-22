let mCart = []
var cartTotalValue=0
$(function () {
    let cartList = $('#my_cart_list')
    

    let uid = sessionStorage.getItem('uid')

    $.get('/api/cart/getPid',
        { userid: uid },
        function (pList) {
            //console.log(pList)
            
            for (product of pList) {
                let pid = product.pid
                let count = product.count

                $.get('/api/products/getProductWithId', { prodId: pid }, function (data) {
                    //console.log(data[0])
                    mCart.push({ pName: data[0].name, pPrice: data[0].price, qty: count })
                    let total=data[0].price*count
                    
                    let cartTotal=document.getElementById('cart_total')
                    cartTotalValue = +cartTotalValue + +total
                    cartTotal.innerText='Total = '+cartTotalValue
                    console.log(cartTotalValue);
                    
                    cartList.append(
                        $(
                            `
                                <div class="card mx-3 my-2 shadow-lg bg-white rounded float-left" style="width: 18rem;height:15rem; background-image:url('bg_cart_item.jpg');">
                                    <div class="card-body">
                                        <h2 class="card-title text-center">${data[0].name}</h2>
                                        <p class="text-left mt-2">Price : Rs.${data[0].price}</p>
                                        <p class="text-left mt-2">Quantity : ${count}</p>
                                        <p class="text-left mt-2">Total : ${total}</p>
                                    </div>
                                </div>
                            `
                        )
                    ) 
                })
            }
        }
    )
})