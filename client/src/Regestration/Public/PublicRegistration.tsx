function PublicRegistration() {
  return (
    <>
      <div className="parent">
        <div className="left-section"></div>
        <div className="right-section">
          <div className=" big-title">
            <h3>Join our community</h3>
          </div>
          <div className="Form">
            <div className="top-part">
              <input type="first-name-input" placeholder="first-name" />
              <input type="last-name-input" placeholder="last-name" />
            </div>
            <div className="middle-part">
              <input type="email" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />
              {/*Getting checkbox from shadCN*/}
            </div>
            <div className="bottom-part">
              <button className="submit-button creat-account-button">
                Creat button
              </button>
              <div className="or-register-with-container">
                <span className="left-line"></span>
                <span className="r-register-with">Or register with</span>
                <span className="right-line"></span>
              </div>
              <div className="other-options-registration-container">
                <button className="register-with-google">
                  <span className="register-with-google-icon"></span>
                  <span className="register-with-google-text">Google</span>
                </button>
                <button className="register-with-apple">
                  <span className="register-with-apple-icon"></span>
                  <span className="register-with-apple-text">Apple</span>
                </button>
              </div>
            </div>
            <div className="bottom-part"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicRegistration;
