import './App.css'
import HomeView from "./view/HomeView"
import BookView from "./view/BookView"
import CartView from "./view/CartView"
import OrderView from "./view/OrderView"
import {BrowserRouter as Router, useRoutes} from 'react-router-dom'
import ProfileView from "./view/ProfileView";
import LoginView from "./view/LoginView";
import RegisterView from "./view/RegisterView";
import AdminView from "./view/AdminView";
import PrivateRoute from "./PrivateRoute";
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
            element:<PrivateRoute component = {<CartView/>}/>
        },
        {
            path:'/order',
            element:<PrivateRoute component = {<OrderView/>}/>
        },
        {
            path:'/profile',
            element:<PrivateRoute component = {<ProfileView/>}/>
        },
        {
            path:'/login',
            element:<LoginView/>
        },
        {
            path:'/admin',
            element:<PrivateRoute admin = "1" component = {<AdminView/>}/>
        },
        {
            path:'/register',
            element:<RegisterView/>
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
