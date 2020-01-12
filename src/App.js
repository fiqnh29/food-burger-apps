import React, {Component} from 'react';
import Axios from 'axios';
import {Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import {API_URL} from './support/apiUrl';
import {connect} from 'react-redux';
import { login } from './redux/action';
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import Menu from './pages/Menu';
import MenuDetail from "./pages/MenuDetail";
import Cart from './pages/Cart';
import MultiCarousel from './component/Multi-Item-Carousel';
import VoucherCode from './component/VoucherCode';

class App extends Component{
  componentDidMount(){
    var username = localStorage.getItem('username');
    // console.log(username)
    if(username){
        Axios.get(API_URL+`/Users?username=${username}`)
        .then((res)=>{
            console.log(res.data)
            this.props.login(res.data[0])
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  }

  render(){
    return(
      <div>
        <Navbar/>
        <Route path='/' component={Home} exact/>
        <Route path='/menu' component={Menu}/>
        <Route path='/menu-burgers' component={Menu}/>
        <Route path='/menu-pizzas' component={Menu}/>
        <Route path='/menu-salad' component={Menu}/>
        <Route path='/menu-detail' component={MenuDetail}/>
        <Route path='/sign-in' component={SignIn}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/multi' component={MultiCarousel}/>
        <Route path='/voucher-code' component={VoucherCode}/>

      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return{
    username: state.user.username,
    role: state.user.role
  }
}

export default connect(mapStatetoProps, {login})(App);
