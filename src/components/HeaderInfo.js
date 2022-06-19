import React from 'react';
import {Button, Layout} from 'antd'
// import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'
import '../css/bootstrap.min.css'
import logo from '../assets/logo.svg';
import logoFont from '../assets/logo-name.svg';
import user_image from '../assets/profile.jpg';
import {logout} from "../service/UserService";

export class HeaderInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
        this.user = JSON.parse(localStorage.getItem('user'));
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        this.setState({show: !this.state.show});
    }

    render() {
        const navHref = ['/home', '/cart', '/order', '/profile','/statistic'];
        const navTitle = ['Books', 'My Cart', 'My Orders', 'My Profile','My statistic'];
        let navItem = [];
        for (let i = 0; i < navHref.length; i++) {
            if (i === this.props.navID) {
                navItem.push(
                    <a className="nav-link active" aria-current="page" href={navHref[i]}>{navTitle[i]}</a>
                )
            } else {
                navItem.push(
                    <a className="nav-link" aria-current="page" href={navHref[i]}>{navTitle[i]}</a>
                )
            }
        }

        const nav = (
            <React.Fragment>
                <a className="navbar-brand" href="#">
                    <img className='logo' src={logo}/>
                    <img src={logoFont}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {navItem}
                    </div>
                </div>
            </React.Fragment>
        )

        const select = (
            this.state.show ?
                <Layout className="profile_choice">
                    <Link
                        to={{
                            pathname: '/profile/',
                        }}
                    >
                        <Button>个人设置</Button>
                    </Link>
                    {this.user && this.user.admin ?
                        <Link
                            to={{
                                pathname: '/admin/'
                            }}
                        >
                            <Button>数据管理</Button>
                        </Link> :null}
                    <Link
                        to={{
                            pathname: '/login/'
                        }}
                    >
                        <Button onClick={logout}>{this.user?"退出登录":"登录"}</Button>
                    </Link>
                </Layout>
                : null

        )
        return (
            <div className='header'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {nav}
                    <div className="user">
                        <div className="user_hello">{this.user ? "Hi,"+this.user.username : "Login"}</div>
                        <a><img className="home_user_image rounded-circle" src={user_image} onClick={this.handleClick}/></a>
                        {select}
                    </div>
                </nav>
            </div>
        );
    }
}