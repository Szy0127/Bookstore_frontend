import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Checkbox, Form, Input, Radio} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {login} from "../service/UserService";
import {message} from 'antd';

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

export function LoginForm(props){


    const [admin,setAdmin] = useState(false);
    const [form] = Form.useForm();
    const handleSubmit = (data)=>{
        login(data);
    };

    const handleUser = (e)=>{
        setAdmin(e.target.value==="admin");
    }

    const submit = ()=>{
        let components = [];
        if(!admin){
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
        // const to = admin? "/admin":"/home";
        components.push(
            <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
            </Form.Item>
        )
        if(!admin){
            components.push(
                <a href="/register">Or register now!</a>
            )
        }
        return components;
    }
        return (

            <Form
                onFinish={handleSubmit}
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                    'auth':'user'
                }}
            >
                <Form.Item name="auth">
                    <Radio.Group onChange={handleUser}>
                        <Radio value="user">用户</Radio>
                        <Radio value="admin">管理员</Radio>
                    </Radio.Group>
                </Form.Item>
                <Login/>
                {submit()}
            </Form>
        );
}

