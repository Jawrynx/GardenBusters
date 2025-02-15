import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function ButtonAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {["Home", "Services", "About", "Contact", "Testimonials"].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Keep the IconButton for the menu icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GardenBusters {/* Replace 'News' with your site title */}
          </Typography>

          {/* Add your navigation links */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/services">
              Services
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
            <Button color="inherit" component={Link} to="/testimonials">
              Testimonials
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add the drawer for the mobile menu */}
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ id: 'nav-links' }}
      >
        {list()}
      </Drawer>
    </Box>
  );
}