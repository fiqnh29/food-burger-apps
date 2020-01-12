import React, { Component } from 'react';
import Axios from 'axios'
import {API_URL} from '../support/apiUrl';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/action'
import { MDBBtn, MDBInput, MDBCol, MDBRow, MDBContainer, MDBIcon } from 'mdbreact';
import "../styles/Cart.css";
import Swal from 'sweetalert2'


class Cart extends Component {
    state = { 
        data:[],
        useVoucher: false,
        subTotal: 0
    }

    // componentDidMount(){
    //     let subTotal = this.state.subTotal
    //     this.setState({subTotal:subTotal})
    // }

    cancelCart=(index)=>{
        let id = this.props.idUser
        let cart = this.props.cart
        cart.splice(index, 1)
        Axios.patch(API_URL + `/Users/${id}`,{cart : cart})
        .then((res)=>{
            Axios.get(API_URL + `/Users/${id}`)
            .then((res)=>{
                this.setState({data:cart})
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Delete Succes',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        })
    }

    renderTotal=()=>{
        let cart = this.props.cart
        let total = 0
        for(let i=0; i<cart.length; i++){
            total+=cart[i].total
        }
        return total
        // this.setState({subTotal: total})
    }

    renderCart=()=>{
        let cart = this.props.cart
        console.log(cart)
        return cart.map((val, index)=>{
            return(
                <div key={index}>
                    <MDBRow>
                    <MDBCol className='Cart-Container-Col p-3' size='12'>
                    <MDBRow>
                    <MDBCol size='4'><img width='100px' src={val.image}/></MDBCol>
                    <MDBCol size='8'>
                        <div style={{textAlign:'right'}}><button className='Cart-Btn-Cancel-Cart' onClick={() => this.cancelCart(index)}><MDBIcon icon="times-circle" /></button></div>
                        <div className='Cart-txt'>{val.menuName}</div>
                        <div className='Cart-txt'>Price : Rp. {val.price.toLocaleString()}</div>
                        <MDBRow>
                            <MDBCol className='Cart-txt' >Quantity : {val.quantity}</MDBCol>
                            <MDBCol className='Cart-txt Cart-txt-total' >Total : Rp. {val.total.toLocaleString()}</MDBCol>
                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                    </MDBCol>
                    </MDBRow>
                </div>
            )
        })
    }

    renderSameVoucher=()=>{
        let dataVoucher = this.props.voucher
        return dataVoucher.map((val)=>{
            return val.code
        })
    }


    enterVoucherCode=()=>{
        let dataVoucher = this.props.voucher
        let inputCode = this.voucher.value
        return dataVoucher.map((val)=>{
            console.log(val.code)
            if(inputCode === ''){
                console.log('no voucher')
            }
            else if(val.code === inputCode){
                if(val.id === 1){
                    console.log("Selamat Free Shipping")
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Selamat Free Shipping',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({useVoucher:true})

                }
                else if(val.id === 2){
                    console.log('Selamat Discount 50%')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Selamat Discount 50%',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({useVoucher:true})

                }else if(val.id === 3){
                    console.log('Selamat Discount Rp. 10RB')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Selamat Discount Rp. 10RB',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({useVoucher:true})

                }
                console.log('succes')
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid Voucher Code',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        
    }

    render() { 
        console.table(this.props.voucher)
        console.log(this.state.useVoucher)  
        let useVoucher = this.state.useVoucher
        console.log(this.state.subTotal)
        if(useVoucher){
            return <Redirect to='/'/>
        }  
        return ( 
            <div>
                <MDBContainer fluid>
                <MDBRow>
                <MDBCol md='6'>
                <div className='Cart-Col-Title'>Shopping Cart</div>
                {this.renderCart()}
                <MDBRow className='Cart-Row-Total'>
                    <MDBCol className='Cart-Total-Text' size='6'>Total</MDBCol>
                    <MDBCol className='Cart-Total-Price' size='6'>Rp. {this.renderTotal().toLocaleString()}</MDBCol>
                </MDBRow>
                </MDBCol>
                <MDBCol md='6'>
                    <div className='Cart-Col-Title'>Checkout</div>
                    <div className='Cart-txt'>Enter your voucher code. This voucher code will be used to get special discounts.</div>
                    <div></div>
                    <MDBInput type='text' inputRef={(voucher) => this.voucher = voucher} label="Voucher Code" outline icon="ticket-alt" />
                    <MDBRow>
                        <MDBCol size='5'><button onClick={this.enterVoucherCode} className='Cart-txt Cart-Btn-Checkout'>Checkout</button></MDBCol>
                        <MDBCol size='7'><div className='Cart-txt' >All data is transmitted encrypted via a secure TLS connection</div></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                        <div className='Cart-txt Cart-txt-Next-Step'>Next steps</div>
                        <div className='Cart-txt Cart-txt-1'>Payment information</div>
                        <div className='Cart-txt Cart-txt-2'>Choose a payment method and enter your payment details.</div>
                        <div className='Cart-txt Cart-txt-1'>Order confirmation</div>
                        <div className='Cart-txt Cart-txt-2'>Place your order and receive a confirmation email.</div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                </MDBRow>
                <MDBBtn onClick={this.renderTotal} >console</MDBBtn>
                </MDBContainer>
            </div>
        );
    }
}
 
const mapStatetoProps = (state) => {
    return{
        username: state.user.username,
        email: state.user.email,
        idUser: state.user.id,
        cart: state.user.cart,
        voucher:state.user.voucher,

    }
}
 
export default connect(mapStatetoProps, { login })(Cart);