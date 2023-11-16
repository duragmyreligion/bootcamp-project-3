import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel"
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div className="carouselContainer">
    <Carousel />
    </div>
    <div className="container ">
      {/* <CategoryMenu /> */}
      <ProductList />
      <Cart />
    </div>
    <footer>
    <Footer />
    </footer>

    </>
  );
};

export default Home;
