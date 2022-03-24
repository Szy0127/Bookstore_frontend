import React from 'react';
import {Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
                <Form {...layout} className="userinfo" ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Link
                            to = "/home"
                        >
                            <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Link>
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
        );
    }
}


export default RegisterForm;
