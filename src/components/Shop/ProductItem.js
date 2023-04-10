import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

import { useDispatch } from "react-redux";
import { cartAction } from "../../store/card-slice";
const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    dispatch(
      cartAction.addItemToCart({
        id,
        title,
        price,
      })
    );
  };
  
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
