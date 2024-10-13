import { useForm, SubmitHandler } from "react-hook-form";
import "./AdminResgistration.css";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function AdminRegistration() {
  interface FormType {
    fullname: {
      firstname: string;
      lastname: string;
    };
    DateOfBirth: string;
    email: string;
    password: string;
  }

  const { handleSubmit, register } = useForm<FormType>();

  const OnSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
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
                  <a className="register-option-link" href="/admin/logiin">
                    So Login
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

export default AdminRegistration;
