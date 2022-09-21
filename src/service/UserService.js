import {message} from "antd";
import {history} from '../utils/history';
import {Navigate} from "react-router-dom";
import React from "react";
import {postRequest, postRequest_v2, base_url} from "../utils/ajax";
import sha256 from 'crypto-js/sha256';


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

export const getUsers = (callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    if (!user.admin) {
        message.error("没有权限");
    }
    postRequest_v2(base_url + "getUsers", {}, callback);
}

export const banUser = (userID) => {//实际上是改状态
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + "banUser", {userID: userID}, () => {
    });
}

let userConsumed = [
    ['szy0127', 1234],
    ['thunderboy', 3111],
    ['abcabc', 30],
    ['kkkkk', 100]
]


let admin = ['admin', '123456'];
export const login = (data) => {

    data['password'] = sha256(data['password'] + nonce).toString();
    postRequest_v2(base_url + "login", data,
        (dataret) => {
            // console.log(data);
            if (dataret.success) {
                // console.log(data.data);
                // console.log(JSON.stringify(data.data));
                if (data['auth'] !== "admin") {//如果管理员用非管理员登录 认为是非管理员
                    dataret.data.admin = false;
                }
                localStorage.setItem('user', JSON.stringify(dataret.data));
                // localStorage.setItem('user', data.data);
                message.success(dataret.msg);
                history.push("/");
                history.go();
            } else {
                message.error(dataret.msg);
            }
        }
    )
    return;
    // let success = false;
    // let isAdmin = false;
    // let ban = false;
    // if (data['auth'] === "admin") {
    //     isAdmin = true;
    //     if (data['username'] === admin[0] && data['password'] === admin[1]) {
    //         localStorage.setItem('admin', "1");
    //         success = true;
    //     }
    // } else {
    //
    //     for (let user of users) {
    //         if (data['username'] === user[0] && data['password'] == user[1]) {
    //             if(user[2]){
    //                 ban = true;
    //             }
    //             success = true;
    //             break;
    //         }
    //     }
    // }
    // if (success) {
    //     if(!ban){
    //         localStorage.setItem('user', data['username']);
    //         message.success("登录成功");
    //         const path = isAdmin ? "/admin":"/";
    //         history.push(path);
    //         history.go();
    //     }
    //     message.error("该用户已被禁用");
    //
    // } else {
    //
    //     message.error("用户名或密码错误");
    // }
    // return success;
};
export const logout = (callback) => {
    localStorage.removeItem('user');
    postRequest_v2(base_url + "logout", {}, callback);
}

export const Redirect = () => {
    message.error("请先登录");
    return <Navigate to="/login"/>
}

const nonce = 12345;
export const register = (data) => {
    if (data['password'].length < 6 || data['password'].length > 20) {
        message.error("密码长度为6-20位");
        return;
    }
    if (data['password'] !== data['confirm']) {
        message.error("密码不一致");
        return;
    }

    if (data['username'].length > 20) {
        message.error("用户名长度不得大于20位");
        return;
    }
    if (data['email'].indexOf('@') < 0) {
        message.error("邮箱格式错误");
        return;
    }
    if (data['email'].length > 50) {
        message.error("不接受这么长的邮箱");
        return;
    }
    data['password'] = sha256(data['password'] + nonce.toString()).toString();
    // console.log(hash);
    // postRequest_v2()
    // users.push([data['username'],data['password'],false]);
    delete data['confirm'];
    postRequest_v2(base_url + "register", data,
        (success) => {
            if (success) {
                message.success("注册成功");
                history.push("/login");
                history.go();
            } else {
                message.error("注册失败,用户名或邮箱已被使用");
            }
        }
    );

}


export const forget = () => {
    message.info("已向注册邮箱发送邮件");
}

export const getCart = (callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + "getCart", {}, callback);

}

export const updateCart = (cartItem) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    cartItem['userID'] = user.userID
    postRequest_v2(base_url + "updateCart", cartItem, () => {
    });
}
export const addCart = (bookID) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    const data = {'userID': user.userID, 'bookID': bookID};
    postRequest_v2(base_url + "/addCart", data, (d) => {
        history.push("/cart");
        history.go();
        message.success("成功加入购物车");
    })
}

export const removeCart = (bookID) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    const data = {'bookID': bookID};
    postRequest_v2(base_url + "/removeCart", data, (d) => {
    })
}

export const getOrdersByUserID = (callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + "getOrdersByUserID", {}, callback);

}


export const getOrdersByTimeAndBook = (start,end,bookName,callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + "getOrdersByTimeAndBook", {'start': start, 'end': end,'bookName':bookName}, callback);
}
export const getOrdersByUserAndTimeAndBook = (start,end,bookName,callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + "getOrdersByUserAndTimeAndBook", {'start': start, 'end': end,'bookName':bookName}, callback);
}
export const buyBooks = (books) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }

    postRequest(base_url + "buyBooks", books,
        (data) => {
            if (data) {
                history.push("/order");
                history.go();
                message.success("购买成功");
            } else {
                message.error("购买失败");
            }
        }
    );
}


export const getBookSaledByTimeBetween = (start, end, callback) => {
    postRequest_v2(base_url + 'getBookSaledByTimeBetween', {'start': start, 'end': end}, callback);

}

export const getUserStatistic = (start, end, callback) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        Redirect();
        return;
    }
    postRequest_v2(base_url + 'getUserStatistic', {'start': start, 'end': end}, callback);

}

export const getUserConsumedByTimeBetween = (start, end, callback) => {
    postRequest_v2(base_url + 'getUserConsumedByTimeBetween', {'start': start, 'end': end}, callback);

}

export const checkSession = (callback)=>{
    postRequest_v2(base_url + 'checkSession', {}, callback);
}
