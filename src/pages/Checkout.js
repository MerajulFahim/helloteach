import React from "react";
import { CartContext } from '../context/cart';
import {UserContext} from '../context/user';
import {useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import {CardElement,StripeProvider,Elements,injectStripe} from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';


function Checkout(props) {

  const {cart,total,clearCart}=React.useContext(CartContext);
  const {user,showAlert,hideAlert,alert}=React.useContext(UserContext);
  const history=useHistory();
  //state values

  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const isEmpty=!name|| alert.show;
  async function handleSubmit(e){
    e.preventDefault();
    showAlert({msg:'submitting order please wait...'});
    const response=await props.stripe.createToken().catch(error=>console.log(error));
    const {token}=response;
    console.log(response);
    if (token){
      setError('');
      const {id}=token;
      let order=await submitOrder({name:name,
      total:total,
      items:cart,
      stripeTokenId:id,
      userToken:user.token
    })
    if (order){
      showAlert({msg:'your order is complete'});
      clearCart();
      history.push('/');
      return

    }
    else{
      showAlert({msg:'there was an error with your order.please try again',
    type:'danger'})
    }

    
    }
    
    else{
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.lenght<1) return <EmptyCart/>;
  return <section className="section form">
  <h2 className="section-title">Checkout</h2>
  <form className="checkout-form">
    <h3>order total: <span>${total}</span></h3>
    {/* single input */}
    <div className="form-control">
      <label htmlFor="name">name</label>
      <input type='text' 
      id='name' 
      value={name}
      onChange={(e)=>{setName(e.target.value);}}
      />
    {/* card elements */}
    <div className="stripe-input">
      <label htmlFor="card-elements">
      credit or debit card</label>
      <p className="stripe-info">
        Test using this card:
        <span> 4242 4242 4242 4242</span> <br/>
        enter any 5 digit for ZIP code <br/>
        enter any 3 digit for CVC
      </p>

    {/* stripe card elements */}
    <CardElement className='card-element'/>
    {/* stripe elements */}
    {/* stripe error */}
    {error && <p className='form-empty'>
      {error}
    </p>}
    {/* empty value */}
    {isEmpty? <p className="form-empty">
      please fill out name field
    </p>
    :<button className="btn btn-primary btn-block" 
    onClick={handleSubmit}
    type="submit">
      submit
    </button>}
    
    

    </div>
    </div>
  </form>

  </section>
}


const CardForm=injectStripe(Checkout);
const StripeWrapper=()=>{
  return (
    <StripeProvider apiKey="pk_test_8R7QSnJmUja7ImftfQIy1udQ00rRftsCrV">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;