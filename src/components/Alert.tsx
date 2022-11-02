type Props = {
  errorTitle: string | null;
  errorMessage: string | null;
  showError: <SetStateAction>(Boolean: any) => any;
};

const Alert = (props: Props) => {
  function closeError(e: any): void {
    e.preventDefault();
    props.showError(false);
  }

  return (
    <div className="blurrDiv">
      <div className="alert">
        <div className="alert-header">
          <p className="alert-header-title">Något gick fel:</p>
        </div>
        <p className="errorMessage">{props.errorTitle}</p>
        <p className="errorClarification">{props.errorMessage}</p>
        <button onClick={(e) => closeError(e)} className="errorOk">
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
