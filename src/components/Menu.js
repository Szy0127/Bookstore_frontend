import {Menu} from "antd";
import React from "react";


const {SubMenu} = Menu;
export function MyMenu(props) {
    let menuItems = [];
    let subItems = [];
    if(props.sub){
        for(let i in props.sub[1]){
            subItems.push(
                <Menu.Item key={parseInt(i)+props.types.length-1}>{props.sub[1][i]}</Menu.Item>
            )
        }
    }
    for (let i in props.types) {
        menuItems.push(
            props.sub && i == props.sub[0] ?
                <SubMenu title={props.types[i]}>
                    {subItems}
                </SubMenu>:
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