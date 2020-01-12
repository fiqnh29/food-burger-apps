import React, {Component} from 'react';
import Axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {API_URL} from '../support/apiUrl';
import Caraousel from '../component/Carousel';
import '../styles/Home.css'
import MultiCarousel from '../component/Multi-Item-Carousel';
import { MDBRow, MDBCol } from 'mdbreact';


class Home extends Component{

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



    render(){
        return(
            <div>
                <div style={{backgroundImage:`url('https://static.ucraft.net/fs/userFiles/demo-burgerhigh/images/r109-765.png')`}} className="parallax">
                    <MDBRow>
                        <MDBCol size='6'>
                            <div style={{margin:'20px'}}>
                                <div className='Home-Title-Header'>JUICY & HOT BURGERS</div>
                            </div>
                        </MDBCol>
                        <MDBCol size='6'></MDBCol>
                    </MDBRow>
                </div>
                <div style={{height:'500px'}}>
                </div>
                <div style={{backgroundImage:`url('https://images.pexels.com/photos/3228803/pexels-photo-3228803.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')`}} className="parallax"></div>
                <div style={{height:'1000px'}}>
                Scroll Up and Down this page to see the parallax scrolling effect.
                This div is just here to enable scrolling.
                Tip: Try to remove the background-attachment property to remove the scrolling effect.
                </div>
                <div style={{backgroundImage:`url('https://images.pexels.com/photos/156114/pexels-photo-156114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`}} className="parallax"></div>

                
            </div>
        )
    }


}

export default Home
