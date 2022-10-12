import React from 'react';
import '../css/bootstrap.min.css'
import '../css/cart.css'
import {Layout, message} from 'antd'
import {CartList} from "../components/CartList";
import {HeaderInfo} from "../components/HeaderInfo";
import {checkSession} from "../service/UserService";
// import {getCart} from "../service/UserService";
import {history} from "../utils/history";
import {ws_url} from "../service/BookService";
class CartView extends React.Component {

    constructor(props) {
        super(props);
        // this.state={fresh:false};
    }

    componentDidMount() {
        // getCart(localStorage.getItem("userID"),localStorage.getItem("password"),(data)=>this.setState({cart:data}));
        checkSession((succuss)=>{
            if(!succuss){
                history.push("/login");
                history.go();
            }
        })
        let user = JSON.parse(localStorage.getItem('user'));

        let socket = new WebSocket(ws_url+user.userID);

        socket.onopen = function () {
            console.log("websocket open");
            //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        socket.onmessage =  (msg)=> {
            console.log("websocket message:",msg.data);
            let m = JSON.parse(msg.data);
            if(m.success){
                message.success(m.msg);
                // 小bug 购物车状态其实更新了 但是这里改变state并不会刷新 需要手动刷新
                // this.setState({fresh: !this.state.fresh});
            }else{
                message.error(m.msg);
            }

        };
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
