import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import '../css/admin.css'
import {getOrder} from "../service/BookService";
import {SubMenu} from "../components/Menu";
import {BookManagement} from "../components/BookManagement";
class AdminView extends React.Component {


    constructor(props) {
        super(props);
        this.state={show:0}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key){
        this.setState({show:key});
    }



    render() {
        const types = ['书籍管理', '用户管理','订单管理','统计'];
        const contents = [<BookManagement/>];
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


export default AdminView;