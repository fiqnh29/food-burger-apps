import React, { Component } from 'react';
import { connect } from 'react-redux';
import {login} from '../redux/action';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import { MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol,
MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon
} from "mdbreact";
import '../styles/SignIn.css';
import Caraousel from '../component/Carousel';
import ReactCardFlip from 'react-card-flip';
import backImg from '../image/img2.jpeg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { API_URL } from '../support/apiUrl';
import Swal from 'sweetalert2'


class sign_In extends Component{
    state = { 
        char: false,
        spec: false,
        num: false,
        show: false,
        border: false
     }

    constructor() {
        super();
          this.state = {
          isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
      }
     
      handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    loginUser = () => {
        var username = this.refs.text.value;
        var password = this.refs.pass.value
        if(username === ''|| password === ''){
            // alert('Masukan Username & Password')
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Input username and password',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            Axios.get(`http://localhost:2000/Users?username=${username}&password=${password}`,{
                username,
                password 
            })
            .then((res)=>{
                if(res.data.length === 0){
                    // alert('username atau password salah')
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Invalid username or password',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else{
                    localStorage.setItem("username", username)
                    this.props.login(res.data[0])
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Welocome ${this.props.username}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    handleChange = (e) => {
        let pass = e.target.value
        let num = /[0-9]/
        let spec = /[!@#$%^&*;]/
        this.setState({
            num: num.test(pass), 
            spec: spec.test(pass), 
            char: pass.length > 7,
            border: (num.test(pass) && spec.test(pass) && (pass.length > 7))
        })

    }
    showReq = () => {
        this.setState({show: true})
    }

    registerUser=()=>{
        let { char, spec, num } = this.state

        let username = this.refs.regText.value;
        let email = this.refs.regEmail.value;
        let password = this.refs.regPass.value;
        let ConfirmPass = this.refs.regConfirmPass.value;
        let role = "user";
        let picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        var voucher = [];
        var cart = [];
        var checkout = [];
        if(username && email && password && ConfirmPass){
            if(password !== ConfirmPass){
                // alert('Invalid Password')
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid Confirm Password',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Axios.get(API_URL + `/Users?username=${username}`)
                .then((res)=>{
                    if(res.data.length !== 0){
                        // alert('Username Has Been Taken')
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Username Already Exists',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        if(char && spec && num){
                            Axios.post('http://localhost:2000/Users', {
                                username,
                                email,
                                password,
                                role,
                                picture,
                                voucher,
                                cart,
                                checkout
                            })
                            .then((res) => {
                                this.props.login(res.data)
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: `Welcome ${this.props.username}`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                        }else{
                            // alert('Please Fill the Password Requirements')
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Please Fill the Password Requirements',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }
                })
            }
        }else{
            // alert('harap isi semua kolom')   
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'please fill  out all required fields',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    

    renderLog=()=>{
        return(
            <div className='d-flex justify-content-center' style={{ width: "100%", margin:'auto'}}>
                <MDBCardBody className='SignIn-Card-Body'>
                <MDBCardTitle >
                    <div className='SignIn-Title-Txt'>Sign In</div>
                </MDBCardTitle>
                <MDBCardText style={{textAlign:'center'}}>
                    <div className='SignIn-Header-Txt'>Welcome Back, Please login to your account.</div>
                    <div><input className='SignIn-Input' type='text' placeholder="Username" ref='text'/></div>
                    <div><input className='SignIn-Input' type='password' placeholder="Password" ref='pass'/></div>
                    <MDBRow style={{padding:'10px'}}>
                        <MDBCol sm='12'>
                            <MDBBtn style={{width:'200px'}} className='SignIn-Btn-Login' onClick={this.loginUser} gradient="peach">Login</MDBBtn>
                        </MDBCol>
                        <MDBCol sm='12'>
                            <MDBBtn style={{width:'200px'}} gradient="blue" onClick={this.handleClick}>Register</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardText>
                
                </MDBCardBody>
            </div>
        )
    }

    renderReg=()=>{
        let { char, spec, num, show, border } = this.state

        return(

            <div className='d-flex justify-content-center' style={{ width: "100%", margin:'auto'}}>
                <MDBCardBody className='SignIn-Card-Body'>
                <MDBCardTitle >
                    <div className='SignIn-Title-Txt'>Sign Up</div>
                </MDBCardTitle>
                <MDBCardText style={{textAlign:'center'}}>
                    <div className='SignIn-Header-Txt'>Create Your Account!</div>
                    <div><input className='SignIn-Input' type='text' placeholder="Username" ref='regText'/></div>
                    <div><input className='SignIn-Input' type='email' placeholder="Email" ref='regEmail'/></div>
                    <div><input className='SignIn-Input' type='password' placeholder="Password" onChange={this.handleChange} ref='regPass'/></div>
                    <div><input className='SignIn-Input' type='password' placeholder="Confirm Password" ref='regConfirmPass'/></div>
                    <MDBRow style={{padding:'10px'}}>
                        <MDBCol sm='12'>
                            <MDBBtn style={{width:'200px'}} className='SignIn-Btn-Login' onChange={this.handleChange} onFocus={this.showReq} onClick={this.registerUser} gradient="peach">Register</MDBBtn>
                        </MDBCol>
                        <MDBCol sm='12'>
                            <MDBBtn style={{width:'200px'}} gradient="blue" onClick={this.handleClick}>Login</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardText>
                {
                        show
                        ?
                        <div style={{background:'white',padding:'20px'}}>
                        {
                            char
                            ?
                            <div className='Register-Warning' style={{color: 'green',}}>
                                Password harus memuat 8 karakter atau lebih
                            </div>
                            :
                            <div className='Register-Warning' style={{color: 'red'}}>
                                Password harus memuat 8 karakter atau lebih
                            </div>
                        }
                        {
                            spec
                            ?
                            <div className='Register-Warning' style={{color: 'green'}}>
                                Password harus memuat karakter khusus (!@#$%^&*)
                            </div>
                            :
                            <div className='Register-Warning' style={{color: 'red'}}>
                                Password harus memuat karakter khusus (!@#$%^&*)
                            </div>
                        }
                        {
                            num
                            ?
                            <div className='Register-Warning' style={{color: 'green'}}>
                                Password harus memuat angka (0-9)
                            </div>
                            :
                            <div className='Register-Warning' style={{color: 'red'}}>
                                Password harus memuat angka (0-9)
                            </div>
                        }
                        </div>
                        :
                        null
                    }
                </MDBCardBody>
            </div>
        )
    }




    render(){
        console.log(this.props.username)
        if(this.props.username !=='' && this.props.role === 'user'){
            return(            
                <Redirect to='/'/>
            )
        }else if(this.props.username !=='' && this.props.role === 'admin'){
            return(
                <Redirect to='/admin'/>
            )
        }
        return(
            <div>
                <MDBContainer fluid>
                <MDBRow className='SignIn-Row' style={{backgroundImage:`url(${backImg})`}}>
                    <MDBCol className='d-flex justify-content-center' sm='12'>
                    <div className='SignIn-Form'>
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    {this.renderLog()}
                    {this.renderReg()}
                    </ReactCardFlip>
                    </div>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}

export default connect(mapStatetoProps, {login})(sign_In)