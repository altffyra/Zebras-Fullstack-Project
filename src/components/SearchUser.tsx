import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Order } from "../models/types";
import SingleUserOrders from "./SingleUserOrder";

type SearchUserProps = {
  orders: Order[];
};

const SearchUser = (props: SearchUserProps) => {
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<Order | undefined>();
  const [searched, setSearched] = useState<boolean>(false);

  const handleInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch: () => void = () => {
    if (search.length > 0) {
      setOrder(undefined);
      setSearched(false);
      const foundOrder: Order | undefined = props.orders.find(
        (order) => order.id === search
      );
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setSearched(true);
      }
      setSearch("");
    }
  };

  const handleEnter: (e: KeyboardEvent) => void = (e) => {
    if (e.key == "Enter" && search.length > 0) {
      handleSearch();
    }
  };

  return (
    <section className="user-search">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search-user"
          placeholder="Sök på order id"
          value={search}
          onKeyUp={(e) => {
            handleEnter(e);
          }}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <label htmlFor="search" onClick={handleSearch}>
          SÖK
        </label>
      </div>
      <article className="order">
        {order ? <SingleUserOrders order={order} /> : ""}
        {searched ? (
          <p className="search-result">Hittade tyvärr ingen order</p>
        ) : (
          ""
        )}
      </article>
    </section>
  );
};

export default SearchUser;
