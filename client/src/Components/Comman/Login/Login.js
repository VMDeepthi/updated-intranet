import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Container, InputLabel, OutlinedInput, Paper, Typography, } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, LockPerson } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';

const Footer = () => {
  return (
    <Box
    component="footer"
    sx={{
      // backgroundColor:'white',
      background: 'linear-gradient(to bottom,  #cc66ff 0%, #ccccff 100%)',
      padding: '10px',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width:'100%'
    }}
      
    >
      <Typography variant="body2" color="textSecondary">
        Copyright © 2023 brightcomgroup. All Rights Reserved |{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </Typography>
    </Box>
  );
};


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


        backgroundImage: 'url("bcg.jpg ")', // Replace with the actual path to your background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <Grid
          container spacing={0} >
          <Grid item xs={12} sm={9} lg={7.5}>
            {/* <Paper> */}
  <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
    <img
      src='https://i.ibb.co/qMBQsK1/welcome-removebg-preview.png'
      alt='welcome'
      style={{ height: '100%', width: '300px', maxWidth: '100%', objectFit: 'contain'}}
    />
    
  </div> */}
  <Container sx={{ mt:1, justifyContent: 'center', alignItems: 'center', textAlign: 'justify' }}>
    <Typography variant="p" display="block"  fontSize={{xs:12,lg:17}} >
      Brightcom Group consolidates Ad-tech, New Media and IoT based businesses across the globe, primarily in the digital eco-system. Our divisions include Brightcom Media, VoloMP, Consumer Products and Dyomo. Brightcom Group?s consumer products division is focused on IoT. Our LIFE product is dedicated to the future of communication and information management in which everyday objects will be connected to the internet, also known as the ?Internet of Things? (IoT).
    </Typography>
    <Typography variant="p" mt={2} display="block"  fontSize={{xs:12,lg:17}} >
      Brightcom Group?s renowned global presence, including in the US, Israel, Latin America ME, Western Europe and Asia Pacific regions, positions us at the forefront of the digital landscape, enabling us to support partners in their efforts to leverage and benefit from current global trends. We have the technological platform and human knowledge to do so.
    </Typography>
    <Typography variant="p" mt={2} display="block"  fontSize={{xs:12,lg:17}} >
      Our clients include leading blue chip advertisers such as Airtel, British Airways, Coca-Cola, Hyundai Motors, ICICI Bank, ITC, ING, Lenovo, LIC, Maruti Suzuki, MTV, P&G, Qatar Airways, Samsung, Viacom, Sony, Star India, Vodafone, Titan, and Unilever. Publishers include Facebook, LinkedIn, MSN, Twitter, and Yahoo! Brightcom works with agencies like Havas Digital, JWT, Mediacom, Mindshare, Neo@Ogilvy, Ogilvy One, OMD, Satchi&Satchi, TBWA, and ZenithOptiMedia, to name a few.
    </Typography>
  </Container>
</Container>




            {/* </Paper> */}
          </Grid>



          <Grid display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} item xs={12} sm={12} lg={4} md={4}>

            <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 6, width: { xs: '35ch', lg: '45ch' },height: "90%", p: 2 }} >  {/*pr:2, pl:2 */}
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
                    style={{ backgroundColor: '#BF55EC', color: 'white' }} // Set background color to purple and text color to white
                    type='submit'
                    loading={loadLogin}
                    loadingPosition="end"
                    endIcon={<LoginIcon />}
                    variant="contained"
                  >
                   Login
                  </LoadingButton>

                </Box>
                <Button style={{color: '#002db3'}} onClick={() => navigate('/forgotpassword')} sx={{ m: 1 }}>forgot password?</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid >
        {Footer()}
      </Grid>
    </>
  );
}

export default Login;