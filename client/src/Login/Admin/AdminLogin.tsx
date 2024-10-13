import { SubmitHandler, useForm } from "react-hook-form";
import "./AdminLogin.css";
import { useState } from "react";

function AdminLogin() {
  interface FormUser {
    email: string;
    password: string;
  }
  let { handleSubmit, register } = useForm<FormUser>();
  const OnSubmit: SubmitHandler<FormUser> = (data) => {
    console.log(data);
  };
  return (
    <div id="login-container">
      <div className="login-parent">
        <div className="login-left-section">
          <img
            className="login-left-part-image"
            src="../../../images/imageSvg.svg"
            alt=""
          />
        </div>
        <div className="login-right-section">
          <div className=" login-big-title">
            <h3>Happy to see you again </h3>
          </div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="login-Form">
              <div className="login-middle-part">
                <input
                  {...register("email")}
                  className="login-email"
                  type="email"
                  placeholder="Enter your email"
                  lang="ar"
                />
                <input
                  {...register("password")}
                  type="password"
                  className="login-password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="login-bottom-part">
                <button
                  type="submit"
                  className="login-submit-button creat-account-button"
                >
                  submit
                </button>
                <div className="or-login-with-container">
                  <span className="left-line"></span>
                  <span className="or-login-with">Or login with</span>
                  <span className="right-line"></span>
                </div>
                <div className="other-options-login-container">
                  <button className="login-with-google">
                    <span className="login-with-google-icon">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/color/48/google-logo.png"
                        alt="google-logo"
                      />
                    </span>
                    <span className="login-with-google-text">Google</span>
                  </button>
                  <button className="login-with-apple">
                    <span className="login-with-apple-icon">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/mac-os.png"
                        alt="mac-os"
                      />
                    </span>
                    <span className="login-with-apple-text">Apple</span>
                  </button>
                </div>
                <div className="login-options">
                  <span className="login-option-text">
                    You don't have an account?{" "}
                  </span>
                  <a className="login-option-link" href="/admin/register">
                    So Register
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
