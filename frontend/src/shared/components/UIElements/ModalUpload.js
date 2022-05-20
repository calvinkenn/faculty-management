import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./ModalUpload.css";

const ModalUploadOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.logo && (
            <div className="upload">
              {props.upload}
              <div className="actions">
                {props.save}
                {props.cancel}
              </div>
            </div>
          )}
          {!props.logo && (
            <div className="profile-upload">
              {props.upload}
              {props.save}
              {props.cancel}
            </div>
          )}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ModalUpload = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalUploadOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default ModalUpload;
