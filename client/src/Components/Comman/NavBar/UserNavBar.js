
import { styled } from '@mui/material/styles';
//import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
//import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import { Avatar, Fade } from '@mui/material';
//import CompanyManagementPages from '../CompanyPagesManagement/AddCompanyManagementPages';

import UserContext from '../../context/UserContext';
//import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AccountBalanceWallet, AccountBox, ExpandLess, ExpandMore, ForwardToInbox, LockOpen, Logout, WorkHistory, WorkOff } from '@mui/icons-material';
import { CgListTree } from 'react-icons/cg';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

}));

// drawer width
const drawerWidth = 280;



export default function UserNavBar(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const navigate = useNavigate()

  const { window } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { userDetails } = useContext(UserContext)

  const [openLeavesMenu, setOpenLeavesMenu] = useState(false)


  const handleSubMenuOpen = (item) => {

    setDrawerOpen(true)
    switch (item) {
      case "leaves":
        setOpenLeavesMenu(true)
        break

      default:
        setDrawerOpen(false)

    }
  }

  const handleDrawerToggle = () => {
    //
    console.log(drawerOpen)
    setDrawerOpen(!drawerOpen);
  };








  // const handleSubMenuClose = (item) => {
  //   setDrawerOpen(false)
  //   switch(item){
  //     case 'company management':
  //       setOpenCompanyManagementMenu(false)
  //       break
  //     case 'company pages management':
  //       setOpenCompanyPageManagementMenu(false)
  //       break
  //     default:
  //       setDrawerOpen(false)

  //     }

  // }


  const handleNavigation = (index) => {
    const navList = ['/', '/attendance']
    navigate(navList[index])
    setDrawerOpen(false)
  }
  const iconList = [<DashboardCustomizeIcon />, <EventAvailableIcon />]


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/logout')
      toast.success(res.data)
      navigate('/login', { replace: true })
    }
    catch {
      toast.error('error occured!')

    }

  }




  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >


      <MenuItem onClick={() => navigate('/myprofile')}>
        <ListItemIcon>
          <AccountBox fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => navigate('/changepassword')}>
        <ListItemIcon>
          <LockOpen fontSize="small" />
        </ListItemIcon>
        Change Password
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            <Link href="/" underline="none">
              <img src='bcglogo.png' alt='logo' style={{ marginTop: '5px', marginLeft: '10px', width: '50%' }} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="black">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="black"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="black"
            >
              {userDetails.profile_pic === '' ? <AccountCircle /> : <Avatar sx={{ width: 24, height: 24 }} src={userDetails.profile_pic} />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="black"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        container={container}

        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth - 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth - 200,
            boxSizing: 'border-box',
          },
        }}

        anchor="left"

      >
        <List sx={{ mt: 8 }}>
          {['Dashboard', 'Attendance'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation(index)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {iconList[index]}
                </ListItemIcon>

              </ListItemButton>
            </ListItem>
          ))}
          {/*----------------------------------Leaves---------------------------*/}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleSubMenuOpen('leaves')}>
            <ListItemButton
              title={'Leaves'}
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <WorkOff />

              </ListItemIcon>
              {openLeavesMenu ? <ExpandLess /> : <ExpandMore />}

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/historylog')}>
            <ListItemButton
              title={'History Log for all Application'}
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <WorkHistory />

              </ListItemIcon>


            </ListItemButton>
          </ListItem>

          {/* ------------------------------------------reporting structure-------------------------------- */}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/reportingstructure')}>
            <ListItemButton
              title={'View Reporting Structure'}
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CgListTree fontSize={20} />

              </ListItemIcon>


            </ListItemButton>
          </ListItem>

          <Divider />

        </List>

      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{

          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}

      >
        <List sx={{ mt: 8 }}>
          {['Dashboard', 'Attendance'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation(index)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {iconList[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          {/*--------------------------------------Leaves----------------------------------*/}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setOpenLeavesMenu(!openLeavesMenu)} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'initial',
                  alignItems: 'center'
                }}

              >
                <WorkOff />
              </ListItemIcon>
              <ListItemText primary={'Leaves'} />
              {openLeavesMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {openLeavesMenu ? <>
              <Divider />
              <Fade in={openLeavesMenu} >
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/applyleave')}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}

                      >
                        <ForwardToInbox />
                      </ListItemIcon>
                      <ListItemText primary={'Apply Leave'} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'flex' }} >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}

                      >
                        <AccountBalanceWallet />
                      </ListItemIcon>
                      <ListItemText primary={'Balance Leaves'} />
                    </ListItemButton>
                  </ListItem>

                </List>
              </Fade>
            </> : null}

          </ListItem>

          {/*----------------------------------History Log Of All application---------------------------*/}



          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/historylog')} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                }}
              >
                <WorkHistory />
              </ListItemIcon>
              <ListItemText primary={'History Log for all Application'} />
            </ListItemButton>
          </ListItem>

          {/* ------------------------------------------reporting structure-------------------------------- */}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/reportingstructure')} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                }}
              >
                < CgListTree fontSize={20} />
              </ListItemIcon>
              <ListItemText primary={'View Reporting Structure'} />
            </ListItemButton>
          </ListItem>



        </List>

      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
