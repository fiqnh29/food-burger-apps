import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const CarouselPage = () => {
  return (
    // <MDBContainer>
    <div style={{width:'50%', height:'100%'}}>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/3052264/pexels-photo-3052264.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="img carousel"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/2271106/pexels-photo-2271106.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="img carousel"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/2918521/pexels-photo-2918521.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="img carousel"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      </div>
    // </MDBContainer>
  );
}

export default CarouselPage;