import React from 'react';
import '../css/bootstrap.min.css'
import '../css/profile.css'
import {Layout} from 'antd'

import {HeaderInfo} from "../components/HeaderInfo";
import {UserInfo} from "../components/UserInfo";
import {Security} from "../components/Security";
import {Address} from "../components/Address";
import {SubMenu} from "../components/Menu";


const Alipay = ()=>
    <h3>
        已绑定支付宝账户：135****4790
    </h3>
const Website=()=>
    <p>
        copyright©szy
    </p>
class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show:0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key) {
        this.setState({show: key});
    }

    render() {
        const types = ['个人资料', '安全设置', '支付宝绑定', '收货地址', '关于网站'];
        const contents = [<UserInfo/>,<Security/>,<Alipay/>,<Address/>,<Website/>];
        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <SubMenu types={types} handleChange={this.handleChange}/>
                    {contents[this.state.show]}
                </div>
            </Layout>


        );
    }
}

export default ProfileView;