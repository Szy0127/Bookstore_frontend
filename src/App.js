import './App.css'
import HomeView from "./view/HomeView"
import BookView from "./view/BookView"
import CartView from "./view/CartView"
import OrderView from "./view/OrderView"
import {BrowserRouter as Router, useRoutes} from 'react-router-dom'
import ProfileView from "./view/ProfileView";
import LoginView from "./view/LoginView";
import AdminView from "./view/AdminView";

const GetRoutes = ()=>{

    return useRoutes([
        {
            path:'/',
            element:<HomeView/>
        },
        {
            path:'/home',
            element:<HomeView/>
        },
        {
            path:'/bookDetails',
            element:<BookView/>
        },
        {
            path:'/cart',
            element:<CartView/>
        },
        {
            path:'/order',
            element:<OrderView/>
        },
        {
            path:'/profile',
            element:<ProfileView/>
        },
        {
            path:'/login',
            element:<LoginView/>
        },
        {
            path:'/admin',
            element:<AdminView/>
        },
    ]);
}


function App() {
    return (
        <Router>
            <GetRoutes/>
        </Router>
    );
}


export default App;
