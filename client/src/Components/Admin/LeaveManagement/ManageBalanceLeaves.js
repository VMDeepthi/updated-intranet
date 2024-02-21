import { Badge, Box, Button, Container, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AdminNavBar from '../../Comman/NavBar/AdminNavBar'
import UserNavBar from '../../Comman/NavBar/UserNavBar'
import UserContext from '../../context/UserContext'
import Select from 'react-select'
import { AccountBalanceWallet } from '@mui/icons-material'
import axios from 'axios'
import Loader from '../../Comman/Loader'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'

const columns = [
    {
        name: 'Credit',
        selector: row => row.credit,
        center: 'true',
        maxWidth: '20px'

    },
    {
        name: 'Debit',
        selector: row => row.debit,
        center: 'true',

    },
    {
        name: 'Date',
        selector: row => new Date(row.date).toLocaleString('en-CA').slice(0, 10),
        center: 'true',
        sortable: 'true',

    },

    {
        name: 'Total Leaves',
        selector: row => row.total_leaves,
        center: 'true',

    },
    {
        name: 'Reference/Application id',
        selector: row => row.reference,
        center: 'true',
        minWidth: '300px'

    },

];

function ManageBalanceLeaves() {
    const { userDetails } = useContext(UserContext)
    const [selectedOption, setSelectedOption] = useState({ employee: '', type: '' })
    const [loader, setLoader] = useState(true)
    const [manageFields, setManageFields] = useState({
        emp_id: '',
        manageType: '',
        balance: '',
        date: '',
        reference: '',
        totalLeaves: 0
    })
    const [users, setUsers] = useState([])
    const [currentBalance, setCurrentBalance] = useState('')

    const manageOptions = [
        { value: 'credit', label: 'Credit' },
        { value: 'debit', label: 'Debit' },
    ]

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const userData = await axios.get('/api/getemployeedata')
                //console.log(userData)
                setUsers(userData.data)
                setLoader(false)
            }
            catch {
                setLoader(false)
                toast.error('not able to fetch data!')
            }
        }
        fetchUserData()
    }, [])

    const handleUserSelection = (e) => {
        const { value } = e
        // console.log(e)
        setSelectedOption({ ...selectedOption, employee: e })
        setLoader(true)
        axios.post('/api/getbalanceleaves', { emp_id: value.employee_id })
            .then(res => {
                console.log(res.data)
                setLoader(false)
                setCurrentBalance(res.data)
                setManageFields({ ...manageFields, emp_id: value.employee_id, totalLeaves: res.data.totalLeaves })
            })
            .catch(() => {
                setLoader(false)
                toast.error('not able to fetch data!')
            })
    }

    const handleLeavesUpdationSubmit = (e) => {
        e.preventDefault()
        console.log(manageFields)
        let total;
        if (manageFields.manageType === 'credit') {
            total = manageFields.totalLeaves + manageFields.balance
        }
        else {
            total = manageFields.totalLeaves - manageFields.balance
        }
        toast.promise(axios.post('/api/manageleaves', { ...manageFields, totalLeaves: total }), {
            pending: {
                render() {
                    return ('Adding Recoed')
                }
            },
            success: {
                render(res) {
                    setManageFields({
                        emp_id: '',
                        manageType: '',
                        balance: '',
                        date: '',
                        reference: '',
                        totalLeaves: 0
                    })
                    setSelectedOption({ employee: '', type: '' })
                    setCurrentBalance('')
                    return (res.data.data)
                }
            },
            error: {
                render(err) {
                    return (err.data.response.data)
                }
            }
        })
    }

    return (
        <>
            <Box sx={{ height: { xs: 'auto', lg: '100vh' }, width: "auto", display: 'flex', backgroundColor: '#F5F5F5' }}>
                {userDetails.user_type === 'admin'&& userDetails.department === 'management' ? <AdminNavBar /> : <UserNavBar />}
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5, ml: { xs: 2 }, height: 'auto', backgroundColor: '#F5F5F5' }}>
                    <div
                        style={{
                            height: 'auto',
                            width: '100%',

                        }}
                    >
                        <Typography variant='h5' component={'h5'} m={1} textAlign={'center'} >Manage Balance Leaves</Typography>
                        <Grid container spacing={1} display={'flex'} justifyContent={'center'}>
                            <Grid item xs={12} sm={12} lg={10}>
                                <Paper elevation={10}>
                                    <form onSubmit={handleLeavesUpdationSubmit}>
                                        <Container>
                                            <FormControl fullWidth>
                                                <Typography variant='p' m={0.5} component={'h5'} >Select Employee*:</Typography>
                                                <Select
                                                    options={users}
                                                    value={selectedOption.employee}
                                                    onChange={handleUserSelection}
                                                    required
                                                    styles={{
                                                        menuList:
                                                            (baseStyles) => ({
                                                                ...baseStyles,
                                                                maxHeight: '180px'
                                                            }),

                                                    }}
                                                />
                                            </FormControl>
                                        </Container>
                                        <Container sx={{ display: 'flex', width: '100%', }}>
                                            <Stack spacing={1} width={'100%'} p={1} direction={'column'}>
                                                <Stack spacing={2} direction={{ lg: 'row', xs: 'column' }}  >
                                                    <FormControl fullWidth >
                                                        <Typography variant='p' mb={0.5} component={'h5'} >Select Manage Type*:</Typography>
                                                        <Select
                                                            options={manageOptions}
                                                            isSearchable={false}
                                                            value={selectedOption.type}
                                                            onChange={e => {
                                                                setSelectedOption({ ...selectedOption, type: e })
                                                                setManageFields({ ...manageFields, manageType: e.value })
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormControl fullWidth >
                                                        <Typography variant='p' mb={0.5} component={'h5'} >Reference*:</Typography>
                                                        <TextField
                                                            size='small'
                                                            placeholder='Enter Reference ex:annual leaves'
                                                            value={manageFields.reference}
                                                            onChange={e => setManageFields({ ...manageFields, reference: e.target.value })}
                                                            required
                                                        />
                                                    </FormControl>
                                                </Stack>
                                                <Stack spacing={2} direction={{ lg: 'row', xs: 'column' }}  >
                                                    <FormControl fullWidth  >
                                                        <Typography variant='p' mb={0.5} component={'h5'} >No of Leaves*:</Typography>
                                                        <TextField
                                                            type='number'
                                                            size='small'
                                                            inputProps={{ min: 0, step: 0.5 }}
                                                            required
                                                            value={manageFields.balance}
                                                            onChange={e => setManageFields({ ...manageFields, balance: Number(e.target.value) })}
                                                        />
                                                    </FormControl>
                                                    <FormControl fullWidth  >
                                                        <Typography variant='p' mb={0.5} component={'h5'} >Date*:</Typography>
                                                        <TextField
                                                            type='date'
                                                            size='small'
                                                            required
                                                            value={manageFields.date}
                                                            onChange={e => setManageFields({ ...manageFields, date: e.target.value })}

                                                        />
                                                    </FormControl>
                                                </Stack>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                                    <Button type='submit' size='small' variant='contained'>
                                                        Submit
                                                    </Button>

                                                </Box>
                                            </Stack>


                                        </Container>
                                    </form>
                                    <Box sx={{ display: 'flex', justifyContent: 'right', p: 1 }}>

                                        <Stack direction={'row'} sx={{ border: '1px solid black', p: 0.5 }}>
                                            <Typography component={'h4'} variant='p' color={'orange'}>Current Balance: </Typography>
                                            <Badge color={'success'} badgeContent={`${currentBalance.totalLeaves}`} invisible={currentBalance === ''} >
                                                <AccountBalanceWallet />
                                            </Badge>
                                        </Stack>

                                    </Box>

                                    <Container sx={{ height: 190, display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                                        <DataTable
                                            title={''}
                                            columns={columns}
                                            data={currentBalance.balanceSheet}
                                            fixedHeader
                                            fixedHeaderScrollHeight="150px"
                                            highlightOnHover
                                            progressPending={loader}
                                            pagination
                                            responsive
                                            dense
                                        />
                                    </Container>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <Loader loader={loader} />
                </Box>
            </Box>
        </>
    )
}

export default ManageBalanceLeaves