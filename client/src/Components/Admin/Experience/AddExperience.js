import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from '../../Comman/NavBar/AdminNavBar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Select } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

const AddExperience = () => {
  const [state, setState] = useState({
    anchorEl: null,
    showAddPositionPaper: false,
    formData: {
      // id: '',
      employee_id: '',
      designationType: '',
      current_designation: '',
      date_of_joining: '',
      promotion_title: '',
      from_date: '',
      rolesandresponsibilities: ''
    },
    addexperience: {
      start_date: [],
      rolesandresponsibilities: '',
    },
    experienceData: {
      tempdesignation_title: '',
      tempstart_date: '',
      temprolesandresponsibilities: '',
    },
    pageTypeView: false,
    empdata: {},
  });

  const handleClosePopup = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: null,
      showAddPositionPaper: false,
    }));
  };

  const handleAddPosition = () => {
    console.log('Add Position clicked');
    handleClosePopup();
  };

  const open = Boolean(state.anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleProceedToOption = (e) => {
    e.preventDefault();

    const { formData } = state;

    if (['experience', 'resign'].includes(formData.designationType) && formData.employee_id !== '') {
      const url = '/api/checkempexperience';
      axios
        .post(url, { employee_id: formData.employee_id })
        .then((response) => {
          // console.log(response);
          console.log('Success:', response.data);

          const { data } = response;
          setState((prevState) => ({
            ...prevState,
            formSubmitted: true,
            empdata: data.data,
            formData: {
              ...formData,
              current_designation: data.data.designation,
              date_of_joining: data.data.date_of_joining
                ? new Date(data.data.date_of_joining).toISOString().split('T')[0]
                : '',
            },
            pageTypeView: true,
          }));
          console.log('Experience data added successfully:', data.message);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          console.error('Error details:', error.response);


          toast.error('Please enter a valid employee ID!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
    } else {
      // Display toast error message for missing employee ID
      toast.error('Please enter a valid employee ID!', {
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

  const handleResetExperienceForm = () => {
    setState((prevState) => ({
      ...prevState,
      formData: {
        // id: '',
        employee_id: '',
        designationType: '',
        current_designation: '',
        date_of_joining: '',
        promotion_title: '',
        from_date: '',
        rolesandresponsibilities: ''
      },
    }));

    const dateInput = document.getElementById('outlined-adornment-date');
    if (dateInput) {
      dateInput.value = '';
    }
  };



  const handleChange = (e) => {
    console.log('Input value:', e.target.value);
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        // promotion_title: e.target.value,
        [name]: value
       
      },
    }));
  };

  const handleexperienceSubmit = async (e) => {
    e.preventDefault();
    const { empdata, formData } = state;

    if (
      empdata &&
      empdata.employee_id !== '' &&
      empdata.current_designation !== '' &&
      empdata.date_of_joining.length !== 0
    ) {
      try {
        const result = await axios.post('/api/AddExperience', {
          formdata: {
            employee_id: empdata.employee_id,
            designation_type: state.formData.designationType,
            current_designation: state.formData.current_designation,
            date_of_joining: state.formData.date_of_joining,
            promotion_title: state.formData.promotion_title,
            from_date: state.formData.from_date,
            rolesandresponsibilities: state.formData.rolesandresponsibilities,
          },
        });

        toast.success(`${result.data.data}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setState((prevState) => ({
          ...prevState,
          formData: {
            employee_id: '',
            current_designation: '',
            date_of_joining: '',
            promotion_title: '',
            from_date: '',
            rolesandresponsibilities: ''
          },
          addexperience: {
            designation_type: '',
            start_date: [],
            rolesandresponsibilities: '',
          },
          pageTypeView: false,
        }));
      } catch (err) {
        toast.error(`${err.response.data}`, {
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
                <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: { xs: '55ch', md: '52ch', lg: '50ch' }, width: { xs: '30ch', lg: '55ch' }, mb: 1 }}>
                  <Box component={'form'} onSubmit={handleProceedToOption} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '30ch', lg: '45ch' } }}>

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-employeeid">
                        Employee_id
                      </InputLabel>
                      <OutlinedInput
                        name="employee_id"
                        required={true}
                        value={state.formData.employee_id}
                        type={'text'}
                        label="Employeeid"
                        placeholder="Enter Employeeid"
                        onChange={(d) => handleChange(d)}
                        inputProps={{
                          name: 'employee_id',
                          id: 'employee-id',
                          readOnly: state.formSubmitted,
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                      <InputLabel required htmlFor="outlined-adornment-designation">
                        Type
                      </InputLabel>
                      <Select
                        label="Designation"
                        name="designationType"
                        value={state.formData.designationType}
                        required
                        onChange={(e) => handleChange(e)}
                      >
                        <MenuItem value="experience">Experience</MenuItem>
                        <MenuItem value="resign">Resign</MenuItem>
                      </Select>
                    </FormControl>
                    <Stack spacing={5} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="outlined" color='success' type='submit' onClick={handleProceedToOption}>
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
                <Typography variant='h5' component={'h5'} m={1} textAlign={'center'}>
                  Experience Data
                </Typography>
                {state.pageTypeView && (
                  <Paper
                    elevation={5}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      pr: '1',
                      height: { xs: '50ch', md: '50ch', lg: '50ch' },
                      width: { xs: '30ch', lg: '60ch' },
                      mb: 5,
                      mr: 50,
                    }}
                  >
                    <Box
                      component={'form'}
                      onSubmit={handleProceedToOption}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 5,
                        marginLeft: 1,
                        width: '92%',  // Set a common width for Experience Data section
                      }}
                    >

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-designationTitle">
                              Current Designation
                            </InputLabel>
                            <OutlinedInput
                              name='current_designation'
                              value={state.empdata.designation}
                              required={true}
                              id="currentdesignation"
                              type={'text'}
                              label="currentDesignation"
                              placeholder='Enter currentDesignation'
                              onChange={(d) => handleChange(d)}
                              inputProps={{
                                name: 'current_designation',
                                id: 'current_designation',
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-dateofjoining">
                              Dateofjoining
                            </InputLabel>
                            <OutlinedInput
                              name='date_of_joining'
                              value={state.empdata.date_of_joining ? new Date(state.empdata.date_of_joining).toISOString().split('T')[0] : ''}
                              required={true}
                              id="dateOfJoining"
                              type={'Dateofjoining'}
                              label="dateOfJoining"
                              placeholder='Enter dateOfJoining'
                              onChange={(d) => handleChange(d)}
                              inputProps={{
                                name: 'date_of_joining',
                                id: 'date_of_joining',
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-promotiontitle"
                        style={{ letterSpacing: '1px', margin: '0 4px' }}>
                          Promotion Title
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          name='promotion_title'
                          value={state.formData.promotion_title}
                          required={true}
                          id="promotiontitle"
                          type={'text'}
                          label="promotiontitle"
                          placeholder='Enter promotiontitle'
                          onChange={(e) => handleChange(e)}
                          
                          // style={{ fontFamily: 'monospace' }}
                          // inputProps={{ style: { letterSpacing: '2px' } }}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <TextField
                          fullWidth
                          type="date"
                          label="Date"
                          id="outlined-adornment-from_date"  // Update the id attribute
                          name="from_date"  // Update the name attribute
                          value={state.formData.from_date}
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-rolesandresponsibilities">
                          Roles and Responsibilities
                        </InputLabel>
                        <OutlinedInput
                          name='rolesandresponsibilities'
                          value={state.formData.rolesandresponsibilities}
                          required={true}
                          multiline
                          rows={2}
                          id="outlined-multiline-flexible"
                          label="rolesandresponsibilities"
                          placeholder='Enter Roles and Responsibilities'
                          onChange={(e) => handleChange(e)}
                        />
                      </FormControl>
                      <Stack spacing={5} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" color='success' type='submit' onClick={handleexperienceSubmit}>
                          Add
                        </Button>
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

export default AddExperience;