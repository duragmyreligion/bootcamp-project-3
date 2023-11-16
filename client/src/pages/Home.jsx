import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel"

const Home = () => {
  return (
    <>
    <div className="carouselContainer">
    <Carousel />
    </div>
    <div className="container">
      {/* <CategoryMenu /> */}
      <ProductList />
      <Cart />
    </div>

    </>
  );
};

export default Home;
