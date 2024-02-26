import { Paper,Box,Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import userContext from '../../context/UserContext'

function MyPays() {
    const [payslipData, setPayslipData] = useState([]); // State to store fetched payslip data
    const navigate = useNavigate();
    const {userDetails} = useContext(userContext)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

     useEffect(() => {
        const fetchPayslipData = async () => {
            try {
                const response = await fetch('/api/payslips', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ emp_id: userDetails.employee_id })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payslip data');
                }

                let payslipData = await response.json();
                payslipData = payslipData.map(e => {
                    return {
                        ...e,
                        MONTH: months[e.MONTH.split('T')[0].split('-')[1] - 1]
                    }
                }).reverse()

                setPayslipData(payslipData);
            } catch (error) {
                console.error('Error fetching payslip data:', error);
            }
        };

        fetchPayslipData();
    }, [userDetails.employee_id]);
    const onNavigate = () => {
        navigate('/payslips');
    };

    return (
          <div style={{ height: '220px', overflow: 'auto' }}> 
        <Box>
            <Typography component='h4' variant='p' sx={{ p: 1, ml: 1 }}>
                Last 3 Months Transaction
            </Typography>
            
            <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
             
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Month</TableCell>
                                <TableCell align="center">Salary</TableCell>
                                <TableCell align="center">PF</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payslipData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{row.MONTH}</TableCell>
                                    <TableCell align="center">{row.empsalnet}</TableCell>
                                    <TableCell align="center">{row.empsalepf}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Container>
            <Container sx={{ display: 'block', p: 2 }} onClick={() => navigate("/payslips")}>
                <Button onClick={onNavigate} variant="contained">Pay slips</Button>
            </Container>  
        </Box>
    </div>     
    )
}

export default MyPays;