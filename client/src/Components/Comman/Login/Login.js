import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Container, InputLabel, OutlinedInput, Paper, Typography, } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, LockPerson, Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loadLogin, setLoadLogin] = useState(false);
  const { handleUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadLogin(true);

    axios
      .post('/api/login', loginDetails)
      .then((res) => {
        setLoadLogin(false);
        handleUserDetails(res.data);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoadLogin(false);
      });
  };

  if (Cookies.get('USERAUTHID') !== undefined) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <style>
        {`
          html, body {
            overflow: hidden;
            margin: 0;
            padding: 0;
          }

          #root {
            height: 100%;
          }

          .no-scroll-bars {
            overflow: hidden;
          }
        `}
      </style>

      <Grid container spacing={2} mt={1} paddingLeft={5} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto', // Adjust the height as needed
        width: 'auto',
        p: 1,
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        margin: '2px',


        backgroundImage: 'url("bcg.jpg")', // Replace with the actual path to your background image
        backgroundSize: 'cover',
        objectFit:'contain',
        backgroundRepeat: 'no-repeat',
      }}>
        <Grid item xs={12} sm={6} md={6} lg={7}>

          <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
              <Typography color={'#4B4747'} fontFamily={'Miso-Light'} component={'p'} sx={{ fontSize: { xs: '50px', lg: '47px', md: '30px' }, textAlign: { lg: 'left' }, paddingLeft: '0px', }} variant={'p'}>
                <span style={{ backgroundImage: 'linear-gradient(to right, #e04fbc, #50048f)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Intranet<br></br></span><span style={{ color: '#4B4747' }}></span>
              </Typography>
              <Typography variant="p" display="block" fontWeight={'bold'} fontSize={13} >
              Discover. Explore. Connect.
              </Typography>
            </div>
            <Container sx={{ mt: 2, justifyContent: 'center', alignItems: 'center', textAlign: 'justify' }}>
              
              <Typography variant="p" mt={2} display="block" fontWeight={'bold'} fontSize={13} >
                Brightcom Group?s renowned global presence, including in the US, Israel, Latin America ME, Western Europe and Asia Pacific regions, positions us at the forefront of the digital landscape, enabling us to support partners in their efforts to leverage and benefit from current global trends. We have the technological platform and human knowledge to do so.
              </Typography>
              <Typography variant="p" mt={2} display="block" fontWeight={'bold'} fontSize={13} >
                Our clients include leading blue chip advertisers such as Airtel, British Airways, Coca-Cola, Hyundai Motors, ICICI Bank, ITC, ING, Lenovo, LIC, Maruti Suzuki, MTV, P&G, Qatar Airways, Samsung, Viacom, Sony, Star India, Vodafone, Titan, and Unilever. Publishers include Facebook, LinkedIn, MSN, Twitter, and Yahoo! Brightcom works with agencies like Havas Digital, JWT, Mediacom, Mindshare, Neo@Ogilvy, Ogilvy One, OMD, Satchi&Satchi, TBWA, and ZenithOptiMedia, to name a few.
              </Typography>
            </Container>
          </Container>

        </Grid>

        <Grid item xs={12} md={6} lg={4} margin={6}>
          <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 6, width: { xs: '35ch', lg: '45ch' }, p: 2 }} >  {/*pr:2, pl:2 */}
            {/* <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}> */}
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '10px',

              }}
            >

              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, m: 1 }}>
                    <img src='bcglogo.png' alt='logo' style={{ width: '250px', height: '50px' }} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, fontSize: { xs: 30, sm: 35, md: 40 } }} />   {/*{my: 0.5} */}
                    <FormControl sx={{ m: 1, width: { xs: '100%' } }} variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput
                        onInput={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                        required={true}
                        id="outlined-adornment-email"
                        type={'email'}
                        label="Email"
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockPerson sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: { xs: 30, sm: 35, md: 40 } }} />
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        onInput={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                        required={true}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box m={1}>

                <LoadingButton
                  color="success"
                  type='submit'
                  loading={loadLogin}

                  loadingPosition="end"
                  endIcon={<LoginIcon />}
                  variant="contained"
                >
                  <span>Login</span>
                </LoadingButton>
              </Box>
              <Button onClick={() => navigate('/forgotpassword')} sx={{ m: 1 }}>forgot password?</Button>
            </Box>
          </Paper>

          {/* </Container> */}
        </Grid>
        {/* </Box> */}

        {/* </Grid> */}
      </Grid >

    </>
  );
}

export default Login;