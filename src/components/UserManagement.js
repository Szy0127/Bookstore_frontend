import {Layout, Table, Button} from "antd";
import {getUsers} from "../service/UserService";
import React from "react";

export class UserManagement extends React.Component {

    constructor(props) {
        super(props);
        const users = getUsers();
        this.state = {users:users};
    }

    handleStatus(user){
        let users = this.state.users;
        for(let index in users){
            if(users[index][0]===user['name']){
                if(!users[index][2]){
                    let del = window.confirm("确认禁用此用户吗？");
                    if(!del){
                        return;
                    }
                }
                users[index][2] = !users[index][2];
                break;
            }
        }
        this.setState({users:users});
    }
    render() {
        const dataSource = [];
        for(let user of this.state.users){
            dataSource.push(
                {
                    name:user[0],
                    status:user[2]
                }
            )
        }

        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(status)=>(
                    status?<span style={{color:"red"}}>禁用</span>:<span>正常</span>
                )
            },
            {
                title:'操作',
                render:(user)=>(
                    <Button onClick={this.handleStatus.bind(this,user)}>
                        {user['status']?"解除":"禁用"}
                    </Button>
                )
            }
        ];


        return (
            <Layout>
                <Table dataSource={dataSource} columns={columns}/>
            </Layout>
        )
    }
}