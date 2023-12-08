import { ReactNode } from "react";
import "./assets/todo.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
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
