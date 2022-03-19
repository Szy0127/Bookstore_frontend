import React from 'react';
import '../css/bootstrap.min.css'
import '../css/profile.css'
import {Layout, Menu} from 'antd'

import {HeaderInfo} from "../components/HeaderInfo";
import {UserInfo} from "../components/UserInfo";
import {Security} from "../components/Security";
import {Address} from "../components/Address";


class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show:0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log(e.key);
        this.setState({show: e.key});
    }

    menu() {
        const types = ['个人资料', '安全设置', '支付宝绑定', '收货地址', '关于网站'];
        const menuItems = [];
        for (let i in types) {
            menuItems.push(
                <Menu.Item key={i}>{types[i]}</Menu.Item>
            )
        }
        return (
            <Menu className="profile_menu"
                  onClick={this.handleChange}
                  defaultSelectedKeys={['0']}
                  mode="inline"
            >
                {menuItems}
            </Menu>
        )
    }
    content() {
        switch (parseInt(this.state.show)){
            case 0:
                return (
                    <UserInfo/>
                )
            case 1:
                return (
                    <Security/>
                )
            case 2:
                return(
                    <h3>
                        已绑定支付宝账户：135****4790
                    </h3>
                )
            case 3:
                return(
                    <Address/>
                )
            case 4:
                return(
                    <p>
                        copyright©szy
                    </p>
                )
        }

    }
    render() {

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

export default ProfileView;