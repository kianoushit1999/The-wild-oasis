import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { HiXCircle } from "react-icons/hi";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  border-radius: 1rem;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const cntx = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <cntx.Provider value={{ openName, open, close }}>{children}</cntx.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(cntx);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(cntx);
  const ref = useRef();

  useEffect(() => {
    function clickHandler(e) {
      if (!ref.current.contains(e.target)) {
        close();
      }
    }

    document.addEventListener("click", clickHandler, true);

    return () => document.removeEventListener("click", clickHandler, true);
  }, [close]);

  if (openName != name) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXCircle />
        </Button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
