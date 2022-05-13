import React from 'react';
import {Button} from "antd";
export class SearchBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchName:""};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleSearch(e){
        let bookName = e.target.value.toLowerCase();
        if (bookName === "") {
            this.setState({searchName:""});
            this.props.handleClear();
            return;
        }

        console.log("finding",this.initialBooks);
        let books = this.initialBooks.filter(
            (book) => {
                return book['name'].toLowerCase().indexOf(bookName) > -1;
            }
        );
        this.setState({searchName:bookName});
        this.props.handleSearch(books);
    }
    handleClear(e){
        this.setState({searchName:""});
        this.props.handleClear();
    }


    render(){
        this.initialBooks = this.props.initialBooks? this.props.initialBooks : (this.props.books ? this.props.books.slice():[]);
        return(
            <div className="search">
                <input id="search_input" type="text" value={this.state.searchName} placeholder="search" onChange={this.handleSearch}/>
                <Button id="search_button" onClick={this.handleClear}>clear</Button>
            </div>
        );
    }
}