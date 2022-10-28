import "../../styles/_adminorder.scss";
import { useParams, useNavigate } from "react-router-dom";
import { User, Order, CartProps, MenuItems } from "../../models/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import CartItem from "../../components/CartItem";
import AdminMenu from "../../components/AdminMenu";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { actions as cartActions } from "../../features/cartReducer";
import { actions as menuActions } from "../../features/menuReducer";
import { actions as orderActions } from "../../features/orderReducer";
import locked from "../../assets/locked.png";
import Alert from "../../components/Alert";
import "../../styles/_alert.scss";

type MyParams = {
  id: string;
};

type UpdatedItemProps = {
  name: string;
  amount: number;
};

const AdminOrder = () => {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
    accountId: "",
  });
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ adminComment, setAdminComment ] = useState<string>('');
  const [ showMenu, setShowMenu ] = useState<boolean>(false);
  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState({ title: "", message: "" });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    " "
  );
  let tempObject = { title: "", message: "" };

  let order: Order | undefined = useSelector((state: RootState) =>
    state.orders.find((order) => order.id === id)
  );
  let cart: CartProps | undefined = useSelector(
    (state: RootState) => state.cart
  );
  let menu: MenuItems[] | undefined = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    if (order?.cart) {
      dispatch(cartActions.clearCart());
      dispatch(cartActions.changeOrder(order?.cart));
      setUser(order.user);
    }
    async function getMenu() {
      const response = await fetch("/api/menu");
      const data = await response.json();
      dispatch(menuActions.getMenu(data));
    }
    getMenu();
  }, []);

  const toggleMenu: (e: FormEvent) => void = (e) => {
    setShowMenu(!showMenu);
    e.preventDefault();
  };

  const handleAmount: (
    e: ChangeEvent<HTMLSelectElement>,
    itemName: string
  ) => void = (e, itemName) => {
    const updatedItem: UpdatedItemProps = {
      name: itemName,
      amount: parseInt(e.target.value),
    };

    dispatch(cartActions.updateAmount(updatedItem));
  };

  function changeCredentials(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function makeAdminComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setAdminComment(e.target.value);
  }

  async function completeOrder() {
    setLoading(true);
    if (order) {
      const completedOrder: Order = {
        cart: order.cart,
        user: order.user,
        adminComment: order.adminComment,
        userComment: order.userComment,
        locked: order.locked,
        orderPlaced: order.orderPlaced,
        orderCompleted: order.orderCompleted,
        id: order.id,
        completed : true,
      }

      const orderId = order?.id
      const response = await fetch(`/api/order/admin/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completedOrder),
      });

      const datasave = await response.json();

      if (!response.ok) {
        setLoading(false);
        tempObject.title = "Ordern ej ändrad";
        tempObject.message = "Något gick fel, försök igen";
        makeError(tempObject);
        showError(true);
      }

      if (response.ok) {
        dispatch(orderActions.getOrders(datasave));
        setLoading(false);
        navigate("/AdminPage");
      };
    };
  };

  async function updateOrder(e:FormEvent) {
    e.preventDefault();

    if (cart) {
      setLoading(true);
      if(user.name.length < 1 || user.email.length < 1 || user.phoneNumber.length < 1) {
        return;
      };
      const updatedOrder:Order = {
        cart: cart,
        user: user,
        orderPlaced: order?.orderPlaced,
        orderCompleted: order?.orderCompleted, 
        id: order?.id,
        userComment: order?.userComment,
        adminComment: adminComment,
        locked: true,
        completed: order?.completed
      };
        const orderId = order?.id;
        const response = await fetch(`/api/order/admin/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });
        const datasave = await response.json();

        if(!response.ok){
          setLoading(false);
          tempObject.title = "Ordern ej ändrad";
            tempObject.message = "Något gick fel, försök igen";
            makeError(tempObject);
            showError(true);
          };

        if (response.ok) {
          setLoading(false);
          dispatch(orderActions.getOrders(datasave));
          navigate("/AdminPage");
        };
    };
  };

  const entreeArry = menu.filter((item) => item.type == "Förrätt");
  const vegArr = menu.filter((item) => item.type == "Veg");
  const mainCourseArr = menu.filter(
    (item) =>
      item.type != "Förrätt" && item.type != "Veg" && item.type != "Efterrätt"
  );
  const desertArr = menu.filter((item) => item.type == "Efterrätt");

  const cartItemEl = cart.cartItems.map((item, index) => (
    <CartItem
      locked={order?.locked}
      item={item}
      key={index}
      handleAmount={handleAmount}
    />
  ));

  return (
    <section className="admin-order">
      {showAlert}
      {loading ? <div className="loading"></div> : ""}
      <div className="top-btn">
        <button onClick={() => navigate("/AdminPage")}>Tillbaka</button>
        {order?.locked ? <img src={locked} alt="" /> : ""}
      </div>
      {!order?.locked ? (
        <form className="order-form">
          <h1>Order {order?.id}</h1>
          <div className="order-cart">
            <div className="headline-cart">
              <h3 className="flex-4">Maträtt</h3>
              <h3 className="flex-1">Antal</h3>
              <h3 className="flex-1">Pris</h3>
            </div>
            {cartItemEl}
            <p className="total-price">Totalt: {cart.totalPrice} kr</p>
          </div>
          <div className="add-item">
            <button onClick={(e) => toggleMenu(e)}>
              {!showMenu ? "Lägg till" : "Stäng"}
            </button>
            {showMenu ? (
              <div className="menu-container">
                <AdminMenu
                  menu={entreeArry}
                  type="Förrätt"
                  toggleMenu={toggleMenu}
                />
                <AdminMenu
                  menu={mainCourseArr}
                  type="Huvudrätt"
                  toggleMenu={toggleMenu}
                />
                <AdminMenu
                  menu={vegArr}
                  type="Vegetariskt"
                  toggleMenu={toggleMenu}
                />
                <AdminMenu
                  menu={desertArr}
                  type="Efterrätt"
                  toggleMenu={toggleMenu}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="user-info">
            <h3>Beställare</h3>
            <div>
              <label htmlFor="">Namn</label>
              <input
                type="text"
                name="name"
                id=""
                value={user.name}
                onChange={(e) => changeCredentials(e)}
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                id=""
                value={user.email}
                onChange={(e) => changeCredentials(e)}
              />
            </div>
            <div>
              <label htmlFor="">Tel.nr</label>
              <input
                type="number"
                name="phoneNumber"
                id=""
                value={user.phoneNumber}
                onChange={(e) => changeCredentials(e)}
              />
            </div>
          </div>

          <div>
            <h3>Kundkommentar</h3>
            <textarea
              name=""
              id=""
              readOnly
              value={order?.userComment}
            ></textarea>
          </div>

          <div>
            <h3>Lägg kommentar till kocken?</h3>
            <textarea
              name="admin-comment"
              id="admin-comment"
              onChange={(e) => makeAdminComment(e)}
            ></textarea>
          </div>

          <button type="submit" className="btn-submit" onClick={updateOrder}>
            Lås & skicka
          </button>
        </form>
      ) : (
        <section className="locked-order">
          <h1>Order {order?.id}</h1>
          <div className="order-cart">
            <div className="headline-cart">
              <h3 className="flex-4">Maträtt</h3>
              <h3 className="flex-1">Pris</h3>
            </div>
            {cartItemEl}
            <p className="total-price">Totalt: {cart.totalPrice} kr</p>
          </div>

          <div className="user-info">
            <h3>Beställare</h3>
            <div>
              <p>Namn</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p>Tel.nr</p>
              <p>{user.phoneNumber}</p>
            </div>
          </div>

          <div>
            <h3>Kundkommentar</h3>
            <textarea
              name=""
              id=""
              readOnly
              value={order?.userComment}
            ></textarea>
          </div>

          <div>
            <h3>Kommentar till kocken</h3>
            <textarea
              name="admin-comment"
              id="admin-comment"
              readOnly
              value={order?.adminComment}
            ></textarea>
          </div>
          {order.completed 
            ? 
              ''
            :  
              <button className="btn-submit" onClick={completeOrder}>
                Order avslutad
              </button>
          }
        </section>
      )}
    </section>
  );
};

export default AdminOrder;
