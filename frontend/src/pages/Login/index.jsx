import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { getItem, setItem } from "../../utils/Storage";
import { getRoute, postRoute } from "../../service/myApi";

const theme = createTheme();

const CustomizedInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1.8rem",
  },
  "& label": {
    fontSize: "1.6rem",
    backgroundColor: "#fff",
    padding: "0 0.5rem",
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  getRoute();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.username.trim() === "" || !form.password) {
      return toast.error("Todos os campos são obrigatórios");
    }
    try {
      const { data, ok } = await postRoute("/login", {
        username: form.username,
        password: form.password,
      });
      if (!ok) {
        return toast.error(data.message);
      }

      setItem("token", data.access_token);
      setItem("remember", form.rememberMe);
      if (form.rememberMe) {
        setItem("username", form.username);
        setItem("password", form.password);
      }
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      return toast.error(
        "Não foi posível conectar no momento, tente novamente em alguns minutos"
      );
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleFormValue(e) {
    if (e.target.name === "rememberMe") {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  const username = getItem("username");
  const rememberMe = getItem("remember");
  useEffect(() => {
    if (rememberMe) {
      setForm({
        username: username,
        password: getItem("password"),
        rememberMe: false,
      });
    } else{
      setForm({
        username: "",
        password: "",
        rememberMe: false,
      });
    }
  }, [username,rememberMe]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate={true}
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <CustomizedInput
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={form.username}
                onChange={handleFormValue}
              />
              <CustomizedInput
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleFormValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.rememberMe}
                    color="primary"
                    name="rememberMe"
                    onChange={handleFormValue}
                  />
                }
                label="Lembrar"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
