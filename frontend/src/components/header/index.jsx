import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoute } from "../../service/myApi";
import { clearAll, getItem, removeItem } from "../../utils/Storage";
import "./styles.css";

const pages = ["Home", "Cats", "Dogs", "Clients"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [username, setUsername] = useState("username");
  const token = getItem("token");
  const remember = getItem("remember");
  const navigate = useNavigate();

  const handleLogout = () => {
    if(remember==="true"){
      removeItem("token");
    }else{
      clearAll()
    }
    toast.success("Até a próxima.")
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page="") => {
    setAnchorElNav(null);
    if (page) {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  useEffect(() => {
    async function getName() {
      try {
        const {data,ok } = await getRoute("/user/me",token)
        if(!ok){
          toast.error(data)
          return navigate("/")
        }
        return setUsername(data.username)
      } catch (error) {
        return toast.error;
      }
    }
    getName()
  }, [token]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--primary)",
        padding: "0rem 2rem",
        marginBottom: "4rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sharenergy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={()=>handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  id={page}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sharenergy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                id={page}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1.6rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <section className="infoContainer">
              <span>{username}</span>
              <button type="button" onClick={handleLogout}>
                <LogoutIcon fontSize="large" />
              </button>
            </section>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
