import {Menu} from "antd";
import React from "react";


export function SubMenu(props) {
    const menuItems = [];
    for (let i in props.types) {
        menuItems.push(
            <Menu.Item key={i}>{props.types[i]}</Menu.Item>
        )
    }

    const handleChange = (e)=>{
        props.handleChange(e.key);
    }
    return (
        <Menu className={"submenu"}
              onClick={handleChange}
              defaultSelectedKeys={['0']}
              mode="inline"
        >
            {menuItems}
        </Menu>
    )
}