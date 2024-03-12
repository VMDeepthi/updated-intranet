import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import {
  AccountBox,
  UploadFile,
  Download,
  Dock,
  WidthNormal,
  LightRounded,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import AdminNavBar from "../NavBar/AdminNavBar";
import { toast } from "react-toastify";
import UserNavBar from "../../Comman/NavBar/UserNavBar";
import { light } from "@mui/material/styles/createPalette";

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

const PaySlips = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const [loader, setLoader] = useState(false);

  const { userDetails } = useContext(UserContext);
  console.log(userDetails);

  const [noError, setNoError] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({company_logo:'', company_address:''})

  const handleAddFormDataMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleAddFormDataYear = (e) => {
    setYear(e.target.value);
  };

  const handleUploadFile = async () => {
    try {
      if (!month || !year) {
        toast.warning("Select month and year to upload!");
        return;
      }
      const body = {
        month: month,
        year: year,
        empid: userDetails.employee_id,
      };
      axios
        .post("/api/viewemppayslip", body)
        .then((res) => {
          // setData(res.data);
          populateTable(res.data[0])
        })
        .catch(() => {
          toast.error("unable to fetch data");
        });
        axios.post('/api/companydetails',{emp_id: userDetails.employee_id})
        .then((res) => {
          console.log(res.data)
          setCompanyDetails(res.data[0])
        })
        .catch(() => {
          toast.error("unable to fetch data");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // const getPayslipData = async () => {
  // };

  const currentYear = new Date().getFullYear();
  // const years = Array.from(
  //   { length: currentYear - 2014 + 1 },
  //   (_, index) => 2014 + index

  // );
  // const years = Array.from(
  //   { length: currentYear - 2014 + 1 },
  //   (_, index) => 2014 + index

  // );
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, index) => 2014 + index
  );

  const reversedYears = years.filter(year => year <= 2024).reverse();
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

  const populateTable = (data) => {
    const tempRows = []

    tempRows.push(createData("Basic", data.empsalorgbasic, data.empsalbasic, "EPF", data.empsalorgepf, data.empsalepf))
    tempRows.push(createData("HRA", data.empsalorghra, data.empsalhra, "ESI", data.empsalorgesi, data.empsalesi))
    tempRows.push(createData("Conveyance", data.empsalorgconv, data.empsalconv, "SAL PT", data.empsalorgpt, data.empsalpt))
    tempRows.push(createData("Education Allowance", data.empsalorgedu, data.empsaldeductions, "Income Tax", "NA", data.empsalitax))
    tempRows.push(createData("Shift Allowance", data.empsalorgshift, data.empsalshift, "Others", "NA", data.empsaldebitother))
    tempRows.push(createData("Medical Allowance", data.empsalmedical, data.empsalmed, "Meal Vouchers", "NA", data.empsalsodexo))
    tempRows.push(createData("Travel Allowance", data.empsaltravel, data.empsallta, "Total Deductions", "", data.empsaldeductions))
    tempRows.push(createData("LTA", "NA", data["T/H"], "", "", ""))
    tempRows.push(createData("Others", data.empsalorgsundrycreditothers, data.empsalsundrycreditothers, "", "", ""))
    tempRows.push(createData("Adjustments", "", "", " ", "", ""))
    tempRows.push(createData("Laptop", "NA", data.empsallaptop, "", "", ""))
    tempRows.push(createData("Internet", "NA", data.empsalinternet, "", "", ""))
    tempRows.push(createData("Client Incentive", "NA", data.empsalclientincentive, "", "", ""))
    tempRows.push(createData("Spl. Incentive", "NA", data.empsalincentive, "", "", ""))
    tempRows.push(createData("Bonus", "NA", data.empsalbonus, "", "", ""))
    tempRows.push(createData("Awards", "NA", data.empsalawards, "", "", ""))
    tempRows.push(createData("Others", "NA", data.empsalothers, "", "", ""))
    tempRows.push(createData("Gross Salary of The Employee", data.emporggross, data.empsalgross, "", "", ""))
    tempRows.push(createData("", "", "", "", "", ""))
    tempRows.push(createData("Net Salary", "", "", "", "", data.empsalnet))
    setRows(tempRows)
  }

  const exportPDF = async () => {
    const doc = new jsPDF({ orientation: "vertical" });
    doc.autoTable({
      html: "#payslip-table",
      theme: "grid",
      margin: { left: 30, right: 30, top: 80 },
      // padding: {top: 40}
    });
    let imageHeader = new Image();
    imageHeader.src = `${companyDetails.company_logo===''?'':process.env.REACT_APP_BACKEND_SERVER+companyDetails.company_logo}`;
    doc.addImage(
      imageHeader,
      // param.logo.type,
      30, // 10 + param.logo.margin.left,
      18, // currentHeight - 5 + param.logo.margin.top,
      60, // param.logo.width,
      12.66 // param.logo.height
    );
    doc.setFontSize(10);
    doc.text(
      `${companyDetails.company_address}`,
      120,
      20,
      {maxWidth: 60, align: "justify"}
    );
    const empName = userDetails.first_name + " " + userDetails.last_name;
    const empCode = userDetails.employee_id;
    const monthYear = month + " " + year;
    doc.text(
      `\nName of the Employee: ${empName} \nEmployee Code: ${empCode} \nDesignation: null \nPF Number: null \nPAN Number: null \n\nPay slip for the month of ${monthYear}`,
      30,
      40
    );

    doc.save("payslip.pdf");
  };

  return (
    <>
      {userDetails.access === "admin" ? <AdminNavBar /> : <UserNavBar />}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: { xs: 8 }, mt: { xs: 4, md: 6, lg: 8 } }}
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
                textAlign={"center"}
              >
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
                        <MenuItem value="jan">January</MenuItem>
                        <MenuItem value="feb">February</MenuItem>
                        <MenuItem value="mar">March</MenuItem>
                        <MenuItem value="apr">April</MenuItem>
                        <MenuItem value="may">May</MenuItem>
                        <MenuItem value="jun">June</MenuItem>
                        <MenuItem value="jul">July</MenuItem>
                        <MenuItem value="aug">August</MenuItem>
                        <MenuItem value="sep">September</MenuItem>
                        <MenuItem value="oct">October</MenuItem>
                        <MenuItem value="nov">November</MenuItem>
                        <MenuItem value="dec">December</MenuItem>
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
                        {reversedYears.map((name, index) => (
                          <MenuItem key={index} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      variant="outlined"
                      color="success"
                      type="submit"
                      onClick={handleUploadFile}
                    >
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
                  <Root
                    sx={{
                      maxWidth: "90%",
                      width: "90%",
                      my: "24px",
                      backgroundColor: "#a2deb2",
                    }}
                  >
                    <table
                      aria-label="custom pagination table"
                      id="payslip-table"
                    >
                      <tbody>
                        <tr height="18">
                          <th
                            colSpan="3"
                            align="center"
                            style={{ backgroundColor: "#679e76" }}
                          >
                            Total Salary
                          </th>
                          <th
                            colSpan="3"
                            align="center"
                            style={{ backgroundColor: "#679e76" }}
                          >
                            Deductions
                          </th>
                        </tr>
                        <tr height="24">
                          <th
                            style={{ width: 160, backgroundColor: "#679e76" }}
                          ></th>
                          <th style={{ width: 60, backgroundColor: "#679e76" }}>
                            Present
                          </th>
                          <th style={{ width: 60, backgroundColor: "#679e76" }}>
                            Actuals
                          </th>
                          <th
                            style={{ width: 160, backgroundColor: "#679e76" }}
                          ></th>
                          <th style={{ width: 60, backgroundColor: "#679e76" }}>
                            Present
                          </th>
                          <th style={{ width: 60, backgroundColor: "#679e76" }}>
                            Actuals
                          </th>
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
      border: 1px solid ${theme.palette.mode === "dark" ? grey[500] : grey[200]
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