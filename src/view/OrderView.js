import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {OrderList} from "../components/OrderList";
import '../css/order.css'
import {getOrder} from "../service/UserService";
import {MyMenu} from "../components/Menu";

class OrderView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {show: 0,orders:[]};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getOrder(
            (data) => {
                data.reverse();
                this.setState({orders: data})
            }
        );
    }

    handleChange(key) {
        this.setState({show: key});
    }

    getSelectOrders(){
        // eslint-disable-next-line default-case
        switch (parseInt(this.state.show)){
            case 0:
                return this.state.orders;
            case 1:case 2:case 3:case 4:
                let orders = [];
                for(let o of this.state.orders){
                    if(parseInt(o['phase'])=== parseInt(this.state.show)){
                        orders.push(o);
                    }
                }
                return orders;
        }
        return [];
    }


    render() {
        const types = ['所有订单', '待付款', '待发货', '待收货', '待评价'];

        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <MyMenu types={types} handleChange={this.handleChange}/>
                    <OrderList orders={this.getSelectOrders()}/>
                </div>
            </Layout>
        );
    }
}


export default OrderView;