import React from 'react';
import '../css/bootstrap.min.css'
import '../css/cart.css'
import {Layout} from 'antd'
import {CartList} from "../components/CartList";
import {HeaderInfo} from "../components/HeaderInfo";
import {checkSession} from "../service/UserService";
// import {getCart} from "../service/UserService";
import {history} from "../utils/history";
class CartView extends React.Component {

    constructor(props) {
        super(props);
        // this.state={cart:null};
    }

    componentDidMount() {
        // getCart(localStorage.getItem("userID"),localStorage.getItem("password"),(data)=>this.setState({cart:data}));
        checkSession((succuss)=>{
            if(!succuss){
                history.push("/login");
                history.go();
            }
        })
    }

    render() {
        return (
            <Layout>
                <HeaderInfo navID={1}/>
                <div className='container'>
                    {/*<CartList cart={this.state.cart}/>*/}
                    <CartList/>
                </div>
            </Layout>


        );
    }
}

export default CartView;
