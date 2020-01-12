import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import '../styles/Navbar.css'
import { connect } from 'react-redux'
import  { logout } from '../redux/action'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'


class Navbar extends Component {
  state = {
    isOpen: false,
    redirectHome:false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onBtnLogout=()=>{
    Swal.fire({
      title: 'Are you sure you want to logout?',
      // text: "You won't be able to revert this!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText:'cancel'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('username')
        this.props.logout()
        this.setState({redirectHome:true})
      }
    })

  }

  render() {
    let role = this.props.role
    if(role === 'user' || role === 'admin' ){
      return (
        <MDBNavbar dark className='Navbar' expand="md" >
          <MDBNavbarBrand>
            <MDBNavLink to='/'>
            <img width='150px' src='https://static.ucraft.net/fs/userFiles/demo-burgerbar/images/logo.png?v=1514485357' alt='nav logo'/>
            </MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
            <MDBNavItem><MDBNavLink to="/voucher-code"><div className='NavItem'>Voucher</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/cart"><div className='NavItem'>Cart</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink onClick={this.onBtnLogout} to='/'><div className='NavItem'>Logout</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink  to="/menu"><div className='NavItem'>Menu</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-burgers"><div className='NavItem'>Burgers</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-pizzas"><div className='NavItem'>Pizzas</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-salad"><div className='NavItem'>Salad</div></MDBNavLink></MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    }else{
      return (
        <MDBNavbar dark className='Navbar' expand="md" >
          <MDBNavbarBrand>
            <MDBNavLink to='/'>
            <img width='150px' alt='nav logo' src='https://static.ucraft.net/fs/userFiles/demo-burgerbar/images/logo.png?v=1514485357'/>
            </MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem><MDBNavLink to="/cart"><div className='NavItem'>Cart</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/sign-in"><div className='NavItem'>Login</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu"><div className='NavItem'>Menu</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-burgers"><div className='NavItem'>Burgers</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-pizzas"><div className='NavItem'>Pizzas</div></MDBNavLink></MDBNavItem>
              <MDBNavItem><MDBNavLink to="/menu-salad"><div className='NavItem'>Salad</div></MDBNavLink></MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    }
  }
}

const mapStatetoProps = (state) => {
  return{
    username: state.user.username,
    role: state.user.role
  }
}

export default connect(mapStatetoProps, {logout})(Navbar);