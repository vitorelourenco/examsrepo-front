import { useEffect } from "react";

export default function useDragAndDrop() {
  function preventDefault(e) {
    e.preventDefault();
  }

  useEffect(() => {
    window.addEventListener("drop", preventDefault);
    return window.removeEventListener("drop", preventDefault);
  }, []);
}
