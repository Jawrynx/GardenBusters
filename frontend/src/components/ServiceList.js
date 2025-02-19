import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

function ServiceList() {
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  },[]);

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

  return (
    <div id='service-list'>
      <Paper
        sx={{
          p: 2,
          width: "90%",
          backgroundColor: "lightgray",
        }}
      >
        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Link
                to={`/services/${service.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{height: 480}}>
                  <div>
                    <Typography level="title-lg">{service.title}</Typography>
                    <Typography level="body-sm">{service.sub_heading}</Typography>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="200px">
                    {service.images && service.images.length > 0 && ( // Check if images exist
                      <img
                        src={service.images[0].image} // Display the first image
                        loading="lazy"
                        alt={service.title}
                      />
                    )}
                  </AspectRatio>
                  <CardContent orientation="horizontal" sx={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                      <Typography level="body-xs">Description:</Typography>
                      <Typography sx={{ fontSize: 'sm', fontWeight: 'lg' }}>{service.description}</Typography>
                    </div>
                    <Button
                      variant="solid"
                      size="md"
                      color="primary"
                      aria-label={service.title}
                      sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

export default ServiceList;