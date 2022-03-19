import {Button, Form, Input, Layout, Table} from 'antd';
import React from "react";
import {getAddresses} from "../service/UserService";
const AddressForm = () => {
    const formRef = React.createRef();
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <Form className="address_form"
            layout="inline"
            ref={formRef} name="control-ref" onFinish={onFinish}
        >
            <Form.Item
                name="city"
                label="省市"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeHolder="上海市" className="short"/>
            </Form.Item>
            <Form.Item
                name="address"
                label="详细地址"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeHolder="东川路800号"/>
            </Form.Item>
            <Form.Item
                name="name"
                label="收件人姓名"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeHolder="沈同学" className="short"/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="联系方式"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeHolder="54749110"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    添加
                </Button>
            </Form.Item>
        </Form>
    )
}
const AddressTable = () => {
    const addresses = getAddresses();
    const dataSource = [];
    for(let address of addresses){
        dataSource.push(
            {
                city:address[0],
                address:address[1],
                name:address[2],
                phone:address[3]
            }
        )
    }

    const columns = [
        {
            title: '收货人',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所在地区',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: '详细地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title:'操作',
            render:()=>(
                <Button>删除</Button>
            )
        }
    ];

    return <Table dataSource={dataSource} columns={columns} className="address_table"/>;
}

export class Address extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Layout>
                <AddressForm/>
                <AddressTable/>
            </Layout>
        );


    }
}