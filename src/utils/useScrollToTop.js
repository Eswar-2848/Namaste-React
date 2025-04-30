import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (ref) => {
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [location]);
};

export default useScrollToTop;
