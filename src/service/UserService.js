import {message} from "antd";
import {history} from '../utils/history';
import {Navigate} from "react-router-dom";
import React from "react";

let addresses = [
    ['上海市', '东川路800号西21', '沈同学', '54749110'],
    ['上海市', '东川路800号西22', '李同学', '54749111'],
    ['上海市', '东川路800号西23', '王同学', '54749112'],
    ['上海市', '莲花南路800号东21', '张同学', '54749113'],
    ['上海市', '剑川路800号东31', '牛同学', '54749114'],
    ['上海市', '剑川路800号西41', '沈同学', '54749115'],
    ['上海市', '东川路600号西51', '沈同学', '54749116'],
    ['上海市', '东川路700号西21', '沈同学', '54749117'],
    ['上海市', '东川路800号西21', '沈同学', '54749118'],
]

export const getAddresses = () => addresses;

let users = [
    ['szy0127', 'szy0127', false],
    ['thunderboy', 'reins1409', false],
    ['abcabc', 'abcabc', true],
    ['kkkkk', 'kkkkk', false]
];

export const getUsers = () => users;

let userConsumed = [
    ['szy0127', 1234],
    ['thunderboy', 3111],
    ['abcabc', 30],
    ['kkkkk', 100]
]

export const getUserConsumed = () => userConsumed;

let admin = ['admin', '123456'];
export const login = (data) => {
    let success = false;
    let isAdmin = false;
    let ban = false;
    if (data['auth'] === "admin") {
        isAdmin = true;
        if (data['username'] === admin[0] && data['password'] === admin[1]) {
            localStorage.setItem('admin', "1");
            success = true;
        }
    } else {

        for (let user of users) {
            if (data['username'] === user[0] && data['password'] == user[1]) {
                if(user[2]){
                    ban = true;
                }
                success = true;
                break;
            }
        }
    }
    if (success) {
        if(!ban){
            localStorage.setItem('user', data['username']);
            message.success("登录成功");
            const path = isAdmin ? "/admin":"/";
            history.push(path);
            history.go();
        }
        message.error("该用户已被禁用");

    } else {

        message.error("用户名或密码错误");
    }
    return success;
};
export const logout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
}

export const Redirect = ()=>{
    message.error("请先登录");
    return <Navigate to="/login"/>
}

export const register = (data)=>{
    if(data['password']!==data['confirm']){
        message.error("密码不一致");
        return;
    }
    if(data['email'].indexOf('@')<0){
        message.error("邮箱错误");
        return;
    }
    users.push([data['username'],data['password'],false]);
    message.success("注册成功");
    history.push("/login");
    history.go()
}

export const forget = ()=>{
    message.info("已向注册邮箱发送邮件");
}