import React from 'react';
import HeroSlider from '../Components/UI/HeroSlider';
import Helmet from '../Components/Helmet/Helmet';
import { Container,Row,Col } from 'reactstrap';
import '../Styles/Book.css'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const Home = () => {
  return (
    <>
    <Header />
    <Helmet title='Home'>
    {/* ============= hero section =========== */}
    <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="12" md="4">
                <div className="find__cars-left">
                  <h2>Make a Plan now to keep a appointment with Dsat</h2>
                </div>
              </Col>

              
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
    <Footer />
    </>
  )
}

export default Home
