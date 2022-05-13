import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {BookDetail} from "../components/BookDetail";
import {useLocation} from "react-router-dom";
import '../css/detail.css'

// class BookView extends React.Component {
function BookView(props) {
    let location = useLocation();

    const query = location.search;
    const arr = query.split('&');
    const bookID = arr[0].substr(4);

    return (
        <Layout>
            <HeaderInfo/>
            <div className='container'>
                <BookDetail bookID={bookID}/>
            </div>
        </Layout>
    );
}


export default BookView;