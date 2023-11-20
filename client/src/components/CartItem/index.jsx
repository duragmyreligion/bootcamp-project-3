import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();
  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };
  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }
  return (
    <div className="flex-row" style={{marginBottom:"1rem"}}>
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
        <div style={{marginLeft: "8rem", marginTop: "-7rem", fontSize: "1.2rem"}}>{item.name}</div>
        <div style={{marginLeft: "8rem", fontSize: "1rem"}}>${item.price}</div>
        <div style={{marginLeft: "8rem", fontSize: "1rem"}}>{item.selectedSize}</div>
      </div>
      <div>
        <div>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            style={{marginLeft:"8rem"}}
          />
          <img
          src="../images/delete_icon.png"
          onClick={() => removeFromCart(item)}
          style={{width: "6%", marginBottom: "0.4rem"}}
          />
          <span></span>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
