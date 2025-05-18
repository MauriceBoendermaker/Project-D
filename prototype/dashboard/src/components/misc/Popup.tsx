import React from "react";

interface PopupProps {
  title: string;
  body: string;
  onClose?: () => void;
  onSave?: () => void;
  isVisible: boolean;
}

export const Popup: React.FC<PopupProps> = ({
  title,
  body,
  onClose,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content custom-modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button type="button" className="btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
