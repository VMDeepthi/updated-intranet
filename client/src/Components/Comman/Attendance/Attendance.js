import React, { useContext, useEffect, useState } from 'react'
import { Box, Chip, Container, Paper, Stack, FormControl, Button, Typography, Tooltip } from '@mui/material'
import DataTable from 'react-data-table-component';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import AdminNavBar from '../../Comman/NavBar/AdminNavBar';
import UserNavBar from '../NavBar/UserNavBar';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import Loader from '../Loader';

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const columns = [
    
    {
        name: 'Date',
        selector: row => row.pdate,
        center: 'true',
        sortable: 'true'
    },
    {
        name: 'First In',
        selector: row => row.firstin.toFixed(2),
        center: 'true',

    },
    {
        name: 'Last Out',
        selector: row => row.lastout.toFixed(2),
        center: 'true',
    },
    {
        name: 'Status',
        selector: row => <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: row.status === 'XX' ? '#037700' : row.status === 'XA' ? '#FF9D36' : (row.updated_status === 'WH' || row.updated_status ==='HH')?'88888882':  '#FF6868', color: 'white' }} size='small' label={row.status} />,
        center: 'true',
    },
    {
        name: 'Total Hours',
        selector: row => row.totalhrs.toFixed(2),
        center: 'true',
    },
    {
        name: 'Updated Status',
        selector: row => <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: row.updated_status === 'XX' ? '#037700' : row.updated_status === 'XA' ? '#FF9D36' : (row.updated_status === 'WH' || row.updated_status ==='HH') ? '88888882' :(row.updated_status === 'CL' || row.updated_status ==='SL')?'#3FA8FC' :'#FF6868', color: 'white' }} size='small' label={row.updated_status} />,
        center: 'true',

    },

];


const Attendance = () => {
    const [data, setData] = useState([])
    const [date, setDate] = useState({ fromDate: null, toDate: null })
    const [loader, setLoader] = useState(true);

    const {userDetails} = useContext(UserContext)
    console.log(userDetails)

    useEffect(() => {
        axios.post('/api/attendance',{emp_id:userDetails.employee_id})
            .then(res => {
                let options = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
                function join(date, options, separator) {
                    function format(option) {
                        let formatter = new Intl.DateTimeFormat('en', option);
                        return formatter.format(date);
                    }
                    return options.map(format).join(separator);
                }
                const data = res.data.map(d => ({ ...d, pdate: join(new Date(d.pdate), options, '-') }))
                setLoader(false)
                setData(data)
                //console.log(res.data)
            })
            .catch(() => {
                setLoader(false)
                
            })
    }, [userDetails.employee_id])

    const subHeaderViewCompanyMemo = React.useMemo(() => {
        const handleFilterAttendace = (e) => {
            e.preventDefault()
            console.log(date)

            setLoader(true)
            axios.post(`/api/filteruserattendance`, {...date,emp_id:userDetails.employee_id})
                .then(res => {
                    let options = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
                    function join(date, options, separator) {
                        function format(option) {
                            let formatter = new Intl.DateTimeFormat('en', option);
                            return formatter.format(date);
                        }
                        return options.map(format).join(separator);
                    }
                    const data = res.data.map(d => ({ ...d, pdate: join(new Date(d.pdate), options, '-') }))
                    setLoader(false)
                    setData(data)
                    //console.log(res.data)
                })
                .catch((err) => {
                    setLoader(false)
                    setData([])
                    toast.error(err.response.data)
                })

        }
        return (
            // <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: row.updated_status === 'XX' ? '#037700' : row.updated_status === 'XA' ? '#FF9D36' : (row.updated_status === 'WH' || row.updated_status ==='HH') ? '88888882' :(row.updated_status === 'CL' || row.updated_status ==='SL')?'#3FA8FC' :'#FF6868', color: 'white' }} size='small' label={row.updated_status} />
            <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'center' }}>

                
                
                <Stack spacing={1} display={'flex'} justifyContent={'center'} alignItems={'center'} direction={'row'} sx={{ p: 0.5, height: '100%' }} >
                <Typography component={'h5'} variant='p'>Color Codes:</Typography>
                <Tooltip title='shift completed' arrow>
                <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: '#037700', color:'white', borderRadius:'50%' }} size='small' />

                </Tooltip>
                <Tooltip title='shift can be compensate' arrow>
                <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: '#FF9D36', color:'white', borderRadius:'50%' }} size='small' />

                </Tooltip>
                <Tooltip title='Absent' arrow>
                <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: '#FF6868', color:'white', borderRadius:'50%' }} size='small'  />

                </Tooltip>
                <Tooltip title='Weekend/Holiday' arrow>
                <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: "88888882", color:'white', borderRadius:'50%' }} size='small' />

                </Tooltip>
                <Tooltip title='Leaves' arrow>
                <Chip sx={{ fontSize: 12, p: 0.2, backgroundColor: '#3FA8FC', color:'white', borderRadius:'50%' }} size='small' />

                </Tooltip>
                   
                    </Stack>
                <Stack component={'form'} onSubmit={handleFilterAttendace} direction={{ xs: 'column', lg: 'row' }} spacing={2} display={'flex'} justifyContent={'center'} m={2}>
                
                    
               
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={date.fromDate ? dayjs(date.fromDate) : null}
                                onChange={e => setDate({ ...date, fromDate: e.$d.toLocaleDateString('en-CA') })}
                                slotProps={{ textField: { size: 'small', required: true } }}
                                label="From Date"
                                format='DD/MM/YYYY'
                                maxDate={date.toDate ? dayjs(date.toDate) : null}
                            // startIcon={<EventIcon />} // Calendar icon
                            />
                        </LocalizationProvider>


                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={date.toDate ? dayjs(date.toDate) : null}
                                onChange={e => setDate({ ...date, toDate: e.$d.toLocaleDateString('en-CA') })}
                                slotProps={{ textField: { size: 'small', required: true } }}
                                label="To Date"
                                format='DD/MM/YYYY'
                                minDate={date.fromDate ? dayjs(date.fromDate) : null}
                            />
                        </LocalizationProvider>


                    </FormControl>
                    <Box sx={{ p: 0.5, height: '100%' }} >
                        <Button type='submit' size='small' color='success' variant='contained'>submit</Button>
                    </Box>
                </Stack>
            </Container>

        );
    }, [date,userDetails]);

    return (
        <>
           
            <Container sx={{ height:'auto', width:'100%'}}>
            {userDetails.access==='admin'?<AdminNavBar />:<UserNavBar/>}
                <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 }, }}>

                    <Paper elevation={10}  sx={{ height: 'auto' }} >

                        <DataTable
                            title={<Typography component={'h3'} variant='p'>Attendance</Typography>}
                            columns={columns}
                            data={data}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles={customStyles}
                            highlightOnHover
                            progressPending={loader}
                            subHeader
                            subHeaderComponent={subHeaderViewCompanyMemo}
                            pagination
                            dense
                        />
                    </Paper>
                </Box>
            </Container>
            <Loader loader={loader} /> 
        </>
    )
}

export default Attendance;