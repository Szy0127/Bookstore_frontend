import { Form, Input, Button, Select } from 'antd';
import React from "react";

const { Option } = Select;
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

export class Security extends React.Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem("user"));
        this.formRef = React.createRef();
    }

    onFinish = (values) => {
        console.log(values);
    };
    onReset = () => {
        this.formRef.current.resetFields();
    };

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
                    <Input defaultValue={this.user.username}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="旧密码"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="newpassword"
                    label="新密码"
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="手机"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                   <Input/>
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}