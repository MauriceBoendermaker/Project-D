import React from "react";

interface PopupProps {
  title: string;
  body: string;
  onFirstBtnClick: () => void;
  onSecondBtnClick?: () => void;
  onSave?: () => void;
  isVisible: boolean;
  firstButton: string;
  secondButton?: string;
}

export const Popup: React.FC<PopupProps> = ({
  title,
  body,
  onFirstBtnClick,
  onSecondBtnClick,
  isVisible,
  firstButton,
  secondButton,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onFirstBtnClick}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn-primary"
              onClick={onFirstBtnClick}
            >
              {firstButton}
            </button>
            {secondButton && (
              <button
                type="button"
                className="btn-primary"
                onClick={onSecondBtnClick}
              >
                {secondButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
