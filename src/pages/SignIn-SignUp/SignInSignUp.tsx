import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { fetchData } from "../../helpers/helperFunctions";
import { useUser } from "../../context/UserContext/UserContext";
import LogoWithText from "../../components/LogoWithText";

const useStyles = makeStyles((theme?: any) => ({
  mainContainer: {
    minHeight: "100vh",
    maxWidth: "500px",
    width: "85% ",
    paddingBottom: "10px",
    marginLeft: "auto ",
    marginRight: "auto",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    letterSpacing: "10px !important",
    margin: "70px 0 30px !important",
  },
  button: {
    margin: "60px 0 20px !important",

    width: "150px",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
};
const SignInSignUp = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const classes = useStyles();
  const [formData, setFromData] = useState(defaultFormData);
  const [visiblePass, setVisiblePass] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUserHandler, setUserAvatarHandler } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setFromData(defaultFormData);
    setUsernameErrorMsg("");
    setPasswordErrorMsg("");
  }, [pathname]);

  const handleFormData = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;
    setFromData({ ...formData, [name]: value });
  };

  const validateUsernameHandler = (user: string) => {
    setUsernameErrorMsg("");
    const mailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (user.length === 0) {
      setUsernameErrorMsg("This is a required field");
      return false;
    } else if (!mailReg.test(user)) {
      setUsernameErrorMsg("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePasswordHandler = (pass: string) => {
    const passLengthReg = /^.{8,32}$/;
    const passCharReg = /[!@#$%^&*]/;

    setPasswordErrorMsg("");
    if (!passLengthReg.test(pass)) {
      setPasswordErrorMsg(
        "The password's length must be between 8 and 32 characters."
      );
      return false;
    } else if (!passCharReg.test(pass)) {
      setPasswordErrorMsg("The password must contain a special character.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    validateUsernameHandler(formData.username);
    validatePasswordHandler(formData.password);
    e.preventDefault();
    if (
      !validateUsernameHandler(formData.username) ||
      !validatePasswordHandler(formData.password) ||
      loading
    )
      return;
    setLoading(true);
    try {
      const data = await fetchData("https://randomuser.me/api/");
      setUserAvatarHandler(data.results[0].picture.thumbnail);
      localStorage.setItem("userAvatar", data.results[0].picture.thumbnail);
      setLoading(false);
      setError(false);
      if (currentLocation === "/") {
        setUserHandler(true);
        localStorage.setItem("isUserSingedIn", "true");
      } else {
        navigate("/welcome");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.mainContainer}>
      <LogoWithText />
      <Typography variant="h5" align="center" className={classes.heading}>
        {currentLocation === "/" ? "SIGN IN" : "SIGN UP"}
      </Typography>
      <TextField
        helperText={usernameErrorMsg ? usernameErrorMsg : ""}
        style={{ marginBottom: "25px" }}
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleFormData}
        fullWidth
        error={usernameErrorMsg ? true : false}
        onBlur={() => {
          formData.username.length > 0 &&
            validateUsernameHandler(formData.username);
          formData.username.length === 0 && setUsernameErrorMsg("");
        }}
      />
      <TextField
        helperText={passwordErrorMsg ? passwordErrorMsg : ""}
        value={formData.password}
        id="outlined-basic"
        variant="outlined"
        label="Password"
        color="primary"
        name="password"
        fullWidth
        type={visiblePass ? "text" : "password"}
        onChange={handleFormData}
        error={passwordErrorMsg ? true : false}
        onBlur={() => {
          formData.password.length > 0 &&
            validatePasswordHandler(formData.password);
          formData.password.length === 0 && setPasswordErrorMsg("");
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              style={{ position: "absolute", right: "10px" }}
              onClick={() => setVisiblePass(!visiblePass)}
            >
              {visiblePass ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
      />
      {!loading ? (
        <Button
          color="primary"
          type="submit"
          className={classes.button}
          variant="contained"
        >
          {currentLocation === "/" ? "SIGN IN" : "SIGN UP"}
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          className={classes.button}
          variant="contained"
        >
          Loading...
        </Button>
      )}
      {error && (
        <Alert style={{ marginBottom: "20px" }} severity="error">
          An error occurred, Please try again.
        </Alert>
      )}
      <Typography
        variant="subtitle2"
        display="block"
        gutterBottom
        color="textSecondary"
        align="center"
      >
        {currentLocation === "/"
          ? "Don't have account yet?"
          : "Already have an account?"}
      </Typography>
      <Link
        to={currentLocation === "/" ? "/sign-up" : "/"}
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          color="primary"
          align="center"
        >
          {currentLocation === "/"
            ? "Sign up now! It's free!"
            : "Sign in please!"}
        </Typography>
      </Link>
    </form>
  );
};

export default SignInSignUp;
