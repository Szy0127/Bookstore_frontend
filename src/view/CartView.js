import React from 'react';
import '../css/bootstrap.min.css'
import '../css/cart.css'
import {Layout} from 'antd'
import {CartList} from "../components/CartList";
import {HeaderInfo} from "../components/HeaderInfo";
import {getCart} from "../service/BookService";

class CartView extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <CartList carts={getCart()}/>
                </div>
            </Layout>


        );
    }
}

export default CartView;