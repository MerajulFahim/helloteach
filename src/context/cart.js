// cart context
import React from 'react'


function getCartFromLocalStorage(){
    return (localStorage.getItem("cart")?
    JSON.parse(localStorage.getItem("cart")):
    []);
}
const CartContext = React.createContext();
function CartProvider({children}){
const [cart,setCard]=React.useState(getCartFromLocalStorage());
const [total,setTotal]=React.useState(0);
const [cartItems,setCartItems]=React.useState(0);

React.useEffect(()=>{
//local storage
localStorage.setItem("cart",JSON.stringify(cart));


let newCartItems=cart.reduce((total,cartItem)=>{
    return (total +=cartItem.amount);
},0);
setCartItems(newCartItems);
// cart total
let newTotal=cart.reduce((total,cartItem)=>{
    return (total+=(cartItem.amount)*(cartItem.price));
},0);
newTotal=parseFloat(newTotal.toFixed(2));
setTotal(newTotal);

},[cart]);

//remove item
const removeItem=id=>{
    setCard([...cart].filter(
        item=>item.id!==id))
};
//increase amount
const increaseAmount=id=>{
    const newCart=[...cart].map(item=>{
        return item.id===id?
        {...item,amount:item.amount+1}
        :{...item};
    })
    setCard(newCart);
};
const decreaseAmount=(id,amount)=>{
    if (amount===1){
        removeItem(id);
        return;
    }
    else{
        const newCart=[...cart].map(item=>{
        return item.id===id ? 
        {...item,amount:item.amount-1}:{...item};
    });
    setCard(newCart);

    }
};

//add to cart

const addToCart=product=>{
const {id,image,title,price}=product;
const item=[...cart].find(item=>item.id===id);

    if(item){
        increaseAmount(id);
        return;
    }
    else{
        const newItem={id,image,title,price,amount:1};
        const newCart=[...cart,newItem];
        setCard(newCart);
    }
}
//clear cart
const clearCart=()=>{
    setCard([]);
};

    return(
        <CartContext.Provider value={{cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
export {CartContext,CartProvider};
