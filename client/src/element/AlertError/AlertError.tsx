import "./AlertError.css";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface PropsTypes {
  message?: string;
}
function AlertError(props: PropsTypes) {
  let { message } = props;
  return (
    <>
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle className="opacity-100">Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </>
  );
}
export default AlertError;
