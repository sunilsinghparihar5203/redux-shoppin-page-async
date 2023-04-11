import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiAction } from "./store/ui-slice";
import { cartAction } from "./store/card-slice";

function App() {
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);

  const notification = useSelector((state) => state.ui.notification);

  const items = useSelector((state) => state.cart.items);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (items.length > 0) {
      dispatch(
        uiAction.notification({
          isVisible: true,
          message: "Sending cart data.",
          title: "sending...",
          status: "",
        })
      );
      fetch(
        "https://react-deployment-5c0a9-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      )
        .then((res) => {
          if (res.ok) {
            dispatch(
              uiAction.notification({
                isVisible: true,
                message: "Send cart data successfully.",
                title: "Success!",
                status: "success",
              })
            );
            console.log({ res: res });
            return res.json();
          }
        })
        .then((data) => {
          console.log({ data: data });
        })
        .catch((err) => {
          console.log({ err: err });
          dispatch(
            uiAction.notification({
              isVisible: true,
              message: "Send cart data failed.",
              title: "Error!",
              status: "error",
            })
          );
        });
    }
  }, [cart]);

  useEffect(() => {
    dispatch(
      uiAction.notification({
        isVisible: true,
        message: "Fetching data.",
        title: "fetching...",
        status: "",
      })
    );
    fetch(
      "https://react-deployment-5c0a9-default-rtdb.firebaseio.com/cart.json"
    )
      .then((res) => {
        if (res.ok) {
          dispatch(
            uiAction.notification({
              isVisible: true,
              message: "Successfull.",
              title: "Success!",
              status: "success",
            })
          );
          console.log({ fetchres: res });
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(cartAction.replaceCart(data));
      })
      .catch((err) => {
        console.log({ fetacherr: err });
        dispatch(
          uiAction.notification({
            isVisible: true,
            message: "Failed.",
            title: "Error!",
            status: "error",
          })
        );
      });
  }, []);

  return (
    <Layout>
      {notification.isVisible && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
