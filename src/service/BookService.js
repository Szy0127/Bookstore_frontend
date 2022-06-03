import {base_url, postRequest_v2,postRequest} from "../utils/ajax";
import {message} from "antd";
export const getBooks = (callback) =>{
    postRequest_v2(base_url+"getBooks","",callback);
}
export const getBook = (i,callback) => {
    postRequest_v2(base_url+"getBook",{'ID':parseInt(i)},callback);
}
let orders = [
    [6,1, '2022-1-21', '87725228'],
    [5,2, '2021-12-30', '86985965'],
    [3,31, '2021-7-24', '14201167'],
    [2,11, '2022-8-19', '47581308'],
    [9,1, '2022-2-07', '32763561'],
    [13,2, '2022-8-12', '80218841'],
    [21,1, '2022-11-04', '96820552'],
    [23,1, '2022-10-09', '11855809'],
    [19,1, '2020-5-22', '20830522'],
    [17,1, '2021-1-13', '16033537']
]
let order_each_type = [
    [3,9],
    [13,2,21,17],
    [5,6,19],
    [23]
]
export const getOrder = (type) => {
    if(type==0) {
        return orders;
    }
    return orders.filter(
        (order) => {
            return order_each_type[parseInt(type)-1].indexOf(parseInt(order[0])) > -1;
        }
    )
}

let bookSaled = [
    [5,30],
    [6,19],
    [10,100],
    [20,400],
    [13,56],
    [2,31]
]
export const getBookSaled  = ()=> bookSaled;
// export const addCart = (i) => {
//     // cart.unshift([i]);
//     if(cart.indexOf(parseInt(i))>-1){
//         return;
//     }
//     cart.push(parseInt(i));
//     console.log(cart.length);
// }
//
// export const delCart = (i)=>{
//     cart.splice(cart.indexOf(i),1);
// }

export const addBook = (book)=>{
    postRequest_v2(base_url+"addBook",book,(data)=>{
        if(data.success){
            message.success(data.msg);
        }else{
            message.error(data.msg);
        }
    });
}

export const removeBook = (bookID)=>{
    postRequest_v2(base_url+"removeBook",{'bookID':bookID},(data)=>{
        if(data.success){
            message.success(data.msg);
        }else{
            message.error(data.msg);
        }
    });
}

export const updateBook = (book)=>{
    postRequest(base_url+"updateBook",book,(data)=>{
        if(data.success){
            message.success(data.msg);
        }else{
            message.error(data.msg);
        }
    });
}