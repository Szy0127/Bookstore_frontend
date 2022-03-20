import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Checkbox, Form, Input, Radio} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

const Login = () =>
    <React.Fragment>
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
    </React.Fragment>

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={admin:false};
        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(e){
        this.setState({admin:e.target.value==="admin"});
    }

    submit(){
        let components = [];
        if(!this.state.admin){
            components.push(
                <Form.Item>

                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
            )
        }
        const to = this.state.admin? "/admin":"/home";
        components.push(
            <Form.Item>
                <Link
                    to={to}
                >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Link>
            </Form.Item>
        )
        if(!this.state.admin){
            components.push(
                <a href="">Or register now!</a>
            )
        }
        return components;
    }
    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                    'radio-group':'user'
                }}
            >
                <Form.Item name="radio-group">
                    <Radio.Group onChange={this.handleUser}>
                        <Radio value="user">用户</Radio>
                        <Radio value="admin">管理员</Radio>
                    </Radio.Group>
                </Form.Item>
                <Login/>
                {this.submit()}
            </Form>
        );
    }
}


export default LoginForm;
