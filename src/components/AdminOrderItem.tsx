import React from "react";
import imageLocked from "../assets/locked.png";
import imageMessage from "../assets/message.png";
import imageUnlocked from "../assets/unlocked.png";
type Props = {};

const AdminOrderItem = (props: Props) => {
  const orderDetails = "";

  let messageDetect = "";
  //props.order.message? <img src={imageMessage}/> : ""

  let lockDetect = "";
  //props.order.message? <img src={imageLocked}/> : <img src={imageUnlocked}/>

  return (
    <div className="orderItem">
      <div className="orderTop">
        <p className="orderNumber"> Ordernumber </p> {messageDetect}
      </div>
      <div>
        <div className="orderContains">{orderDetails}</div>
        <div className="lockedItemIndicator"> {lockDetect} </div>
      </div>
    </div>
  );
};

export default AdminOrderItem;
