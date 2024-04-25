import { useEffect } from 'react';

function useOutsideAlerter(ref, onClose) {
  useEffect(() => {
    function handleInteractionOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleInteractionOutside);
    document.addEventListener("touchstart", handleInteractionOutside);

    return () => {
      document.removeEventListener("mousedown", handleInteractionOutside);
      document.removeEventListener("touchstart", handleInteractionOutside);
    };
  }, [ref, onClose]);
}

export default useOutsideAlerter;
