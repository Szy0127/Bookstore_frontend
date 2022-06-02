import { Form, Input, Button, Select } from 'antd';
import React from "react";
import user_image from "../assets/profile.jpg"
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

export class UserInfo extends React.Component {

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
                    name="name"
                    label="昵称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input defaultValue={this.user.username}/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="性别"
                >
                    <Select
                        onChange={this.onGenderChange}
                        defaultValue="secret"
                    >
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                        <Option value="secret">保密</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="头像"
                >
                    <img src={user_image} className="rounded-circle user_image"/>
                    <Input type="file" accept="image/*"/>
                </Form.Item>
                <Form.Item
                    name="home"
                    label="居住地"
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