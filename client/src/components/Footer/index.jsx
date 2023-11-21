import React from 'react';
import './style.css';

const Footer = () => {
  return (
  
      <footer className="bg-dark text-center text-white">
        <div className="footer-container p-4">
          <section className="mb-4">
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </section>
  
          {/* <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">


                <div className="col-auto">
                </div>
              </div>
            </form>
          </section> */}
  
          <section className="mb-4">
            <img src="/images/nwg.png" alt="New World Gear"></img>
          </section>
  
          <section className="contact-us">
            <div className="container text-center">
              {/* Repeat this block for each col-lg-3 col-md-6 mb-4 mb-md-0 section */}
              <div className="col-lg-6 mx-auto">
                <h5 className="text-uppercase">Contact Us</h5>
                <ul className="list-group">
                  <li className="mx-auto">
                    <a href="#" className="text-white secondFont" style={{ fontSize: "18px"}}>
                      Email: info@NewWorldGear.com
                    </a>
                  </li>
                  {/* <li>
                    <a href="#!" className="text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Terms of Service
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </section>
        </div>
  
        <div className="text-center text-white p-3 secondFont" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright: New World Gear
        </div>
      </footer>
    )
  };
  

export default Footer;