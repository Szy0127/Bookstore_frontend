import React from 'react';
import '../css/bootstrap.min.css'
import '../css/cart.css'
import {Layout} from 'antd'
import {CartList} from "../components/CartList";
import {HeaderInfo} from "../components/HeaderInfo";
// import {getCart} from "../service/UserService";
class CartView extends React.Component {

    constructor(props) {
        super(props);
        // this.state={cart:null};
    }

    componentDidMount() {
        // getCart(localStorage.getItem("userID"),localStorage.getItem("password"),(data)=>this.setState({cart:data}));
    }

    render() {
        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    {/*<CartList cart={this.state.cart}/>*/}
                    <CartList/>
                </div>
            </Layout>


        );
    }
}

export default CartView;