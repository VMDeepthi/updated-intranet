
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import { Navigate, useNavigate } from 'react-router-dom';
// import UserContext from '../../context/UserContext';

// import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Container, InputLabel, OutlinedInput, Paper, Typography, } from '@mui/material';

// import LoadingButton from '@mui/lab/LoadingButton';
// import { AccountCircle, LockPerson, Visibility, VisibilityOff } from '@mui/icons-material';
// import LoginIcon from '@mui/icons-material/Login';
// import { UserAccessContext } from '../../context/UserAccessContext';

// const Footer = () => {
//   return (
//     <Box
//     component="footer"
//     sx={{
//       // backgroundColor:'white',
//       background: 'linear-gradient(to bottom,  #cc66ff 0%, #ccccff 100%)',
//       padding: '10px',
//       textAlign: 'center',
//       position: 'fixed',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       width:'100%'
//     }}

//     >
//       <Typography variant="body2" color="textSecondary">
//         Copyright © 2023 brightcomgroup. All Rights Reserved |{' '}
//         <a href="/privacy-policy">Privacy Policy</a>.
//       </Typography>
//     </Box>
//   );
// };


// function Login() {
//   const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loadLogin, setLoadLogin] = useState(false);
//   const { handleUserDetails } = useContext(UserContext);
//   const {updateAccess} = useContext(UserAccessContext)
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = () => setShowPassword(!showPassword);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoadLogin(true);

//     axios
//       .post('/api/login', loginDetails)
//       .then((res) => {
//         setLoadLogin(false);
//         handleUserDetails(res.data);
//         updateAccess()
//         navigate('/', { replace: true });
//       })
//       .catch((err) => {
//         toast.error(err.response.data);
//         setLoadLogin(false);
//       });
//   };

//   if (Cookies.get('USERAUTHID') !== undefined) {
//     return <Navigate to="/" replace={true} />;
//   }

//   return (
//     <>

//       <Grid container spacing={2} mt={1} paddingLeft={5} sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 'auto', // Adjust the height as needed
//         width: 'auto',
//         p: 1,
//         position: 'absolute',
//         top: 0, left: 0, right: 0, bottom: 0,
//         margin: '2px',


//         backgroundImage: 'url("bcg.jpg ")', // Replace with the actual path to your background image
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//       }}>

// <Grid container spacing={0} mb={6} >
// <Grid item xs={12} lg={12}>
// {/* <Typography color={'#4B4747'} fontFamily={'Istok Web'} mb={3} component={'p'} sx={{ fontSize: { xs: '20px', lg: '45px' }, textAlign: { lg: 'center' },color: '#f720db'}} variant={'p'} > <span>Welcome To Grightcom Group</span>
//   </Typography> */}
//    <Typography color={'#4B4747'} fontFamily={'Miso-Light'} mb={3} component={'p'} sx={{ fontSize: { xs: '20px', lg: '50px' }, textAlign: { xs :'center',lg: 'center' }, backgroundImage: 'linear-gradient(to bottom, #f26deb ,#fc72e5,#e04fbc, #50048f, #4b12e6, #3152f7)', WebkitBackgroundClip: 'text', color: 'transparent',}} variant={'p'} > <span>Welcome To Brightcom Group </span>
//   </Typography>
// </Grid>
// {/* <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, mb: 3}}>
//                       <img src='bcglogo.png' alt='logo' style={{ width: '390px', height: '85px' }} />
//                     </Box>
//                   </Grid> */}


//         <Grid
//           container spacing={0} >
//           <Grid item xs={12} sm={9} lg={7.5}>
//             {/* <Paper> */}
//   <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

