import { useEffect } from "react";
import { Order } from "../models/types";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { actions as tempOrderActions } from "../features/tempOrderReducer";
import { actions as cartActions } from "../features/cartReducer";
import { useNavigate } from "react-router-dom";
import "../styles/_error.scss";

const Error = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tempOrder: Order | undefined = useSelector(
    (state: RootState) => state.tempOrder
  )[0];
  useEffect(() => {
    if (tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart());
    }
  }, []);

  const goBack = () => {
    navigate("/");
  };

  return (
    <main className="error">
      <h3>Oops, här var det tomt.</h3>
      <button className="back-btn" onClick={goBack}>
        Ta mig tillbaka!
      </button>
    </main>
  );
};

export default Error;
