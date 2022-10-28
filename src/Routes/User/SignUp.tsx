import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as userActions } from "../../features/userReducer";
import { User } from "../../models/types";
import "../../styles/_userForm.scss";
import formLogo from "../../assets/formLogo.svg";
import Alert from "../../components/Alert";
import "../../styles/_alert.scss";

const SignUp = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
  let tempObject = { title: "", message: "" };

  const navigate = useNavigate();

  const newUser: User = {
    name: userName,
    email: userEmail,
    accountId: "",
    phoneNumber: userPhone,
    admin: false,
    password: userPassword,
  };
  async function addUser() {
    if (
      newUser.name.length < 1 ||
      newUser.email.length < 1 ||
      newUser.phoneNumber.length < 1
    ) {
      setLoading(false);
      tempObject.title = "Inga personuppgifter";
      tempObject.message =
        "Ordern går inte skicka utan personuppgifter, fyll i och skicka igen";
      makeError(tempObject);
      showError(true);
      return;
    }
    setLoading(true);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) {
      setLoading(false);
      dispatch(userActions.setUser(data.user));
      localStorage.setItem("accountId", data.user.accountId);
      navigate("/menu");
    } else {
      setLoading(false);
      tempObject.title = "Kontot finns redan.";
      tempObject.message =
        "Du kan inte skapa kontot för något av kontouppgifterna finns redan.";
      makeError(tempObject);
      showError(true);
      return;
    }
  }

  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault();

    addUser();
  };

  const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.value !== " ") {
      setUserName(e.target.value);
    }
  };

  const handleEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPassword(e.target.value);
  };

  const handlePhone: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPhone(e.target.value);
  };

  return (
    <div className="signup">
      {loading ? <div className="loading"></div> : ""}
      <button className="small__btn" onClick={() => navigate(-1)}>
        Tillbaka
      </button>
      <figure className="form__logo">
        <img src={formLogo} alt="logo" />
      </figure>
      <form className="userForm">
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="text"
            name="username"
            required
            onChange={(e) => {
              handleName(e);
            }}
          />
          <label className="form__label form__label--info" htmlFor="username">
            Användarnamn
          </label>
        </div>
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="password"
            name="password"
            required
            onChange={(e) => {
              handlePassword(e);
            }}
          />
          <label className="form__label form__label--info" htmlFor="password">
            Lösenord
          </label>
        </div>
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="email"
            name="email"
            required
            onChange={(e) => {
              handleEmail(e);
            }}
          />
          <label className="form__label form__label--info" htmlFor="email">
            Email
          </label>
        </div>
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="number"
            name="phoneNumber"
            required
            onChange={(e) => {
              handlePhone(e);
            }}
          />
          <label className="form__label form__label--info" htmlFor="phonNumber">
            Telefonnummer
          </label>
        </div>
        <button
          className="big__btn signup__btn"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Skapa konto
        </button>
      </form>
      {showAlert}
    </div>
  );
};

export default SignUp;