//   <Container sx={{ mt:1, justifyContent: 'center', alignItems: 'center', textAlign: 'justify' }}>
//     <Typography variant="p" display="block"  fontSize={{xs:12,lg:16.5}} >
//       Brightcom Group consolidates Ad-tech, New Media and IoT based businesses across the globe, primarily in the digital eco-system. Our divisions include Brightcom Media, VoloMP, Consumer Products and Dyomo. Brightcom Group?s consumer products division is focused on IoT. Our LIFE product is dedicated to the future of communication and information management in which everyday objects will be connected to the internet, also known as the ?Internet of Things? (IoT).
//     </Typography>
//     <Typography variant="p" mt={2} display="block"  fontSize={{xs:12,lg:16.5}} >
//       Brightcom Group?s renowned global presence, including in the US, Israel, Latin America ME, Western Europe and Asia Pacific regions, positions us at the forefront of the digital landscape, enabling us to support partners in their efforts to leverage and benefit from current global trends. We have the technological platform and human knowledge to do so.
//     </Typography>
//     <Typography variant="p" mt={2} display="block"  fontSize={{xs:12,lg:16.5}} >
//       Our clients include leading blue chip advertisers such as Airtel, British Airways, Coca-Cola, Hyundai Motors, ICICI Bank, ITC, ING, Lenovo, LIC, Maruti Suzuki, MTV, P&G, Qatar Airways, Samsung, Viacom, Sony, Star India, Vodafone, Titan, and Unilever. Publishers include Facebook, LinkedIn, MSN, Twitter, and Yahoo! Brightcom works with agencies like Havas Digital, JWT, Mediacom, Mindshare, Neo@Ogilvy, Ogilvy One, OMD, Satchi&Satchi, TBWA, and ZenithOptiMedia, to name a few.
//     </Typography>
//   </Container>
// </Container>




//             {/* </Paper> */}
//           </Grid>



//           <Grid display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} item xs={12} sm={12} lg={4} md={4}>

//           <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 6, width: { xs: '35ch', lg: '45ch' },height: "96%", pr:2, pl:2, mt:1, ml:2}} >  {/*pr:2, pl:2 */}
//               {/* <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}> */}
//               <Box
//                 component="form"
//                 onSubmit={handleLogin}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   height: '100%',
//                   padding: '10px',

//                 }}
//               >

//                 <Grid container spacing={1} alignItems="center">
//                   <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, m: 1 }}>
//                       <img src='bcglogo.png' alt='logo' style={{ width: '250px', height: '50px' }} />
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <AccountCircle sx={{ color: 'action.active', mr: 1, fontSize: { xs: 30, sm: 35, md: 40 } }} />   {/*{my: 0.5} */}
//                       <FormControl sx={{ m: 1, width: { xs: '100%' } }} variant="outlined">
//                         <InputLabel required >Email</InputLabel>
//                         <OutlinedInput
//                           autoComplete='username'
//                           onInput={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
//                           required={true}

//                           type={'email'}
//                           label="Email"
//                         />
//                       </FormControl>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <LockPerson sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: { xs: 30, sm: 35, md: 40 } }} />
//                       <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
//                         <InputLabel required>Password</InputLabel>
//                         <OutlinedInput
//                           onInput={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
//                           required={true}
//                           autoComplete='current-password'
//                           type={showPassword?'text':'password'}
//                           endAdornment={
//                             <InputAdornment position="end">
//                               <IconButton

//                                 onClick={handleClickShowPassword}
//                                 onMouseDown={handleMouseDownPassword}
//                                 edge="end"
//                               >
//                                 {showPassword ? <Visibility /> : <VisibilityOff />}
//                               </IconButton>
//                             </InputAdornment>
//                           }
//                           label="Password"
//                         />
//                       </FormControl>
//                     </Box>
//                   </Grid>
//                 </Grid>
//                 <Box m={1}>

//                   <LoadingButton
//                     style={{ backgroundColor: '#BF55EC', color: 'white' }} // Set background color to purple and text color to white
//                     type='submit'
//                     loading={loadLogin}
//                     loadingPosition="end"
//                     endIcon={<LoginIcon />}
//                     variant="contained"
//                   >
//                    Login
//                   </LoadingButton>

