import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Modal = ({ isShowing, hide, content }) =>
  isShowing
    ? ReactDOM.createPortal(
        <div id="modal--focus">
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => hide()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>{content}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null

export default Modal
