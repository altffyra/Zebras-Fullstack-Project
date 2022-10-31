import "../styles/_userInformation.scss";
import { useDispatch } from "react-redux";
import { User } from "../models/types";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { actions as userActions } from "../features/userReducer";

type UserInformationProps = {
  user: User;
};

const UserInformation = (props: UserInformationProps) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setnewPassword] = useState<string>("");
  const [newPasswordAgain, setnewPasswordAgain] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  useEffect(() => {
    if (props.user) {
      setUserName(props.user.name);
      setUserEmail(props.user.email);
      setUserPhone(props.user.phoneNumber);
    }
  }, [props.user]);

  const handleUpdate: () => void = () => {
    setUpdate(true);
  };

  const handlePassword: () => void = () => {
    setUpdate(true);
    setUpdatePassword(true);
  };

  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    updateUser();
  };

  const handleSubmitPassword: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    changePassword();
  };

  async function changePassword() {
    setPasswordError(false);
    if (newPassword != newPasswordAgain || oldPassword != props.user.password) {
      setPasswordError(true);
      return;
    }

    const updatedUser: User = {
      name: userName,
      email: userEmail,
      phoneNumber: userPhone,
      accountId: props.user.accountId,
      password: newPassword,
    };

    setLoading(true);
    const response = await fetch(`/api/user/${props.user.accountId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) {
      setUpdate(false);
      setLoading(false);
      dispatch(userActions.setUser(updatedUser));
    }
  }

  async function updateUser() {
    setPasswordError(false);

    const updatedUser: User = {
      name: userName,
      email: userEmail,
      phoneNumber: userPhone,
      accountId: props.user.accountId,
      password: props.user.password,
    };

    setLoading(true);
    const response = await fetch(`/api/user/${props.user.accountId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) {
      setUpdate(false);
      setLoading(false);
      dispatch(userActions.setUser(updatedUser));
    }
  }

  const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePhone: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPhone(e.target.value);
  };

  const handleOldPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setnewPassword(e.target.value);
  };

  const handleNewPasswordAgain: (e: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setnewPasswordAgain(e.target.value);
  };
  const handleCancel: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    setUserName(props.user.name);
    setUserEmail(props.user.email);
    setUserPhone(props.user.phoneNumber);
    setnewPassword("");
    setnewPasswordAgain("");
    setOldPassword("");
    setPasswordError(false);
    setUpdate(false);
    setUpdatePassword(false);
  };

  return (
    <section className="user-information">
      {loading ? <div className="loading"></div> : ""}
      <div className="headline-user">
        <h2>Mina Uppgifter</h2>
        {passwordError ? (
          <p className="wrong-password">Fel gammalt lösenord</p>
        ) : (
          ""
        )}
      </div>
      {!update && !updatePassword ? (
        <section className="user-container">
          <div className="user-info">
            <p>Namn: </p>
            <p>{props.user.name}</p>
          </div>
          <div className="user-info">
            <p>Email: </p>
            <p>{props.user.email}</p>
          </div>
          <div className="user-info">
            <p>Tel.nr: </p>
            <p>{props.user.phoneNumber}</p>
          </div>
          <div className="button-container">
            <button className="change-btn" onClick={handlePassword}>
              Lösenord
            </button>

            <button className="change-btn" onClick={handleUpdate}>
              Uppgifter
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
      {!updatePassword && update ? (
        <form className="user-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="user-info">
            <label htmlFor="username">Namn: </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={props.user.name}
              onChange={(e) => handleName(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={props.user.email}
              onChange={(e) => handleEmail(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="username">Tel.nr: </label>
            <input
              type="number"
              name="phonenum"
              id="phonenum"
              defaultValue={props.user.phoneNumber}
              onChange={(e) => handlePhone(e)}
            />
          </div>
          <div className="button-container">
            <button className="cancel-btn" onClick={(e) => handleCancel(e)}>
              Avbryt
            </button>
            <button type="submit" className="update-btn">
              Uppdatera
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
      {updatePassword && update ? (
        <form
          className="user-container"
          onSubmit={(e) => handleSubmitPassword(e)}
        >
          <div className="user-info">
            <label htmlFor="oldpw">Gammalt Lösen: </label>
            <input
              type="text"
              name="oldpw"
              id="oldpw"
              onChange={(e) => handleOldPassword(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="newpw">Nytt Lösen: </label>
            <input
              type="text"
              name="newpw"
              id="newpw"
              onChange={(e) => handleNewPassword(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="newpwagain">Nytt Lösen igen: </label>
            <input
              type="text"
              name="newpwagain"
              id="newpwagain"
              onChange={(e) => handleNewPasswordAgain(e)}
            />
          </div>
          <div className="button-container">
            <button className="cancel-btn" onClick={(e) => handleCancel(e)}>
              Avbryt
            </button>
            <button type="submit" className="update-btn">
              Uppdatera
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </section>
  );
};

export default UserInformation;
