const env = {
  VITE_APP_LOCAL: import.meta.env["VITE_APP_LOCAL"],
  VITE_APP_HOST: import.meta.env["REAC_APP_HOST"],
} as const;
type ErrorsType = { [key: string]: any };
const Errors: ErrorsType = {
  "error 1": "shops collecting operation is pending",
  "error 2": "you need more required field, fail to add your shop",
  "error 3": "the shop haven't been deleted ",
  "error 4": "server failed to update the item",
  "error 5": "one of the both index mate be not created",
  "error 6": "server failed to add the shop",
  "error 7": "user not found",
  "error 8": "user haven't been created",
  "error 9": "need to fill required fields of user ",
  "error 10": "failed to update user",
  "error 11": "failed to delete user",
  "error 12": "user doesn't exist or password is inccorect",
  "error 13": "failed to create a token",
  "error 14": "redirect to login for new token",
  "error 15": "redicrect to register",
  "error 16":
    "this email have been already used if you have an account please login",
  "error 17": "the shop that you search doesn't exist",
  "error 18": "change the field that you want to update it is already used",
};

let Exporting = {
  env,
  Errors,
};
export default Exporting;
