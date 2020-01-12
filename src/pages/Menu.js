import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
import {API_URL} from '../support/apiUrl';
import '../styles/Menu.css'
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact';
class Menu extends Component{

    state={
        data:[]
    }

    componentDidMount(){
        Axios.get(API_URL+`/Menu`)
        .then((res)=>{
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderMenu=()=>{
        let linkName = this.props.location.pathname.slice(6)
        let linkMenu = this.props.location.pathname.slice(1)
        console.log(linkName) 
        return this.state.data.map((val ,i)=>{
            if(val.menuType === linkName){
            return(
                <MDBCol key={i} sm='4'  className='Menu-Card'>
                    <Link to={`/menu-detail?id=${val.id}`}>
                    <div><img alt='menuimage' width='120px' src={val.image}/></div>
                    </Link>
                    <div className='Menu-Name'>{val.menuName}</div>
                    <div><p className='Menu-Detail'>{val.detail}</p></div>
                    <div className='Menu-Price'>Rp. {val.price.toLocaleString()}</div>
                </MDBCol>
            )
            }else if(linkMenu === 'menu'){
                return(
                    <MDBCol key={i} sm='4'  className='Menu-Card'>
                    <Link to={`/menu-detail?id=${val.id}`}>
                    <div><img alt='menuimage' width='120px' src={val.image}/></div>
                    </Link>
                    <div className='Menu-Name'>{val.menuName}</div>
                    <div><p className='Menu-Detail'>{val.detail}</p></div>
                    <div className='Menu-Price'>Rp. {val.price.toLocaleString()}</div>
                    </MDBCol>
                )
            }
        })
    }

    render(){
        console.log(this.state.data)
        return(
            <div>
                <div className='Menu-Clearfix'>
                    <MDBContainer fluid>
                    <MDBRow className='Menu-Row d-flex justify-content-center'>
                        {this.renderMenu()} 
                    </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }


}

export default Menu
