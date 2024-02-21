
import { styled } from '@mui/material/styles';
//import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
//import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
//import MailIcon from '@mui/icons-material/Mail';
//import NotificationsIcon from '@mui/icons-material/Notifications';
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
import BusinessIcon from '@mui/icons-material/Business';
import { AccountBalanceWallet, AccountBox, AddAPhoto, AddAlert, AddPhotoAlternate, AdsClick, Announcement, BadgeRounded, Balance, BrowseGallery, Campaign, Description, EventAvailable, ExpandLess, ExpandMore, ForwardToInbox, GroupAdd, LocalLibrary, LockOpen, LockReset, Logout, ManageHistory, NoteAdd, PersonAdd, Send, Settings, SupervisedUserCircle, TrendingUp, UploadFile, WorkHistory, WorkOff } from '@mui/icons-material';


import { CgListTree } from 'react-icons/cg'
import { Collapse } from '@mui/material';

import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import { useContext, useState } from 'react';
import { Avatar } from '@mui/material';
import UserContext from '../../context/UserContext';
//import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import CompanyManagementPages from '../CompanyPagesManagement/AddCompanyManagementPages';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

}));

// drawer width
const drawerWidth = 270;



export default function AdminNavBar(props) {



  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate()

  const { window, userIntroTour } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    //console.log(drawerOpen)
    setExpandedPage('')
    setDrawerOpen(!drawerOpen);

  };

  const [expandedPage, setExpandedPage] = useState('')

  const [pageAccessed, setPageAccessed] = useState(['dashbord', 'addcompany',])


  const handleExpand = (page) => {
    //console.log(page,expandedPage)
    if (!drawerOpen) {
      setDrawerOpen(true)
    }
    setExpandedPage(expandedPage === page ? '' : page)

  }

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
    catch (err) {
      console.log(err)
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
      {userIntroTour !== undefined ?
        <MenuItem onClick={() => userIntroTour()}>
          <ListItemIcon>
            <AdsClick fontSize="small" />
          </ListItemIcon>
          Intro Tour
        </MenuItem> : null
      }
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
  const { userDetails } = useContext(UserContext)


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
              <img src='https://res.cloudinary.com/dozj3jkhe/image/upload/v1701168256/intranet/gdyr4cwcrsn9z1ercoku.png' alt='logo' style={{ marginTop: '5px', marginLeft: '10px', width: '50%' }} />
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
              className='account-menu'
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
        <Box sx={{ overflowX: 'hidden' }} >
          <List sx={{ mt: 7 }} className='navigation-menu'>
            {['Dashboard', 'Attendance'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation(index)}>
                <ListItemButton
                  title={text}
                  sx={{
                    minHeight: 45,
                    justifyContent: 'center',
                    px: 1.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 'auto',

                      justifyContent: 'center',
                    }}
                  >
                    {iconList[index]}
                  </ListItemIcon>

                </ListItemButton>
              </ListItem>
            ))}
            {/*----------------------------------Leaves---------------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Leaves')}>
              <ListItemButton
                title={'Leaves'}
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',

                    justifyContent: 'center',

                  }}
                >
                  <WorkOff />

                </ListItemIcon>
                {expandedPage === 'Leaves' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>
            </ListItem>


            {/*----------------------------------History Log Of All applications---------------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/historylog')}>
              <ListItemButton
                title={'History Log for all Application'}
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

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
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}
                >
                  <CgListTree fontSize={20} />

                </ListItemIcon>


              </ListItemButton>
            </ListItem>

            <Divider sx={{ fontSize: 12, fontWeight: 'bold' }}>Admin</Divider>
            {/*------------------------company Management---------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Company Management')}>
              <ListItemButton
                title='Company Management'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <BusinessIcon />
                </ListItemIcon>
                {expandedPage === 'Company Management' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />
            {/*------------------------company pages Management---------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Company Page Management')}>
              <ListItemButton
                title='Company Pages Management'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <LocalLibrary />
                </ListItemIcon>
                {expandedPage === 'Company Page Management' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />
            {/*------------------------user Management---------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('User Management')}>
              <ListItemButton
                title='User Management'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <SupervisedUserCircle />
                </ListItemIcon>
                {expandedPage === 'User Management' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />
            {/*--------------------announcement-------------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Announcements')}>
              <ListItemButton
                title='Announcement'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <Campaign />
                </ListItemIcon>
                {expandedPage === 'Announcements' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />

            {/*--------------------announcement-------------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Manage Office Gallery')}>
              <ListItemButton
                title='Manage Office Gallery'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <AddPhotoAlternate />
                </ListItemIcon>
                {expandedPage === 'Manage Office Gallery' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />

            {/*------------------------leave Management---------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Leave Management')}>
              <ListItemButton
                title='Leave Management'
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <ManageHistory />
                </ListItemIcon>
                {expandedPage === 'Leave Management' ? <ExpandLess /> : <ExpandMore />}

              </ListItemButton>

            </ListItem>
            <Divider />

          </List>
        </Box>

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
        <Box sx={{ overflow: 'auto', height: 'auto' }}>
          <List sx={{ mt: 8 }}>
            {['Dashboard', 'Attendance'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation(index)}>
                <ListItemButton
                  sx={{
                    minHeight: 45,
                    justifyContent: 'center',
                    px: 1.5,
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
                  <ListItemText primary={<Typography sx={{ fontSize: 15 }}>{text}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
            {/*--------------------------------------Leaves----------------------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Leaves')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',

                  }}

                >
                  <WorkOff />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Leaves</Typography>} />
                {expandedPage === 'Leaves' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedPage === 'Leaves'} timeout={'auto'} unmountOnExit>
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/applyleave')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <ForwardToInbox />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Apply Leave</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'flex' }} onClick={() => navigate('/balanceleaves')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <AccountBalanceWallet />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Balance Leaves</Typography>} />
                    </ListItemButton>
                  </ListItem>

                </List>
              </Collapse>

            </ListItem>
            {/*----------------------------------History Log Of All application---------------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/historylog')}  >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
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
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>History Log for all Application</Typography>} />
              </ListItemButton>
            </ListItem>
            {/* --------------------reporting structure-------------------------------------------- */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/reportingstructure')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
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
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Reporting Structure</Typography>} />
              </ListItemButton>
            </ListItem>
            <Divider > Admin Features </Divider>
            {
              pageAccessed.includes('addcompany') || pageAccessed.includes('viewcompany')

                ?
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Company Management')} >
                  <ListItemButton
                    sx={{
                      minHeight: 45,
                      justifyContent: 'center',
                      px: 1.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',

                      }}

                    >
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Company Management</Typography>} />
                    {expandedPage === 'Company Management' ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Divider />

                  <Collapse in={expandedPage === 'Company Management'} timeout="auto" unmountOnExit>
                    <List>
                      {
                        pageAccessed.includes('addcompany')
                          ?
                          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/addcompany')}>
                            <ListItemButton
                              sx={{
                                minHeight: 45,
                                justifyContent: 'center',
                                px: 1.5,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  ml: 3,
                                  justifyContent: 'center',

                                }}

                              >
                                <AddBusinessIcon />
                              </ListItemIcon>
                              <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Add Company</Typography>} />
                            </ListItemButton>
                          </ListItem>
                          : null
                      }
                      {
                        pageAccessed.includes('viewcompany')
                          ?
                          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/viewcompany')}>
                            <ListItemButton
                              sx={{
                                minHeight: 45,
                                justifyContent: 'center',
                                px: 1.5,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  ml: 3,
                                  justifyContent: 'center',

                                }}

                              >
                                <StoreIcon />
                              </ListItemIcon>
                              <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Company</Typography>} />
                            </ListItemButton>
                          </ListItem>
                          : null

                      }



                      <Divider />
                    </List>

                  </Collapse>

                </ListItem>
                : <>
                </>
            }


            {/*-----------comapany pages Management-------------------*/}

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Company Page Management')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',

                  }}

                >
                  <LocalLibrary />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Company Page Management</Typography>} />
                {expandedPage === 'Company Page Management' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider />

              <Collapse in={expandedPage === 'Company Page Management'} timeout="auto" unmountOnExit>
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/addcompanypages")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <NoteAdd />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Add Company Page</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewcompanypages")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <Description />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Company Page </Typography>} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </List>

              </Collapse>

            </ListItem>
            {/*---------------user manegement-----------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('User Management')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',

                  }}

                >
                  <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>User Management</Typography>} />
                {expandedPage === 'User Management' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider />

              <Collapse in={expandedPage === 'User Management'} timeout={'auto'} unmountOnExit>
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/adduser")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}
                      >
                        <PersonAdd />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Add User</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewusers")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <BadgeRounded />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Users</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/experience")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <TrendingUp />
                      </ListItemIcon>
                      <ListItemText primary={'Experience'} />
                    </ListItemButton>
                  </ListItem>

                  <Divider />
                </List>

              </Collapse>

            </ListItem>
            {/*---------------Announcement-----------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Announcements')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',

                  }}

                >
                  <Campaign />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Announcements</Typography>} />
                {expandedPage === 'Announcements' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider />

              <Collapse in={expandedPage === 'Announcements'} timeout={'auto'} unmountOnExit>
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/addannouncement")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}
                      >
                        <AddAlert />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Add Announcement</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewannouncements")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <Announcement />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Announcement</Typography>} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </List>

              </Collapse>

            </ListItem>

            {/*---------------Manage Office Gallery------------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() =>handleExpand('Manage Office Gallery')} >
              <ListItemButton
                sx={{ minHeight: 45, justifyContent: 'center', px: 1.5, }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center', }} >
                  <AddPhotoAlternate />
                </ListItemIcon>
                <ListItemText primary={'Manage Office Gallery'} />
                {expandedPage === 'Manage Office Gallery' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider />
              <Collapse in={expandedPage === 'Manage Office Gallery'} timeout={'auto'} unmountOnExit>
                  <List>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/upload-gallery")}>
                      <ListItemButton
                        sx={{ minHeight: 45, justifyContent: 'center', px: 1.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: 3, ml: 3, justifyContent: 'center', }}>
                          <AddAPhoto />
                        </ListItemIcon>
                        <ListItemText primary={'Upload Gallery '} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/view-gallery")}>
                      <ListItemButton sx={{ minHeight: 45, justifyContent: 'center', px: 1.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: 3, ml: 3, justifyContent: 'center', }} >
                          <BrowseGallery />
                        </ListItemIcon>
                        <ListItemText primary={'View Gallery '} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </List>

                </Collapse>
              

            </ListItem>

            {/*---------------leave manegement-----------------------*/}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleExpand('Leave Management')} >
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: 'center',
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',

                  }}

                >
                  <ManageHistory />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Leave Management</Typography>} />
                {expandedPage === 'Leave Management' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider />

              <Collapse in={expandedPage === 'Leave Management'} timeout={'auto'} unmountOnExit>
                <List>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/uploadattendance")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}
                      >
                        <UploadFile />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Upload Attendance</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewattendance")}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <EventAvailable />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Attendance</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/createreportingstructure')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >

                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Create Reporting Structure</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/viewreportingstructure')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        < CgListTree fontSize={20} />

                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>View Reporting Structure</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/historylog-admin')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <WorkHistory />

                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>History Log for all applications</Typography>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/manage-balance-leaves')}>
                    <ListItemButton
                      sx={{
                        minHeight: 45,
                        justifyContent: 'center',
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          ml: 3,
                          justifyContent: 'center',

                        }}

                      >
                        <Balance />

                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontSize: 15 }}>Manage Balance Leaves</Typography>} />
                    </ListItemButton>
                  </ListItem>


                  <Divider />
                </List>

              </Collapse>

            </ListItem>



          </List>
        </Box>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
      <ToastContainer />
    </>
  );
}
