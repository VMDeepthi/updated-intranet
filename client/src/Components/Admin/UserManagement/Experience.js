import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {
  Popover, Paper, Typography, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
//import RoomIcon from '@mui/icons-material/Room';
import DateRangeIcon from '@mui/icons-material/DateRange';

import Box from '@mui/material/Box';

import NavBar from '../../Comman/NavBar/AdminNavBar';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { IconButton, Select } from '@mui/material';
import { Delete, Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
//import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';



// const handleCloseForm = () => {
//   setOpenForm(false);
// };
//const [openForm, setOpenForm] = useState(false);




// const handleAddIconClick = (event) => {
//    setAnchorEl(event.currentTarget);
//    setShowAddPositionPaper(true);
// };





//const [anchorEl, setAnchorEl] = useState(null);
//const [showAddPositionPaper, setShowAddPositionPaper] = useState(false);


const Experience = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddPositionPaper, setShowAddPositionPaper] = useState(false);
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    employee_id: '',
    designationTitle: '',
    description: '',
    date: '',
    designation: '',
    // startdate: '',  // Add startdate and responsibility to formData
    // responsibility: '',
  });


  const handleAddIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowAddPositionPaper(true);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
    setShowAddPositionPaper(false);
  };

  const handleAddPosition = () => {
    console.log('Add Position clicked');
    handleClosePopup();
  };

  const handleAddExperience = () => {
    console.log('Add Experience clicked');
    handleClosePopup();
  };
  const handleCancel = () => {
    setFormData({
      designation: '',
      startdate: '',
      responsibility: '',
    });
  };
  const handleDeleteAll = () => {
    setPositions([]);
  };
  const handleDeletePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [addexperience, setAddexperience] = useState({
    designation_title: '',
    start_date: [],
    description: [],
  });

  const [experienceData, setExperienceData] = useState({
    tempdesignation_title: '',
    tempstart_date: '',
    tempdescription: '',
  });


  const handleSavePosition = () => {
    const newPosition = { ...formData };
    setPositions((prevPositions) => [...prevPositions, newPosition]);
    setFormData({
      designation: '',
      startdate: '',
      responsibility: '',
    });
    toast.success('Data added successfully to the table!');
  };


  const [pageTypeView, setPageTypeView] = useState(false);


  // const YourComponent = () => {
  //   const [isPopupOpen, setPopupOpen] = useState(false);

  //   const handlePopupOpen = () => {
  //     setPopupOpen(true);
  //   };

  //   const handlePopupClose = () => {
  //     setPopupOpen(false);
  //   };

  const handleProccedToOption = (e) => {
    e.preventDefault();
    if (['experience', 'resign'].includes(formData.designationTitle) && formData.employee_id !== '') {
      setPageTypeView(true);
      //const response = await.axios.post('/api/saveFormData', formData)
     // axios.post('/api/saveFormData', formData)
      setFormData({
        id: '',
        employee_id: '',
        designationTitle: '',
        // description: '',
        // date: '',
        // designation: '',
      });
    }
    toast.success('Data added successfully to the form!');
  };


  
  // const checkPageTypeView=()=>{
  //   if(formData.designationTitle==='experience'){
  //     return experience
  //   }
  //   else if(formData.employee_id==='resign'){
  //     return resign

  //   }
  //   else{    
  //     return null
  //   }
  // }





  const handledesignationtionDataRemove = () => {
    setAddexperience({
      designation_title: '',
      start_date: [],
      description: [],
    });
    toast.warning('designation Data Deleted!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleResetExperienceForm = () => {
    setFormData({
      id: '',
      employee_id: '',
      designationTitle: '',
      description: '',
      date: '',
      designation: '',
    });

    const handledesignation = (event) => {
      setFormData({
        ...formData,
        designation: event.target.value,
      });
    };

    const dateInput = document.getElementById('outlined-adornment-date');
    if (dateInput) {
      dateInput.value = '';
    }
  };

  useEffect(() => {
    const data = addexperience.start_date.map((data, index) => {
      return {
        id: index + 1,
        title: addexperience.designationTitle[index],
        startdate: data,
        description: addexperience.start_date[index],
      };
    });
    setExperienceData(data);
  }, [addexperience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'date' ? value : value.trim(),
    }));
  };

  const columns = [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
      minWidth: '60px',
    },
    {
      name: 'designationTitle',
      selector: 'designationTitle',
      minWidth: '150px',
      center: true,
    },
    {
      name: 'description',
      selector: 'description',
      minWidth: '150px',
      center: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      center: true,
    },
    {
      minWidth: '10px',
      center: true,
      cell: (row) => <IconButton onClick={() => handleDeleteExperience(row)}><Delete /></IconButton>,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const handleDeleteExperience = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/api/experience/${row.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedExperienceData = experienceData.filter((item) => item.id !== row.id);
        setExperienceData(updatedExperienceData);
      } else {
        console.error('Failed to delete experience');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleexperienceSubmit = async (e) => {
    e.preventDefault();

    if (formData.employee_id !== '' && formData.designationTitle && addexperience.holidaddHolidays.start_date.length !== 0) {
      let msg = '';
      try {
        const result = toast.promise(
          axios.post('/api/addexperience', { formdata: formData, designationTitle: addexperience }),
          {
            pending: {
              render() {
                return 'Adding experience Details';
              },
            },
            success: {
              render(res) {
                msg = res.data.data;

                setFormData({
                  employee_id: '',
                  designationTitle: '',
                });
                setAddexperience({
                  designation_title: '',
                  start_date: [],
                  description: [],
                });
                setPageTypeView(false);

                return `${msg} `;
              },
            },
            error: {
              render(err) {
                return `${err.data.response.data}`;
              },
            },
          }
        );
        msg = result.data;
      } catch (err) {
        msg = err.response.data;
      }
    } else {
      toast.error('Add data properly!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };


  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, margin: '100px', mt: { xs: 6, md: 8, lg: 6 } }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={{ xs: 2, md: 2, lg: 2 }} m={1} style={{ display: 'flex' }}>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Typography variant='h5' component={'h5'} m={1} textAlign={'center'}>
                  Add Experience Form
                </Typography>
                <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: { xs: '55ch', md: '52ch', lg: '52ch' },width: { xs: '35ch', lg: '65ch' } }}>
                  <Box component={'form'} onSubmit={handleProccedToOption} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1, width: { xs: '30ch', lg: '45ch' } }}>
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-employeeid">Employee_id</InputLabel>
                      <OutlinedInput
                        name="employee_id"
                        required={true}
                        value={formData.employee_id}
                        type={'text'}
                        label="Employeeid"
                        placeholder="Enter Employeeid"
                        onChange={(e) => handleChange(e)}
                        inputProps={{
                          name: 'employee_id',
                          id: 'employee-id',
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-designation">Select Designation Type</InputLabel>
                      <Select
                        label="Designation"
                        name="designationTitle"
                        value={formData.designationTitle}
                        required
                        onChange={(e) => handleChange(e)}
                      >
                        <MenuItem value="experience">Experience</MenuItem>
                        <MenuItem value="resign">Resign</MenuItem>
                      </Select>
                    </FormControl>
                    <Stack spacing={5} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="outlined" color='success' type='submit' onClick={handleProccedToOption} >
                        Proceed
                      </Button>
                      <Button variant="outlined" color='error' onClick={handleResetExperienceForm}>
                        Clear
                      </Button>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={0} lg={0.5} md={1}>
                {/*spacing*/}
              </Grid>
              <Grid item xs={12} sm={12} lg={6} md={6}>
                <Typography variant='h5' component={'h5'} m={1} textAlign={'center'} >Experience Data</Typography>
                {pageTypeView && (
                  <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: { xs: '55ch', md: '52ch', lg: '52ch' }, width: { xs: '35ch', lg: '65ch' } }}>
                    <Box component={'form'} onSubmit={handleProccedToOption} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1, width: { xs: '30ch', lg: '45ch' } }}>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-designationTitle">
                          DesignationTitle
                        </InputLabel>
                        <OutlinedInput
                          name='designationTitle'
                          value={formData.designationTitle}
                          required={true}
                          id="designationtitle"
                          type={'text'}
                          label="DesignationTitle"
                          placeholder='Enter Designation Title'
                          onChange={(e) => handleChange(e)}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-description">Description</InputLabel>
                        <OutlinedInput
                          name='description'
                          value={formData.description}
                          required={true}
                          multiline
                          rows={4}
                          id="outlined-multiline-flexible"
                          label="Description"
                          placeholder='Enter Description'
                          onChange={(e) => handleChange(e)}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <TextField
                          fullWidth
                          type="date"
                          label="Date"
                          id="outlined-adornment-date"
                          value={formData.Date}
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>


                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-pastexperience">
                          PastExperience
                        </InputLabel>
                        <OutlinedInput
                          name="pastexperience"
                          value={formData.pastexperience}
                          required={true}
                          id="pastexperience"
                          type={'text'}
                          label="pastexperience"
                          placeholder="Enter past experience"
                          onChange={(e) => handleChange(e)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleAddIconClick}>
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopup}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        {/* <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary">
          <p onClick={handleAddPosition}>
              <CreateNewFolderIcon /> Add Position
            </p>
            <p onClick={handleAddExperience}>
              <DateRangeIcon /> Add Experience
            </p>
          </Typography>
        </Paper>
      </Popover>


      {showAddPositionPaper && (
  <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: { xs: '55ch', md: '52ch', lg: '52ch' }, width: { xs: '35ch', lg: '65ch' } }}>
    <Box component="form" onSubmit={handleProccedToOption} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1, width: { xs: '30ch', lg: '45ch' } }}>
      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
        <InputLabel required htmlFor="outlined-adornment-designation">
          Designation
        </InputLabel>
        <OutlinedInput
          name="designation"
          value={formData.designation}
          required={true}
          id="designation"
          type="text"
          label="Designation"
          placeholder="Enter Designation"
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          id="outlined-adornment-startdate"
          value={formData.startdate}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
        <InputLabel required htmlFor="outlined-adornment-responsibility">
          Responsibility
        </InputLabel>
        <OutlinedInput
          name="responsibility"
          value={formData.responsibility}
          required={true}
          id="responsibility"
          type="text"
          label="Responsibility"
          placeholder="Enter Responsibility"
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      {/* ... (rest of the JSX structure) */}
                        {/* <Stack direction="row" spacing={1} p={0.5}>
        <Button variant="outlined" color="error" size="small" onClick={handledesignationtionDataRemove} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="outlined" color="success" type="submit" size="small" endIcon={<SaveIcon />} onClick={handleexperienceSubmit}>
          Save
        </Button>
      </Stack>
    </Box>
  // </Paper> */}

                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            <p onClick={handleAddPosition}>
                              <CreateNewFolderIcon /> Add Position
                            </p>
                          </Typography>
                        </Paper>

                        {showAddPositionPaper && (
                          <Paper
                            elevation={5}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: { xs: '55ch', md: '52ch', lg: '52ch' },
                              width: { xs: '35ch', lg: '65ch' },
                            }}
                          >
                            <Box
                              component="form"
                              onSubmit={handleProccedToOption}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 1,
                                width: { xs: '30ch', lg: '45ch' },
                              }}
                            >
                              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <InputLabel required htmlFor="outlined-adornment-designation">
                                  Designation
                                </InputLabel>
                                <OutlinedInput
                                  name="designation"
                                  value={formData.designation}
                                  required={true}
                                  id="designation"
                                  type="text"
                                  label="Designation"
                                  placeholder="Enter Designation"
                                  onChange={(e) => handleChange(e)}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <TextField
                                  fullWidth
                                  type="date"
                                  label="Start Date"
                                  id="outlined-adornment-date"
                                  value={formData.StartDate}
                                  onChange={(e) => handleChange(e)}
                                  variant="outlined"
                                  InputLabelProps={{ shrink: true }}
                                  name="startdate"
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <InputLabel
                                  required
                                  htmlFor="outlined-adornment-responsibility"
                                >
                                  Responsibility
                                </InputLabel>
                                <OutlinedInput
                                  name="responsibility"
                                  value={formData.responsibility}
                                  required={true}
                                  id="responsibility"
                                  type="text"
                                  label="Responsibility"
                                  placeholder="Enter Responsibility"
                                  onChange={(e) => handleChange(e)}
                                />
                              </FormControl>
                              <Stack direction="row" spacing={1} p={0.5}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => setShowAddPositionPaper(false)}
                                  startIcon={<DeleteIcon />}
                                // onClick={handleCancel}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="success"
                                  type="submit"
                                  size="small"
                                  endIcon={<SaveIcon />}
                                  // onClick={handleProccedToOption}
                                  onClick={handleSavePosition}

                                >
                                  Save
  
                                
                                </Button>
                              </Stack>
                            </Box>
                          </Paper>
                        )}


                        {/* <div>
        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
        <br />
        <label>Start Date:</label>
        <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
        <br />
        <label>Responsibility:</label>
        <input type="text" name="responsibility" value={formData.responsibility} onChange={handleChange} />
        <br />
        <Button variant="outlined" color="primary" onClick={handleSavePosition}>
          Save
        </Button>
      </div> */}

                        {/* {positions.map((position, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            <p>
              <strong>Designation:</strong> {position.designation}
            </p>
            <p>
              <strong>Start Date:</strong> {position.startdate}
            </p>
            <p>
              <strong>Responsibility:</strong> {position.responsibility}
            </p>
            <Stack direction="row" spacing={1} p={0.5}>
             
            </Stack>
          </Typography>
        </Paper> */}
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Designation</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Responsibility</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {positions.map((position, index) => (
                                <TableRow key={index}>
                                  <TableCell>{position.designation}</TableCell>
                                  <TableCell>{position.startdate}</TableCell>
                                  <TableCell>{position.responsibility}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => handleDeletePosition(index)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Popover>
                      {/* ))} */}
                      {/* <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add Position</DialogTitle>
        <DialogContent>
          {/* Your form content goes here */}
                      {/* <FormControl fullWidth variant="outlined"> */}
                      {/* Add your form fields here */}
                      {/* </FormControl> */}
                      {/* </DialogContent> */}
                      {/* <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleCloseForm} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions> */}
                      {/* </Dialog> */}
                      {/* <Dialog open={isPopupOpen} onClose={handlePopupClose}>
                          <DialogTitle>Add Item</DialogTitle>
                          <DialogContent>
                            
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handlePopupClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handlePopupClose} color="primary">
                              Add
                            </Button>
                          </DialogActions>
                        </Dialog> */}

                      {/* </Popover> */}
                      {experienceData.length > 0 && (
                        <>
                          <Typography>{`Employee ID: ${formData.employee_id}`}</Typography>
                          <Typography>{`Designation Title: ${formData.designationTitle}`}</Typography>

                        </>
                      )}
                      <Stack direction="row" spacing={1} p={0.5} >
                        <Button variant="outlined" color='error' size='small' onClick={handledesignationtionDataRemove} startIcon={<Delete />}>
                          Delete
                        </Button>
                        <Button variant="outlined" color='success' type='submit' size='small' endIcon={<Save />} onClick={handleexperienceSubmit} >
                          Save
                        </Button>
                        {/* <Button variant="outlined" color="primary" onClick={handleSavePosition}>
          Save
        </Button> */}
                      </Stack>
                    </Box>
                  </Paper>

                )}
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Experience;