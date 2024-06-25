import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';
import { Checkbox, FormControlLabel, Grid, Paper } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [buttonDisable, setBtnDisabled] = useState(false)

  const handleSubmit = async (event) => {

    event.preventDefault();
    setBtnDisabled(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const isLoggedin = await axios.post(`${apiUrl}/user/login`, payload);
      if (isLoggedin) {
        Cookies.set('firstName', isLoggedin.data.firstName);

        login(isLoggedin.data.userRole, isLoggedin.data.token)

        switch (isLoggedin.data.userRole) {
          case 'admin': //store
            toast.success('Login Success as the admin')
            navigate('/admin/home');
            break;
          case 'inventory': //store
            toast.success('Login Success as the Inventory Manager')
            navigate('/inventory/home');
            break;
          case 'order': //store
            toast.success('Login Success as the Order Manager')
            navigate('/order/home');
            break;
          case 'supplier': //store
            toast.success('Login Success as the Supplier Manager')
            navigate('/supplier/home');
            break;
          case 'customer': //customer
            toast.success('Login Success as a Customer')
            navigate('/customer/home');
            break;
          case 'news': //news
            toast.success('Login Success as the News Manager')
            navigate('/news/home');
            break;
          case 'delivery': //delivery
            toast.success('Login Success as the Delivery Manager')
            navigate('/delivery/home');
            break;
          case 'staff': //staff
            toast.success('Login Success as the Staff Manager')
            navigate('/staff/home');
            break;
          case 'driver': //driver
            toast.success('Login Success as a Driver')
            navigate('/driver/home');
            break;
          case 'feedback': //feedback
            toast.success('Login Success as the Feedback Manager')
            navigate('/feedback/home');
            break;
        }
        window.location.reload();
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error.response.data.message);
    } finally {
      setBtnDisabled(false);
    }



  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            mx={'auto'}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        navigate('/signup');
                      }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}