import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Stack, Button, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import NavBar from '../../Comman/NavBar/AdminNavBar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../Comman/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';



const ViewExperience = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [experienceData, setExperienceData] = useState([]);
  const { userDetails } = useContext(UserContext);
  const [isUpdatePaperVisible, setUpdatePaperVisibility] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  
  const toggleIcons = () => {
    setShowIcons(!showIcons);
    setIsEditClicked(!isEditClicked);
  };

  

  const [formData, setFormData] = useState({
    id: '',
    employeeid: '',
    designationtype: '',
    currentdesignation: '',
    dateofjoining: '',
    promotiontitle: '',
    from_date: '',
    rolesandresponsibilities: '',
  });

  const fetchData = () => {
    axios
      .post(`/api/viewexperience`, { employee_id: userDetails.employee_id })
      .then((res) => {
        const processedData = res.data.map((d) => ({
          ...d,
          pdate: dayjs(d.startDate).format('DD-MMM-YYYY'),
        }));
        setExperienceData(processedData);
      })
      .catch((err) => {
        console.error('Error fetching experience data:', err);
        toast.error('Error fetching experience data');
      });
  };

 const handleEmployeeIdClick = (selectedEmployeeId) => {
    setLoader(true);
    axios
      .get(`/api/viewexperience/${selectedEmployeeId}`)
      .then((res) => {
        const processedData = res.data.map((d) => ({
          ...d,
          pdate: dayjs(d.from_date).format('DD-MMM-YYYY'),
        }));
        setLoader(false);
        setExperienceData(processedData);
      })
      .catch((err) => {
        setLoader(false);
        console.error('Error fetching experience data:', err);
        toast.error('Error fetching experience data');
      });
  };

