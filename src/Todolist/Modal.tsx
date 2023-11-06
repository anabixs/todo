import "./assets/todo.css";
export default function Modal({ isOpen, onClose, children }) {
  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal-window">
          <a onClick={onClose} className="close">
            X
          </a>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  }
}
