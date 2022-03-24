import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {OrderList} from "../components/OrderList";
import '../css/order.css'
import {getOrder} from "../service/BookService";
import {MyMenu} from "../components/Menu";

class OrderView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {show: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key) {
        this.setState({show: key});
    }


    render() {
        const types = ['所有订单', '待付款', '待发货', '待收货', '待评价'];

        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <MyMenu types={types} handleChange={this.handleChange}/>
                    <OrderList orders={getOrder(this.state.show)}/>
                </div>
            </Layout>
        );
    }
}


export default OrderView;