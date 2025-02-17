import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

function ServiceList() {
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services/");
        console.log(response);
        setServices(response.data);
      } catch (error) {
        console.log("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  },);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark"? "#1A2027": "#fff",
  ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  // Display only the first service
  const service = services;

  if (!service) {
    return <div>No services found.</div>;
  }

  return (
    <Box sx={{ width: "90%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServiceList;