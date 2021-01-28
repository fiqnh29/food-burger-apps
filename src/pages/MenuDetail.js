import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from "../support/apiUrl";
import '../styles/MenuDetail.css'
import { MDBRow, MDBCol, MDBBtn , MDBIcon , MDBContainer} from 'mdbreact';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { addToCart } from '../redux/action';
import MultiCarousel from '../component/Multi-Item-Carousel';
import Slider from "react-slick";
import Swal from 'sweetalert2'



class MenuDetail extends Component {
    state = { 
        data:[],
        menu:[],
        value:1,
        modal:false,
        notLog:false
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    decrease = () => {
        let min = this.state.value
        if(min <= 1){
            this.setState({value: this.state.value = 1})
        }else{
            this.setState({ value: this.state.value - 1 });
        }
    }
    
    increase = () => {
        this.setState({ value: this.state.value + 1 });
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        Axios.get(API_URL + `/menu/${id}`)
        .then((res)=>{
            this.setState({data:res.data})
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderPrice=()=>{
        let data = this.state.data
        let price = 0
        price += data.price
        return price.toLocaleString()
    }

    renderTotal=()=>{
        let qty = this.state.value
        let price = this.state.data
        let total = 0
        total += qty*price.price
        return(
            total.toLocaleString()
        )
    }

    renderQuantity=()=>{
        return(
            <span>
                <button onClick={this.decrease} className="minus MDetail-MinPlus"><MDBIcon icon="minus" /></button>
                <input value={this.state.value} type="number" className='MDetail-Input-Qty' />
                <button onClick={this.increase} className="plus MDetail-MinPlus"><MDBIcon icon="plus" /></button>
            </span>
        )
    }

    renderDetail=()=>{
        let data = this.state.data
        return(
            <MDBRow className='MDetail-Row'>
            <MDBCol className='MDetail-Col-Img p-4'  sm='6'><img alt='menuimage' src={data.image}/></MDBCol>
            <MDBCol className='MDetail-Col-Txt'  sm='6'>
                <div className='MDetail-Name'>{data.menuName}</div>
                <div className='MDetail-Detail'>{data.detail}</div>
                <MDBRow className='MDetail-Price'>
                    <MDBCol size='6'>{this.renderQuantity()}</MDBCol>
                    <MDBCol size='6'>Rp. {this.renderPrice()}</MDBCol>
                </MDBRow>
                <MDBRow className='MDetail-Price'>
                    <MDBCol size='6'>Total Price</MDBCol>
                    <MDBCol size='6'>Rp. {this.renderTotal()}</MDBCol>
                </MDBRow>
                <div style={{padding:'20px'}}>
                    <MDBBtn onClick={this.addToCart} className='MDetail-ATC-Btn' gradient="peach">
                        <MDBIcon size='2x' icon="cart-arrow-down" />
                    </MDBBtn>
                </div>
            </MDBCol>
            </MDBRow>
        )
    }

    findIndexOfMenu = () => {
        let data = this.state.data
        let menuID = data.id
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === menuID) {
                return i
            }
        }
    }

    sameMenuName = () => {
        let data = this.state.data
        let menuID = data.id
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === menuID) {
                return true
            }
        }
        return false
    }

    addToCart=()=>{
        let role = this.props.role
        if(role === 'user' || role === 'admin'){
            let data = this.state.data
            let {cart, idUser} = this.props
            let {id, menuType, menuName, image, detail, price} = this.state.data;
            let quantity = this.state.value;
            let total = 0
            total += quantity*data.price
            let addCart = {
                id, menuType, menuName, image, detail, quantity, price , total
            }
            let same = this.sameMenuName()
            if(quantity === 0){
                console.log('0')
            }else{
                if(cart.length === 0 || ! same){
                    cart.push(addCart)
                    Axios.patch(API_URL + `/Users/${idUser}`, {cart:cart})
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${menuName} Was succesfully added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if(same){
                    let index = this.findIndexOfMenu()
                    cart[index].total += total
                    cart[index].quantity += quantity
                    Axios.patch(API_URL + `/Users/${idUser}`,{cart:cart})
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${menuName} Was succesfully added to your cart bosku`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }else{
            this.setState({notLog:true})
        }

    }

    renderImg=()=>{
        let data = this.state.data
        let menu = this.state.menu
        Axios.get(API_URL + `/menu`)
        .then((res)=>{
            this.setState({menu:res.data})
            // console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        return this.state.menu.map((val)=>{
            if(data.menuType == val.menuType){
            return (
              <div>
                <a href={`/menu-detail?id=${val.id}`}><img className='Mdetail-Carousel-Img' width='100%' src={val.image}/></a>
              </div>
            )
            }
        })
    }

    render() {
        const settings = {
            // dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay: true,
            speed: 300,
            autoplaySpeed: 300,
            cssEase: "linear",
            swipeToSlide: true,

        };
        let {notLog} = this.state
        if(notLog){
            return <Redirect to='/sign-in'/>
        } 
        return( 
            <div style={{height:'100vh',background:'black'}}>
                <div className='MDetail-Clearfix'>
                <MDBContainer style={{height:'100%', background:'black'}}>
                {this.renderDetail()}
                <MDBRow style={{background:'black', padding:'20px', marginTop:'20px'}} center className='Mdetail-Carousel'>
                    <MDBCol size='12'>
                    <Slider {...settings}>
                    {this.renderImg()}
                    </Slider>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
                </div>
            </div> 
        );
    }
}
 
const mapStatetoProps = (state) => {
    return{
        role: state.user.role,
        idUser: state.user.id,
        cart: state.user.cart
    }
}
 
export default connect(mapStatetoProps, { addToCart })(MenuDetail);