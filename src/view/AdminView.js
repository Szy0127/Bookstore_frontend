import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import '../css/admin.css'
import {getOrder} from "../service/BookService";
import {MyMenu} from "../components/Menu";
import {BookManagement} from "../components/BookManagement";
import {UserManagement} from "../components/UserManagement";
import {OrderManagement} from "../components/OrderManagement";
import {AdminStatistic} from "../components/AdminStatistic";

class AdminView extends React.Component {


    constructor(props) {
        super(props);
        this.state={show:0}
        this.handleChange = this.handleChange.bind(this);
    }


    render() {
        const types = ['书籍管理', '用户管理','订单管理','统计'];
        const contents = [<BookManagement/>,<UserManagement/>,<OrderManagement type={"admin"}/>,<AdminStatistic type="book"/>,<AdminStatistic type="user"/>];
        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <MyMenu types={types} handleChange={this.handleChange} sub={[3,['图书销售','用户消费']]}/>
                    <Layout>{contents[this.state.show]}</Layout>
                </div>
            </Layout>
    );
    }



    handleChange(key){
        console.log(key);
        this.setState({show:key});
    }
}


export default AdminView;
