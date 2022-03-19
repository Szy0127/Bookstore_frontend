import React from 'react';
import {Button} from "antd";
export class SearchBook extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleSearch(e){
        this.props.handleSearch(e.target.value);
    }
    handleClear(e){
        this.props.handleClear();
    }


    render(){



        return(
            <div className="search">
                <input id="search_input" type="text" value={this.props.search_book} placeholder="search" onChange={this.handleSearch}/>
                <Button id="search_button" onClick={this.handleClear}>clear</Button>
            </div>
        );
    }
}