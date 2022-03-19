import React from 'react';
import {Layout, Menu} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {OrderList} from "../components/OrderList";
import '../css/order.css'
import {getOrder} from "../service/BookService";

class OrderView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {show: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({show: e.key});
    }

    menu() {
        const types = ['所有订单', '待付款', '待发货', '待收货', '待评价'];
        const menuItems = [];
        for (let i in types) {
            menuItems.push(
                <Menu.Item key={i}>{types[i]}</Menu.Item>
            )
        }
        return (
            <Menu className="order_menu"
                  onClick={this.handleChange}
                  defaultSelectedKeys={['0']}
                  mode="inline"
            >
                {menuItems}
            </Menu>
        )
    }

    content() {
        return (
                <OrderList orders={getOrder(this.state.show)}/>
        )
    }

    render() {
        console.log(2);
        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    {this.menu()}
                    {this.content()}
                </div>
            </Layout>
        );
    }
}


export default OrderView;