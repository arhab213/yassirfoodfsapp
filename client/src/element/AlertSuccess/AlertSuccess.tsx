import "./AlertSuccess.css";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface PropsType {
  message: string;
}
function AlertSuccess(props: PropsType) {
  let { message } = props;
  return (
    <>
      <Alert className="bg-green-200 border-green-50 text-emerald-500">
        <AlertTitle className="greens text-green-500 opacity-100 ">
          Let's go
        </AlertTitle>
        <AlertDescription className="text-green-500">
          {message}
        </AlertDescription>
      </Alert>
    </>
  );
}
export default AlertSuccess;
