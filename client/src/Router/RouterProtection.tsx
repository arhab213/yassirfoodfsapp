import { useNavigate } from "react-router";
import { useEffect } from "react";
let navigate = useNavigate();
interface PropType {
  children?: React.ReactNode;
}

function RouterProtection(props: PropType): null | JSX.Element {
  let { children } = props;
  useEffect(() => {
    if (
      !window.sessionStorage.user.isAdmin ||
      !JSON.parse(window.sessionStorage.user).isAdmin
    ) {
      navigate("/admin-registration");
    }
  }, [navigate]);
  return <>{children}</>;
}

export default RouterProtection;
