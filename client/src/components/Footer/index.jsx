import React from 'react';
import './style.css';

const Footer = () => {
  return (
  
      <footer className="bg-dark text-center text-white secondFont">
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

{/* //                   <p className="pt-2">
//                     Sign up for our newsletter
//                   </p>
//                 </div>
//                 <div className="col-md-5 col-12">
//                   <div className="form-outline form-white mb-4">
//                     <input type="email" id="form5Example21" className="form-control" />
//                     <label className="form-label" htmlFor="form5Example21">
//                       Email address
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-auto">
//                   <button type="submit" className="btn btn-outline-light mb-4">
//                     Subscribe
//                   </button> */}

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
                    <a href="#!" className="text-white secondFont">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white secondFont">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white secondFont">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white secondFont">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white secondFont">
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
  
        <div className="text-center p-3 secondFont" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright: New World Gear
        </div>
      </footer>
    )
  };
  

export default Footer;