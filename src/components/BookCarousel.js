import React from 'react';
import {Carousel} from 'antd';
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';


export class BookCarousel extends React.Component {

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        const id = [16, 14, 13, 15];
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            result.push(<div>
                <Link
                    to={{
                        pathname: '/bookDetails/',
                        search: '?id=' + id[i]
                    }}
                    target="_blank"
                >
                    <img className="carousel_img" alt={i} src={img}/>
                </Link>
            </div>);
        }
        return result;
    };


    render() {
        const requireContext = require.context("../assets/carousel", true, /^\.\/.*\.jpg$/);

        return (
            <Carousel className="carousel" autoplay effect="fade">
                {this.createContent(requireContext)}
            </Carousel>

        )
    }
}




