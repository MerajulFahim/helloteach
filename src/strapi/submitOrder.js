// submit order
import axios from 'axios';
import url from '../utils/URL'

async function submitOrder({Name,
    total,
    items,
    stripeTokenID,
    userToken}){
        const response= await axios.post(`${url}/orders`,
        {Name,
        total,
        items,
        stripeTokenID
        },
        {
        headers:{
        Authorization:`Bearer ${userToken}`
        }
        })
        .catch(error=>console.log(error));
        return response;
    }

    export default submitOrder;