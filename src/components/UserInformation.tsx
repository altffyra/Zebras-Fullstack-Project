import "../styles/_userInformation.scss";
import { useDispatch } from "react-redux";
import { User } from "../models/types";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { actions as userActions } from "../features/userReducer";
import Alert from "../components/Alert";

type UserInformationProps = {
  user: User;
};

type errorType = {
  title: string;
  message: string;
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

  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState({ title: "", message: "" });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    ""
  );

  let tempObject: errorType = { title: "", message: "" };

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
    if (newPassword != newPasswordAgain || oldPassword != props.user.password) {
      tempObject.title = "Ändringen misslyckades";
      tempObject.message = "Lösenorden stämmer inte överrens, försök igen";
      makeError(tempObject);
      showError(true);
      setLoading(false);
      return;
    }

    const updatedUser: User = {
      name: props.user.name,
      email: props.user.email,
      phoneNumber: props.user.phoneNumber,
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
      setUpdatePassword(false);
      setUpdate(false);
      setLoading(false);
      dispatch(userActions.setUser(updatedUser));
    } else {
      tempObject.title = "Ändringen misslyckades";
      tempObject.message = "Något fel med kopplingen till serven, försök igen";
      makeError(tempObject);
      showError(true);
      setLoading(false);
      return;
    }
  }

  async function updateUser() {
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
      setUpdate(false)
      setLoading(false);
      dispatch(userActions.setUser(updatedUser));
    } else {
      tempObject.title = "Ändringen misslyckades";
      tempObject.message = "Något fel med kopplingen till serven, försök igen";
      makeError(tempObject);
      showError(true);
      setLoading(false);
      return;
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
    setUpdate(false);
    setUpdatePassword(false);
  };

  return (
    <section className="user-information">
      {loading ? <div className="loading"></div> : ""}
      <div className="headline-user">
        <h2>Mina Uppgifter</h2>
      </div>
      {!update && !updatePassword ? (
        <section className="user-container">
          <div className="user-info">
            <p>Namn: </p>
            <p>{props.user.name}</p>
          </div>
          <div className="user-info">
            <p>E-mail: </p>
            <p>{props.user.email}</p>
          </div>
          <div className="user-info">
            <p>Tel.nr: </p>
            <p>{props.user.phoneNumber}</p>
          </div>
          <div className="button-container">
            <button className="change-btn" onClick={handlePassword}>
              Ändra lösenord
            </button>

            <button className="change-btn" onClick={handleUpdate}>
              Ändra uppgifter
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
              required
              defaultValue={props.user.name}
              onChange={(e) => handleName(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              defaultValue={props.user.email}
              onChange={(e) => handleEmail(e)}
            />
          </div>
          <div className="user-info">
            <label htmlFor="username">Tel.nr: </label>
            <input
              type="text"
              name="phonenum"
              id="phonenum"
              required
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
      {showAlert}
    </section>
  );
};

export default UserInformation;
