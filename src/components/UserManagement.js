import {Layout, Table, Button} from "antd";
import {getUsers,banUser} from "../service/UserService";
import React from "react";
import {getBook} from "../service/BookService";

export class UserManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users:null};
    }

    componentDidMount() {
        getUsers((data)=>{
                this.setState({users:data});
            }
        );
    }

    handleStatus(ban){
        console.log(ban);
        let users = this.state.users;
        for(let user of users){
            if(user.userID===ban.userID){
                if(!user.ban){
                    let del = window.confirm("确认禁用此用户吗？");
                    if(!del){
                        return;
                    }
                }
                banUser(user.userID);
                user.ban = !user.ban;
                break;
            }
        }
        this.setState({users:users});
    }
    render() {
        const dataSource = [];
        if(!this.state.users){
            return <div/>;
        }
        for(let user of this.state.users){
            dataSource.push(
                {
                    userID:user.userID,
                    name:user.username,
                    status:user.ban
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