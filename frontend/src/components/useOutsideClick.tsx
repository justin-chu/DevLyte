import { useCallback, useEffect, useRef } from "react";

export const useOutsideClick = (myFunction: () => void) => {
  const ref = useRef(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      myFunction();
    }
  }, []);
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any)?.contains(e.target)) {
        myFunction?.();
      }
    },
    [ref.current]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);
  return ref;
};
