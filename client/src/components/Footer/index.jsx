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
  
          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">


                <div className="col-auto">
                </div>
              </div>
            </form>
          </section>
  
          <section className="mb-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
              repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
              eum harum corrupti dicta, aliquam sequi voluptate quas.
            </p>
          </section>
  
          <section className="">
            <div className="row">
              {/* Repeat this block for each col-lg-3 col-md-6 mb-4 mb-md-0 section */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                {/* <h5 className="text-uppercase">Links</h5> */}
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
              <div className="col-md-5 col-12">
                <ul class = "list-unstyled">
                  <li>Email: cameron@robusthseq.com.au</li>
                  <li>Phone: 0408 931 797</li>
                  
                  </ul>
                </div>
            </div>
          </section>
        </div>
  
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2020 Copyright: New World Gear  <a className="text-white" href="https://mdbootstrap.com/">Link to something idk</a>
        </div>
      </footer>
    )
  };
  

export default Footer;