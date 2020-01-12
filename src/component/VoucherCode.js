import React, { Component } from 'react';
import Axios from 'axios';
import {API_URL} from '../support/apiUrl';
import {connect} from 'react-redux';
import {login} from '../redux/action';
import { addToVoucher} from '../redux/action';
import { MDBRow, MDBCol, MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
import '../styles/VoucherCode.css'
import Swal from 'sweetalert2'

class VoucherCode extends Component {
    state = { 
        data:[]
    }
    componentDidMount(){
        Axios.get(API_URL + `/Voucher`)
        .then((res)=>{
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useVoucher=(index)=>{
        let idUser = this.props.idUser
        console.log(idUser)
        let userVoucher = this.props.voucher
        console.log(userVoucher)
        let data = this.state.data[index]
        console.log(data)
        let voucher = {
            id : data.id,
            codeName : data.codeName,
            code : data.code,
            codeImg: data.codeImg
        }
        if(userVoucher.length === 0){
            userVoucher.push(voucher)
            Axios.patch(API_URL + `/Users/${idUser}`,{voucher:userVoucher})
        }else{
            // alert('voucher used')
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Voucher Invalid',
                showConfirmButton: false,
                timer: 1500
            })
        }

        
    }

    renderVoucher=()=>{
        return this.state.data.map((val, index)=>{
            return (
                <MDBCol lg='4' className='Voucher-Col-Item' >
                    <MDBRow middle className='Voucher-Box-Item'>
                        <MDBCol size='4' className='Voucher-Item-Left d-flex justify-content-center'>
                            <div className='Voucher-Icon'><MDBIcon icon="ticket-alt" size='5x' /></div>
                        </MDBCol>
                        <MDBCol size='8' className='Voucher-Item-Right'>
                            <div className='Voucher-codeName'>{val.codeName}</div>
                            <div className='Voucher-code'>"{val.code}"</div>
                            <div style={{textAlign:'right'}}><button onClick={()=>this.useVoucher(index)} className='Voucher-Claim-Btn'>Claim</button></div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            )
        })
    }

    render() { 
        console.log(this.props.voucher)
        return ( 
            <div>
                <MDBContainer fluid>
                    <MDBRow middle className='Voucher-Row-Con'>
                    {this.renderVoucher()}
                    </MDBRow>
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
 
export default connect(mapStatetoProps, { addToVoucher })(VoucherCode);