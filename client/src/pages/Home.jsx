import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      {/* Carousel component */}
      <div className="carouselContainer">
        <Carousel />
      </div>
      <div className="container">
        {/* 
          Uncomment the CategoryMenu component when used.
          This component provides category-based navigation.
        */}
        {/* <CategoryMenu /> */}
        
        {/* ProductList and Cart components */}
        <ProductList />
        <Cart />
      </div>
      {/* Footer component */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
