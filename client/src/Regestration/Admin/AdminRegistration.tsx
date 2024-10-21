import { useForm, SubmitHandler } from "react-hook-form";
import "./AdminResgistration.css";
import Exporting from "@/CONFIG";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useContexts } from "@/Context/context";
import AlertError from "@/element/AlertError/AlertError";
import AlertSuccess from "@/element/AlertSuccess/AlertSuccess";

let { Errors } = Exporting;
function AdminRegistration() {
  //defining setters of errors and success messages
  interface FormType {
    fullname: {
      firstname: string;
      lastname: string;
    };
    DateOfBirth: string;
    email: string;
    password: string;
  }

  let { post, SetIsError, SetIsSuccess, isError, isSuccess, StoreToken } =
    useContexts();
  const { handleSubmit, register } = useForm<FormType>();
  useEffect(() => {
    if (isError && isError != "") {
      setTimeout(() => {
        SetIsError("");
      }, 3000);
    }
    if (isSuccess && isSuccess != "") {
      setTimeout(() => {
        SetIsSuccess("");
      }, 3000);
    }
  }, [isError, isSuccess]);
  const OnSubmit: SubmitHandler<FormType> = async (data) => {
    const res = await post(data, "register-admin");
    if (res && typeof res != "string" && res.message && !res.token) {
      SetIsError(Errors[`${res.message}`]);
    }
    if (res && typeof res != "string" && res.message && res.token) {
      StoreToken(res.token);
      SetIsSuccess(res.message);
    }
  };

  return (
    <div id="container">
      <div className="parent">
        <div className="left-section">
          <img
            className="left-part-image"
            src="../../../images/imageSvg.svg"
            alt=""
          />
        </div>
        <div className="right-section">
          <div className=" big-title">
            <h3>Grow your orders with Yassir </h3>
          </div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="Form">
              <div className="top-part">
                <input
                  {...register("fullname.firstname")}
                  className="first-name-input"
                  placeholder="Firstname"
                />
                <input
                  {...register("fullname.lastname")}
                  className="last-name-input"
                  placeholder="Lastname"
                />
              </div>
              <div className="middle-part">
                <input
                  className="date-of-birth"
                  {...register("DateOfBirth")}
                  type="date"
                  placeholder="Enter your date of birth"
                />
                <input
                  {...register("email")}
                  className="email"
                  type="email"
                  placeholder="Enter your email"
                  lang="ar"
                />
                <input
                  {...register("password")}
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="policy-and-terms-container">
                <div className="items-top  flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium text-writingcolor leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                </div>
              </div>
              <div className="bottom-part">
                <button
                  type="submit"
                  className="submit-button creat-account-button"
                >
                  submit
                </button>
                <div className="or-register-with-container">
                  <span className="left-line"></span>
                  <span className="or-register-with">Or register with</span>
                  <span className="right-line"></span>
                </div>
                <div className="other-options-registration-container">
                  <button className="register-with-google">
                    <span className="register-with-google-icon">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/color/48/google-logo.png"
                        alt="google-logo"
                      />
                    </span>
                    <span className="register-with-google-text">Google</span>
                  </button>
                  <button className="register-with-apple">
                    <span className="register-with-apple-icon">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/mac-os.png"
                        alt="mac-os"
                      />
                    </span>
                    <span className="register-with-apple-text">Apple</span>
                  </button>
                </div>
                <div className="register-options">
                  <span className="register-option-text">
                    You already have an account?{" "}
                  </span>
                  <a className="register-option-link" href="/admin/login">
                    So Login
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="satatus-handling-container">
        {isError && isError != "" ? (
          <div className="Error-handling visibleError">
            <AlertError message={isError} />
          </div>
        ) : (
          <div className="Error-handling hiddenError">
            <AlertError message={isError} />
          </div>
        )}

        {isSuccess && isSuccess != "" ? (
          <div className="Succes-handeling visibleSuccess">
            <AlertSuccess message={isSuccess} />
          </div>
        ) : (
          <div className="Succes-handeling hiddenSuccess">
            <AlertSuccess message="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRegistration;
