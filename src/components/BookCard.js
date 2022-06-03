import {Link} from "react-router-dom";
import {Card} from "antd";
import React from "react";
import Meta from "antd/es/card/Meta";

export const BookCard = (props)=>{
    return (
        <Link to={{
            pathname: '/bookDetails',
            search: '?id=' + props.book['bookID']}}
            //target="_blank"
        >
            <Card
                hoverable
                style={{width: 181}}
                cover={<img alt="image" src={props.book['image']} className={"bookImg"}/>}
            >
                <Meta title={props.book['name']} description={'¥' + props.book['price']}/>
            </Card>
        </Link>
    )
}