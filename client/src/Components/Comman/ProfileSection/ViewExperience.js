import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
// import NavBar from '../../Comman/NavBar/UserNavBar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../Comman/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal } from 'react-bootstrap';

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
  const [filterExperienceData, setFilterExperienceData] = useState('');
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
    axios.post(`/api/viewexperience`, { employee_id: userDetails.employee_id })
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
    axios.get(`/api/viewexperience/${selectedEmployeeId}`)
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
      axios.post(`/api/deleteexperience`, { id: experienceToDelete.id })
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
            },
          },
          {
            label: 'No',
            onClick: () => { },
          },
        ],
      };

      confirmAlert({
        ...confirmOptions,
        overlayClassName: 'custom-overlay-class',
        customUI: ({ onClose }) => (
          <div className="custom-modal-class" style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)', padding: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
            <h1 style={{ marginLeft: '50px' }}>{confirmOptions.title}</h1>
            <p>{confirmOptions.message}</p>
            <div className="custom-button-container">
              <button onClick={() => {
                confirmOptions.buttons[0].onClick();
                onClose();
              }} style={{ marginLeft: '80px', background: '#3b3a3a', color: 'white', padding: '5px', paddingLeft: '20px', paddingRight: '20px' }}>
                Yes
              </button>
              <button onClick={() => {
                confirmOptions.buttons[1].onClick();
                onClose();
              }} style={{ marginLeft: '50px', background: '#3b3a3a', color: 'white', padding: '5px', paddingLeft: '20px', paddingRight: '20px' }}>
                No
              </button>
            </div>
          </div>
        ),
      });
    };
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
    axios.post(`/api/viewexperience`, { employee_id: userDetails.employee_id })
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
    setUpdatePaperVisibility(false);
    setIsEditMode(false);

    axios.put(`/api/updateexperience/${id}`, {
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

  useEffect(() => {
    axios.post(`/api/viewexperience`, { employee_id: userDetails.employee_id })
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
  }, [userDetails.employee_id]);

  return (
    <>

      <Container sx={{ height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 0}}>
            {/* <NavBar /> */}
            {/* <Typography component={'h3'} variant="p" sx={{ position: 'absolute', top: 3, left: 3, mt: 2, ml: 2, fontSize: "21px" }}>
              View Experience
            </Typography> */}

            {/* <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} spacing={2}>
            
            </Stack> */}


            <ul>
                {experienceData.map((experience) => (
                  <React.Fragment key={experience.id}>
                    <li key={experience.id} style={{ display: 'flex', alignItems: 'center',  padding: '19px', marginLeft: '0px' }}>
                      <div style={{ width: '100%'}}>
                        <Typography variant="body1" style={{ fontSize: '17px' }}>Current Designation: <span style={{ fontWeight: 'bold' }}>{experience.current_designation}</span></Typography>
                        <Typography variant="body1" style={{ fontSize: '15px', color: "grey" }}>Date of Joining: {dayjs(experience.date_of_joining).format('DD-MMM-YYYY')}</Typography>
                        <Typography variant="body1" style={{ fontSize: '15px', color: "grey" }}>Promotion title: {experience.promotion_title}</Typography>
                        <Typography variant="body1" style={{ fontSize: '15px', color: "grey" }}>Date: {dayjs(experience.from_date).format('DD-MMM-YYYY')}</Typography>
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: '15px',
                            color: "#585858",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            width: '100%',
                          }}
                        >
                          Roles and Responsibilities: <span style={{ textAlign: "justify" }}>{experience.rolesandresponsibilities}</span>
                        </Typography>
                      </div>
                    </li>
                    <hr style={{ marginRight: '35px'}}/>
                  </React.Fragment>
                ))}
              </ul>

          </Box>
          </div>
      </Container>
     
      <Loader loader={loader} />
    </>
  );
};

export default ViewExperience;