//                 </Box>
//                 <Button style={{color: '#002db3'}} onClick={() => navigate('/forgotpassword',{relative:true})} sx={{ m: 1 }}>forgot password?</Button>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid >
//         {Footer()}
//       </Grid>
//       </Grid>
//     </>
//   );
// }
// export default Login;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Container, InputLabel, OutlinedInput, Paper, Typography, Stack, } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, LockPerson, Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { UserAccessContext } from '../../context/UserAccessContext';
import Marquee from 'react-fast-marquee';


function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loadLogin, setLoadLogin] = useState(false);
  const { handleUserDetails } = useContext(UserContext);
  const { updateAccess } = useContext(UserAccessContext)
  const navigate = useNavigate();

  const [time, setTime] = useState({ clock: '', day: '' })
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const date = new Date()
  //     const day = dateFormat(date)
  //     const time = date.toLocaleTimeString(undefined, { hour12: true });
  //     setTime({day:day,clock:time})
  //     setCurrentTime(new Date());

  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);


  function dateFormat(date) {
    const options = {

      day: 'numeric',
      year: 'numeric',
      month: 'long',
      weekday: 'long',

    };
    const formate = date.toLocaleDateString('en-CA', options).replace(/ /g, ',').split(',').filter(x => x !== "")
    //console.log(formate,date.toLocaleDateString('en-CA', options).replace(/ /g, ',').split(',').filter(x => x !== ""))
    const day = formate[2]
    let formated_day;
    switch (day) {
      case '1':
        formated_day = '1st'
        break
      case '2':
        formated_day = '2nd'
        break
      case '3':
        formated_day = '3rd'
        break
      default:
        formated_day = `${day}th`
        break

    }
    formate[2] = formated_day

    //console.log(formated_day)
    return `${formate[0]} ${formate[2]} ${formate[1]}, ${formate[3]}`

  }

  // const time = currentTime.toLocaleTimeString(undefined, { hour12: true });
  // const day = dateFormat(currentTime)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadLogin(true);

    axios.post('/api/login', loginDetails)
      .then((res) => {
        setLoadLogin(false);
        handleUserDetails(res.data);
        updateAccess()
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

      <Grid container >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '13px solid transparent', borderImage: 'linear-gradient(135deg, #7873f5 10%, #ec77ab  100%);', borderImageSlice: 1, borderRadius: '10px' }} >
            <img style={{ objectFit: 'contain', width: '220px', height: '60px' }} src='bcglogo.png' alt='norecordfound' />
            {/* <Stack spacing={-0.5}>
              <Typography variant="subtitle1" color={'ButtonText'} style={{ textAlign: "center", justifyContent: "center", alignItems: 'center', color: 'gray', fontSize: '20px' }}>
                {time.clock}
              </Typography>
              <Typography variant='subtitle2' color={'ButtonText'} sx={{ color: 'gray' }}>{time.day} </Typography>

            </Stack> */}
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12} >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }} >
            <img style={{ marginTop: 'auto', objectFit: 'contain', maxWidth: '100%', maxHeight: '500px' }} src='x4.gif' alt='norecordfound' />
          </Box>

        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>

          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2 }}>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',


              }}
            >
              <Stack spacing={1} direction={'row'}>
                <>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, fontSize: 35 }} />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel size='small' required >Email</InputLabel>
                      <OutlinedInput
                        autoComplete='username'
                        size='small'
                        onInput={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                        required={true}


                        type={'email'}
                        label="Email"
                      />
                    </FormControl>
                  </Box>

                </>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <LockPerson sx={{ color: 'action.active', mr: 0.5, fontSize: 35 }} />
                  <FormControl fullWidth sx={{ width: '100%' }} variant="outlined">
                    <InputLabel size='small' required>Password</InputLabel>
                    <OutlinedInput
                      onInput={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                      required={true}
                      autoComplete='current-password'
                      type={showPassword ? 'text' : 'password'}
                      size='small'
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton

                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LoadingButton
                    style={{ backgroundColor: '#1771f5', color: 'white' }} // Set background color to purple and text color to white
                    type='submit'
                    loading={loadLogin}
                    loadingPosition="end"


                    endIcon={<LoginIcon fontSize='small' />}
                    variant="contained"
                  >
                    Login
                  </LoadingButton>
                </Box>

              </Stack>
            </Box>

            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

              <Button style={{ color: '#002db3', }} onClick={() => navigate('/forgotpassword', { relative: true })} sx={{ m: 1 }}>forgot password?</Button>

            </Container>
            <Paper elevation={24} sx={{ p: 1,  }}>
                    

              <Box sx={{ p: 0.5, mt: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'justify', maxWidth: '600px', height: '350px', fontFamily: 'Miso-Light' }}>
                <Typography component={'h3'} color={'#ff34ee'} fon variant='p' textAlign={'center'}>WELCOME TO BRIGHTCOMGROUP</Typography>
                <Box sx={{ fontSize: '13px', color: '#212529' }}>
                  <Typography variant="p" display="block" mt={1}  >
                    Brightcom Group consolidates Ad-tech, New Media and IoT based businesses across the globe, primarily in the digital eco-system. Our divisions include Brightcom Media, VoloMP, Consumer Products and Dyomo. Brightcom Group?s consumer products division is focused on IoT. Our LIFE product is dedicated to the future of communication and information management in which everyday objects will be connected to the internet, also known as the ?Internet of Things? (IoT).
                  </Typography>
                  <Typography variant="p" mt={2} display="block"   >
                    Brightcom Group?s renowned global presence, including in the US, Israel, Latin America ME, Western Europe and Asia Pacific regions, positions us at the forefront of the digital landscape, enabling us to support partners in their efforts to leverage and benefit from current global trends. We have the technological platform and human knowledge to do so.
                  </Typography>
                  <Typography variant="p" mt={2} display="block"   >
                    Our clients include leading blue chip advertisers such as Airtel, British Airways, Coca-Cola, Hyundai Motors, ICICI Bank, ITC, ING, Lenovo, LIC, Maruti Suzuki, MTV, P&G, Qatar Airways, Samsung, Viacom, Sony, Star India, Vodafone, Titan, and Unilever. Publishers include Facebook, LinkedIn, MSN, Twitter, and Yahoo! Brightcom works with agencies like Havas Digital, JWT, Mediacom, Mindshare, Neo@Ogilvy, Ogilvy One, OMD, Satchi&Satchi, TBWA, and ZenithOptiMedia, to name a few.
                  </Typography>
                  <Marquee style={{maxWidth:'100%'}}>
                  <Stack spacing={3} display={'flex'} justifyContent={'center'} direction={'row'}>
                    <img style={{ objectFit: 'contain', width: '120px', height: '80px' }} src='brightcommedia.png' alt='norecordfound' />
                    <img style={{ objectFit: 'contain', width: '120px', height: '80px' }} src='VOLOMP.png' alt='norecordfound' />
                    <img style={{ objectFit: 'contain', width: '120px', height: '80px' }} src='LilProjects.png' alt='norecordfound' />
                    <img style={{ objectFit: 'contain', width: '120px', height: '80px' }} src='dyomo.png' alt='norecordfound' />


                  </Stack>
                  </Marquee>
                </Box>
              </Box>
              

            </Paper>

          </Box>

        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            component="footer"
            sx={{
              // backgroundColor:'white',
              background: 'linear-gradient(135deg, #7873f5 10%, #ec77ab  100%);',
              padding: '10px',
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%'
            }}

          >
            <Typography variant="body2" color="white">
              Copyright © 2024 brightcomgroup. All Rights Reserved | Privacy Policy.
            </Typography>
          </Box>



        </Grid>
      </Grid>





    </>
  )
}

export default Login

