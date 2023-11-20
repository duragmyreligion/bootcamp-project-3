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
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input type="email" id="form5Example21" className="form-control" />
                    <label className="form-label" htmlFor="form5Example21">
                      Email address
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section> */}
  
          <section className="mb-4">
            <p>
            {/* EXPERIENCE */}
            <img src="/images/nwg.png" alt="New World Gear"></img>
            </p>

          </section>
  
          <section className="contact-us">
            <div className="container text-center">
              {/* Repeat this block for each col-lg-3 col-md-6 mb-4 mb-md-0 section */}
              <div className="col-lg-6 mx-auto">
                <h5 className="text-uppercase">Contact Us</h5>
                <ul className="list-group">
                  <li class="mx-auto">
                    <a href="#" className="text-white">
                      Phone: 0408 931 797
                    </a>
                  </li>
                  <li class="mx-auto">
                    <a href="#" className="text-white">
                      Email: cameron@robusthseq.com.au
                    </a>
                  </li>
                  {/* <li>
                    <a href="#!" className="text-white">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </section>
        </div>
  
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright: RobustHSCQ
        </div>
      </footer>
    )
  };
  

export default Footer;