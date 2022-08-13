import styles from "./Modal.module.scss";
import Container from "components/Container";
import useScrollBarWidth from "hooks/useScrollBarWidth";
import { useEffect } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

export default function Modal({
  isOpen,
  close,
  className,
  overlayClassName,
  label,
  children,
}) {
  const scrollBarWidth = useScrollBarWidth();

  // Simulate second click on the overlay, because modal stays open after first one
  useEffect(() => {
    function handleClick(e) {
      if (e.target.classList.contains(overlayClassName)) {
        e.target.click();
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [isOpen, overlayClassName]);

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.overflow = isOpen ? "hidden" : "unset";
    bodyStyle.marginRight = isOpen ? `${scrollBarWidth}px` : "unset";

    return () => {
      bodyStyle.overflow = "unset";
      bodyStyle.marginRight = "unset";
    };
  }, [isOpen, scrollBarWidth]);

  return (
    <ReactModal
      className={className}
      overlayClassName={overlayClassName}
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel={label}
      shouldReturnFocusAfterClose={false}
    >
      <Container>{children}</Container>
    </ReactModal>
  );
}
