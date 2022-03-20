import {Button, Form, Input, Layout, Table} from 'antd';
import React from "react";
import {getAddresses} from "../service/UserService";
const AddressForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        props.handleAdd([values.city,values.address,values.name,values.phone]);
        form.resetFields();
    };
    return (
        <Form className="address_form"
            layout="inline"
            form={form} name="control-ref" onFinish={onFinish}
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
const AddressTable = (props) => {
    const dataSource = [];
    for(let address of props.addresses){
        dataSource.push(
            {
                city:address[0],
                address:address[1],
                name:address[2],
                phone:address[3]
            }
        )
    }

    const handleRemove = (address)=>{
        props.handleRemove([address['city'],address['address'],address['name'],address['phone']]);
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
            render:(address)=>(
                <Button onClick={handleRemove.bind(this,address)}>删除</Button>
            )
        }
    ];

    return <Table dataSource={dataSource} columns={columns} className="address_table"/>;
}

export class Address extends React.Component {

    constructor(props) {
        super(props);
        const addresses = getAddresses();
        this.state = {addresses:addresses.slice()};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleAdd(address){
        let addresses = this.state.addresses;
        addresses.unshift(address);
        this.setState({addresses:addresses})
    }

    addressEqual(add1,add2){
        for(let i in add1){
            if(add1[i]!==add2[i]){
                return false;
            }
        }
        return true;
    }
    handleRemove(address){
        let addresses = this.state.addresses;
        for(let i in addresses){
            if(this.addressEqual(addresses[i],address)){
                addresses.splice(i,1);
                this.setState({addresses:addresses});
                return;
            }
        }
    }


    render() {
        return (
            <Layout>
                <AddressForm handleAdd={this.handleAdd}/>
                <AddressTable addresses={this.state.addresses} handleRemove={this.handleRemove}/>
            </Layout>
        );


    }
}