const viewexperience = () => {
    return axios.get('/api/viewexperience');
  };
  const handleClosePaper = () => {
    setUpdatePaperVisibility(false);
  };


  const handleAddIconClick = (event) => {
    setFormData({
      id: '',
      employeeid: '',
      designationtype: '',
      currentdesignation: '',
      dateofjoining: '',
      promotiontitle: '',
      from_date: '',
      rolesandresponsibilities: '',

    });
    navigate('/addexperience');
  };

  const DeleteIconClick = (experience) => {
    setShowModal(true);
    setExperienceToDelete(experience);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    setShowModal(false);
    setIsDeleteConfirmationOpen(false);
    if (experienceToDelete) {
      axios
        .post(`/api/deleteexperience`, { id: experienceToDelete.id })
        .then((res) => {
          toast.success('Experience data deleted successfully');
          fetchData();
          setFormData({
            id: '',
            employeeid: '',
            designationtype: '',
            currentdesignation: '',
            dateofjoining: '',
            promotiontitle: '',
            from_date: '',
            rolesandresponsibilities: '',
          });
        })
        .catch((err) => {
          console.error('Error deleting experience data:', err);
          toast.error('Error deleting experience data');
        });
    } else {
      console.error('No experienceToDelete defined');
    }
  };

  const handleDeleteCancelled = (experience) => {
    setShowModal(false);
    setIsDeleteConfirmationOpen(false);
  };

  const handleEditIconClick = (experience) => {
    if (!isDeleteConfirmationOpen) {
      const confirmOptions = {
        title: 'Edit Experience',
        message: 'Are you sure you want to edit this experience?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setFormData({
                id: experience.id,
                employeeid: experience.employee_id,
                designationtype: experience.designation_type,
                currentdesignation: experience.current_designation,
                dateofjoining: dayjs(experience.date_of_joining).format('YYYY-MM-DD'),
                promotiontitle: experience.promotion_title,
                from_date: dayjs(experience.from_date).format('YYYY-MM-DD'),
                rolesandresponsibilities: experience.rolesandresponsibilities, 
              });
              setUpdatePaperVisibility(true);
              setIsEditMode(true);
              toggleIcons();
            },
          },
          {
            label: 'No',
            onClick: () => { }
          },
        ],
        //setIsEditClicked(!isEditClicked);
      };

      confirmAlert({
        ...confirmOptions,
        overlayClassName: 'custom-overlay-class',
        customUI: ({ onClose }) => (
        
          <div
            className="custom-modal-class"
            style={{
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
              padding: '15px',
              paddingLeft: '30px',
              paddingRight: '30px',
            }}
          >
            <h1 style={{ marginLeft: '50px' }}>{confirmOptions.title}</h1>
            <p>{confirmOptions.message}</p>
            <div className="custom-button-container">
              <button
                onClick={() => {
                  confirmOptions.buttons[0].onClick(experience);
                  onClose();
                }}
                style={{
                  marginLeft: '80px',
                  background: '#3b3a3a',
                  color: 'white',
                  padding: '5px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  confirmOptions.buttons[1].onClick();
                  onClose();
                }}
                style={{
                  marginLeft: '50px',
                  background: '#3b3a3a',
                  color: 'white',
                  padding: '5px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
      });
    }
  };

  const handleProccedToOption = (e) => {
    e.preventDefault();
    if (['experience', 'resign'].includes(formData.designationtype) && formData.employeeid !== '') {
      setFormData({
        employeeid: '',
        designationtype: '',
        currentdesignation: '',
        dateofjoining: '',
        promotiontitle: '',
        from_date: '',
        rolesandresponsibilities: '',
      });
    }
    toast.success('Data added successfully to the form!');
  };

  const handleViewExperience = (e) => {
    e.preventDefault();

    setLoader(true);
    axios
      .post(`/api/viewexperience`, { employee_id: userDetails.employee_id })
      .then((res) => {
        console.log(res.data);
        const processedData = res.data.map((d) => ({
          ...d,
          pdate: dayjs(d.startDate).format('DD-MMM-YYYY'),
        }));
        setLoader(false);
        setData(processedData);
      })
      .catch((err) => {
        setLoader(false);
        console.error('Error fetching experience data:', err);
        toast.error('Error fetching experience data');
      });
  };

  const handleupdateexperience = (e) => {
    e.preventDefault();
    const { id, promotiontitle, from_date, rolesandresponsibilities } = formData;
    console.log(formData);
    // setUpdatePaperVisibility(false);
    setIsEditMode(false);

    axios
      .put(`/api/updateexperience/${id}`, {
        promotion_title: promotiontitle,
        from_date: from_date,
        rolesandresponsibilities: rolesandresponsibilities,
      })
      .then((res) => {
        console.log('Update Experience response:', res.data);
        toast.success('Experience data updated successfully');

        fetchData();

        setFormData({
          id: '',
          promotiontitle: '',
          from_date: '',
          rolesandresponsibilities: '',
        });
        setUpdatePaperVisibility(false);
        setIsEditMode(false);
      })
      .catch((err) => {
        console.error('Error updating experience data:', err);
        toast.error('Error updating experience data');
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredExperiences = searchInput.trim() !== '' ?
  experienceData.filter((experience) => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const employeeIdMatch = String(experience.employee_id).toLowerCase().includes(lowerCaseSearchInput);
    const currentDesignationMatch = experience.current_designation.toLowerCase().includes(lowerCaseSearchInput);

    // Return true if either employee_id or current_designation matches the search input
    return employeeIdMatch || currentDesignationMatch;
  }) :
  [];

  useEffect(() => {
    axios
      .post(`/api/viewallexperiences`, { employee_id: userDetails.employee_id })
      .then((res) => {
        const processedData = res.data.map((d) => ({
          ...d,
          pdate: dayjs(d.startDate).format('DD-MMM-YYYY'),
        }));
        setLoader(false);
        setExperienceData(processedData);

      })
      .catch((err) => {
        setLoader(false);
        console.error('Error fetching experience data:', err);
        toast.error('Error fetching experience data');
      });
  }, [userDetails.employee_id, searchInput, filteredExperiences]);





  return (
    <>
      <Modal
        show={showModal}
        onHide={handleDeleteCancelled}
        style={{
          marginTop: '20px',
          marginLeft: '520px',
          marginBottom: '800px',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          zIndex: 9999,
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Modal.Header>
          <Modal.Title style={{ color: 'black', fontWeight: '600', marginLeft: '100px', fontSize: '25px' }}>
            Delete Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px', textDecoration: 'none', fontWeight: '400' }}>
          Are you sure you want to delete this experience?
        </Modal.Body>
        <Modal.Footer style={{ padding: '15px' }}>
          <Button
            variant="secondary"
            onClick={handleDeleteCancelled}
            style={{ backgroundColor: '#737070', color: '#fff', marginLeft: '75px' }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirmed}
            style={{ backgroundColor: '#e05858', color: '#fff', marginLeft: '50px' }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Container sx={{ height: 'auto', width: '80%' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 } }}>
          <NavBar />
          <Paper elevation={10} sx={{ height: 'auto', padding: 10, mt: 2, position: 'relative' }}>
            <TextField
              label="Search by Employee ID"
              placeholder="Search by Employee ID | Current Designation"
              variant="outlined"
              size="small"
              fullWidth
              value={searchInput}
              onChange={handleSearchInputChange}
              style={{ marginBottom: '10px', width: "87%" }}
            />
             <div style={{ marginTop: '40px' }}>
        {filteredExperiences.length === 0 && searchInput.trim() !== '' ? (
          <Typography variant="body1" style={{ fontSize: '17px', textAlign: 'center', color: 'grey' }}>
            No data found for the given search criteria.
          </Typography>
        ) : (
          filteredExperiences.map((experience) => (
            <React.Fragment key={experience.id}>
              {/* ... (existing code) */}
            </React.Fragment>
          ))
        )}
      </div>

            <Typography component={'h3'} variant="p" sx={{ position: 'absolute', top: 3, left: 3, mt: 2, ml: 2, fontSize: '21px' }}>
              View Experience
            </Typography>

         


            <div style={{ marginTop: '40px' }}>
              {/* Overlay */}
              {isUpdatePaperVisible && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
                    zIndex: 3, // Ensure it's above other elements
                  }}
                />
              )}

              {isUpdatePaperVisible && (
                <Paper elevation={10} sx={{ height: 'auto', padding: 15, mt: 2, position: 'relative', zIndex: 4 }}>
                  <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5, zIndex: 5 }}
                    onClick={handleClosePaper}
                  >
                    <CloseIcon />
                  </IconButton>
                  <form onSubmit={handleupdateexperience}>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      <TextField
                        label="Employee ID"
                        fullWidth
                        value={formData.employeeid}
                        onChange={(e) => setFormData({ ...formData, employeeid: e.target.value })}
                        {...(isEditMode ? { readOnly: true } : { disabled: true })}
                      />
                      <TextField
                        label="Designation Type"
                        fullWidth
                        value={formData.designationtype}
                        onChange={(e) => setFormData({ ...formData, designationtype: e.target.value })}
                        {...(isEditMode ? { readOnly: true } : { disabled: true })}
                      />
                      <TextField
                        label="Current Designation"
                        fullWidth
                        value={formData.currentdesignation}
                        onChange={(e) => setFormData({ ...formData, currentdesignation: e.target.value })}
                        {...(isEditMode ? { readOnly: true } : { disabled: true })}
                      />
                      <TextField
                        label="Date of Joining"
                        type="date"
                        fullWidth
                        value={formData.dateofjoining}
                        onChange={(e) => setFormData({ ...formData, dateofjoining: e.target.value })}
                        {...(isEditMode ? { readOnly: true } : { disabled: true })}
                      />
                      <TextField
                        label="Promotion Title"
                        fullWidth
                        value={formData.promotiontitle}
                        onChange={(e) => setFormData({ ...formData, promotiontitle: e.target.value })}
                      />
                      <TextField
                        label="From Date"
                        type="date"
                        fullWidth
                        value={formData.from_date}
                        onChange={(e) => setFormData({ ...formData, from_date: e.target.value })}
                      />
                      <TextField
                        label="RolesandResponsibilities"
                        fullWidth
                        multiline
                        variant="outlined"
                        rows={4}
                        value={formData.rolesandresponsibilities}
                        onChange={(e) => setFormData({ ...formData, rolesandresponsibilities: e.target.value })}
                      />
                      <Button type="submit" variant="contained" color="inherit" style={{ backgroundColor: 'black', color: 'white' }}>
                        {isEditMode ? 'Update Experience' : 'Add Experience'}
                      </Button>

                    </Stack>
                  </form>
                </Paper>
              )}

              {filteredExperiences.map((experience, index) => (
                <React.Fragment key={experience.id}>
                  <li
                    key={experience.id}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '-18px', marginTop: '-1px', marginLeft: '0px' }}
                  >
                    <div style={{ flexGrow: 1 }}>
                    {/* {index === 0 && ( */}
                      <Typography variant="body1" style={{ fontSize: '17px' }}>
                        Employee id: <span style={{ fontWeight: 'bold' }}>{experience.employee_id}</span>
                      </Typography>
                    {/* )}   */}
                      
                      <Typography variant="body1" style={{ fontSize: '17px' }}>
                        Current Designation: <span style={{ fontWeight: 'bold' }}>{experience.current_designation}</span>
                      </Typography>
                      
                      <Typography variant="body1" style={{ fontSize: '15px', color: 'grey' }}>
                        Date of Joining: {dayjs(experience.date_of_joining).format('DD-MMM-YYYY')}
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '15px', color: 'grey' }}>
                        Promotion title: {experience.promotion_title}
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '15px', color: 'grey' }}>
                        Date: {dayjs(experience.from_date).format('DD-MMM-YYYY')}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '15px',
                          color: '#585858',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word', // Allow breaking long words
                          width: '100%',
                        }}
                      >
                        Roles and Responsibilities: <span style={{ textAlign: 'justify', fontWeight: '400', color: '#3D3D3D', fontSize: '15px' }}>{experience.rolesandresponsibilities}</span>
                      </Typography>
                    </div>
                    <div style={{ marginRight: '100px', display: 'flex', alignItems: 'center', marginBottom: '170px', marginLeft: 'auto', marginTop: '30px' }}>
                    {isEditClicked && (
                    <>

                      {/* <IconButton onClick={() =>{ handleEditIconClick(experience); toggleIcons(); }}>
                        <EditIcon />
                      </IconButton> */}
                      <IconButton onClick={() => handleEditIconClick(experience)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => DeleteIconClick(experience)}>
                        <DeleteIcon />
                      </IconButton>
                      </>
                    )}
                    </div>
                  </li>
                  <hr style={{ marginTop: '5px', marginBottom: '5px' }} />
                </React.Fragment>
              ))}
            </div>
           

            <form onSubmit={handleViewExperience}>
              <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>

                <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 3, right: 0 }}>

                  <IconButton onClick={handleAddIconClick}>
                    <AddIcon />
                  </IconButton>


                  <IconButton onClick={() => { handleEditIconClick(experienceData[0]); toggleIcons(); }}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
      <Loader loader={loader} />
    </>
  );
};

export default ViewExperience;