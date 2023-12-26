import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import NavBar from "../../Comman/NavBar/UserNavBar";
import { AccountBox, UploadFile, Download, Dock } from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import AdminNavBar from "../NavBar/AdminNavBar";
import UserNavBar from "../../Comman/NavBar/UserNavBar";

const columns = [
  { id: "salary_category", label: "", minWidth: 140 },
  {
    id: "salary_actual",
    label: "Actual",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "salary_present",
    label: "Present",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "deduction_category", label: "", minWidth: 140 },
  {
    id: "deduction_actual",
    label: "Actual",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "deduction_present",
    label: "Present",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(
  salary_category,
  salary_actual,
  salary_present,
  deduction_category,
  deduction_actual,
  deduction_present
) {
  // const density = population / size;
  return {
    salary_category,
    salary_actual,
    salary_present,
    deduction_category,
    deduction_actual,
    deduction_present,
  };
}

const rows = [
  createData("Basic", 15000.0, 15000.0, "EPF", 1800, 1800),
  createData("HRA", 6000.0, 6000.0, "ESI", 0.0, 0.0),
  createData("Conveyance", 1600.0, 1600.0, "SAL PT", 200.0, 200.0),
  createData("Education Allowance", 0.0, 0.0, "Income Tax", "NA", 0.0),
  createData("Shift Allowance", 0.0, 0.0, "Others", "NA", 0.0),
  createData("Medical Allowance", 15000.0, 15000.0, "Meal Vouchers", "NA", 0.0),
  createData(
    "Travel Allowance",
    15000.0,
    15000.0,
    "Total Deductions",
    1800,
    1800
  ),
  createData("LTA", 15000.0, 15000.0, "", "", ""),
  createData("Others", 15000.0, 15000.0, "", "", ""),
  createData("Adjustments", "", "", " ", "", ""),
  createData("Laptop", "NA", 0.0, "", "", ""),
  createData("Internet", "NA", 0.0, "", "", ""),
  createData("Client Incentive", "NA", 0.0, "", "", ""),
  createData("Spl. Incentive", "NA", 0.0, "", "", ""),
  createData("Bonus", "NA", 0.0, "", "", ""),
  createData("Awards", "NA", 0.0, "", "", ""),
  createData("Others", "NA", 0.0, "", "", ""),
  createData("Gross Salary of The Employee", 22917.0, 22917.0, "", "", ""),
  createData("", "", "", "", "", ""),
  createData("Net Salary", "", "", "", "", 20917.0),
];

const PaySlips = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState({ fromDate: null, toDate: null });
  const [loader, setLoader] = useState(false);

  const { userDetails } = useContext(UserContext);
  console.log(userDetails);

  const [noError, setNoError] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleAddFormDataMonth = (e) => {
    // console.log(e.target.name);
    setMonth(e.target.value);
    // setAddCompData({ ...addCompData, [e.target.name]: e.target.value });
  };

  const handleAddFormDataYear = (e) => {
    // console.log(e.target.name);
    setYear(e.target.value);
    // setAddCompData({ ...addCompData, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    console.log(month);
    console.log(year);
    setMonth("");
    setYear("");
    setNoError(false);
  };

  const handleSubmitCompForm = async (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  const exportPDF = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.autoTable({
      html: "#payslip-table",
      theme: "grid",
      // styles: {
      //   tableWidth: "100",
      //   overflow: "linebreak",
      //   // fillColor: [255, 0, 0],
      // },
      // columnStyles: {"Total Salary": {halign: 'center'}, "Deductions": {halign: 'center'}},
      margin: {left: 30, right: 30}
    });
    doc.save("payslip.pdf");
  };

  const years = [
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  return (
    <>
      {userDetails.access==='admin'?<AdminNavBar />:<UserNavBar />}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: { xs: 8 }, mt: { xs: 4, md: 6, lg: 8 }  }}
      >
        <div
          style={{
            height: "70vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Grid item sm={12} lg={12} md={12}>
              <Typography
                variant="h5"
                component={"h5"}
                m={1}
                p={1}
                textAlign={"center"}>
                Employee Monthly Salary Details
              </Typography>
              <Paper
                elevation={5}
                sx={{
                  
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: { xs: "70ch", md: "90ch", lg: "110ch" },
                  height: { xs: "115ch", md: "95ch", lg: "95ch" },
                  p: 1,
                }}
              >
                <Box
                  component={"form"}
                  onSubmit={handleSubmitCompForm}
                  sx={{              
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: { xs: "25ch", md: "60ch", lg: "100ch" },
                    height: { xs: "55ch", sm: "55ch", md: "55ch", lg: "50ch" },
                    p: 1,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 2, sm: 1, md: 2, lg: 2 }}
                    sx={{
                      width: { xs: "60ch", md: "80ch", lg: "100ch" },
                    }}
                  >
                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                      <InputLabel size="small" required>
                        Select Month
                      </InputLabel>
                      <Select
                        size="small"
                        label="Status"
                        name="month"
                        value={month}
                        required
                        onChange={handleAddFormDataMonth}
                      >
                        <MenuItem value="january">January</MenuItem>
                        <MenuItem value="february">February</MenuItem>
                        <MenuItem value="march">March</MenuItem>
                        <MenuItem value="april">April</MenuItem>
                        <MenuItem value="may">May</MenuItem>
                        <MenuItem value="june">June</MenuItem>
                        <MenuItem value="july">July</MenuItem>
                        <MenuItem value="august">August</MenuItem>
                        <MenuItem value="september">September</MenuItem>
                        <MenuItem value="october">October</MenuItem>
                        <MenuItem value="november">November</MenuItem>
                        <MenuItem value="december">December</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                      <InputLabel size="small" required>
                        Select year
                      </InputLabel>
                      <Select
                        size="small"
                        label="Status"
                        name="year"
                        value={year}
                        required
                        onChange={handleAddFormDataYear}
                      >
                        {years.map((name, index) => (
                          <MenuItem key={index} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button variant="outlined" color="success" type="submit">
                      Display
                    </Button>
                    {showTable ? (
                      <Button variant="outlined" onClick={exportPDF}>
                        <Download fontSize="medium" />
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Box>

                {showTable ? (
                  <Root sx={{ maxWidth: "90%", width: "90%", my: "24px" ,backgroundColor:"#a2deb2"}}>
                    <table
                      aria-label="custom pagination table"
                      id="payslip-table"
                      
                    >
                      <tbody>
                        <tr height="18" >
                          <th colSpan="3" align="center"  style={{ backgroundColor: "#679e76" }}>
                            Total Salary
                          </th>
                          <th colSpan="3" align="center" style={{ backgroundColor: "#679e76" }}>
                            Deductions
                          </th>
                        </tr>
                        <tr height="24">
                          <th style={{ width: 160, backgroundColor: "#679e76" }}></th>
                          <th style={{ width: 60, backgroundColor: "#679e76" }}>Present</th>
                          <th style={{ width: 60 , backgroundColor: "#679e76"}}>Actuals</th>
                          <th style={{ width: 160, backgroundColor: "#679e76" }}></th>
                          <th style={{ width: 60 , backgroundColor: "#679e76"}}>Present</th>
                          <th style={{ width: 60 , backgroundColor: "#679e76"}}>Actuals</th>
                        </tr>
                        {rows.map((row) => (
                          <tr height="2" key={row.salary_category}>
                            <td style={{ width: 160 }}>
                              {row.salary_category}
                            </td>
                            <td
                              className="val"
                              style={{ width: 60 }}
                              align="right"
                            >
                              {row.salary_actual}
                            </td>
                            <td
                              className="val"
                              style={{ width: 60 }}
                              align="right"
                            >
                              {row.salary_present}
                            </td>
                            <td style={{ width: 160 }}>
                              {row.deduction_category}
                            </td>
                            <td
                              className="val"
                              style={{ width: 60 }}
                              align="right"
                            >
                              {row.deduction_actual}
                            </td>
                            <td
                              className="val"
                              style={{ width: 60 }}
                              align="right"
                            >
                              {row.deduction_present}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Root>
                ) : (
                  <></>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default PaySlips;

const Root = styled("div")(
  ({ theme }) => `
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[500] : grey[200]
      };
      text-align: left;
      padding: 8px;
    }

    th {
      text-align: center;
    }

    .val {
      text-align: right;
    }

  
    th {
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    }
    `
);

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
