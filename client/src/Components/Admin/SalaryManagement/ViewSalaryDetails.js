import React from "react";
import AdminNavBar from "../../Comman/NavBar/AdminNavBar";
import DataTable from "react-data-table-component";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useMemo } from "react";
import { CloudUpload, FileUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import * as XLSX from "xlsx";
import { Delete } from "@mui/icons-material";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "200px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

function ViewSalaryDetails() {
  const [files, setFiles] = useState([]);
  const [excelData, setExcelData] = useState(null);

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [data, setData] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      },
      maxFiles: 1,
      onDrop: (acceptedFile) => {
        setFiles(
          acceptedFile.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setExcelData(null);

        if (acceptedFile) {
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(acceptedFile[0]);
          reader.onload = (e) => {
            setExcelFile(e.target.result);
          };
        } else {
          console.log("Please select your file");
        }
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  // // submit event
  const previewFile = (e) => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setExcelData(data);
    }
  };

  useEffect(() => {
    previewFile();
    return () => {};
  }, [excelFile]);


  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, index) => 2014 + index
  );
  
  const reversedYears = years.filter(year => year <= 2024).reverse();

  const handleDelete = async () => {
    const body = {
      month: month,
      year: year,
    };

    let msg = "";
    try {
      const result = await toast.promise(
        axios.post(`/api/deletepayslip/`, body),
        {
          pending: {
            render() {
              return "Deleting ";
            },
          },
          success: {
            render() {
              return `${msg} `;
            },
          },
          error: {
            render() {
              return `${msg}`;
            },
          },
        }
      );
      msg = result.data;
      setData([])
    } catch (err) {
      msg = err.response.data;
    }
  };

  const handleDisplayPayslip = async () => {
    try {
      const body = {
        month: month,
        year: year,
      };

      axios
        .post("/api/viewpayslipdata", body)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          toast.error("unable to fetch data");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      name: "Emp Id",
      selector: (row) => row.empid,
      center: true,
    },
    
    {
      name: "Employee Name",
      selector: (row) => row.EMPLOYEE_NAME,
      center: true,
    },
   
    {
      name: "Basic",
      selector: (row) => row.empsalbasic,
      center: true,
    },
    {
      name: "Gross",
      selector: (row) => row.empsalgross,
      center: true,
    },
    {
      name: "Deductions",
      selector: (row) => row.empsaldeductions,
      center: true,
    },
    {
      name: "Net",
      selector: (row) => row.empsalnet,
      center: true,
    },
  ];

  return (
    <>
      <AdminNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 } }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container sx={{ width: "85%" }}>
            <Card
              sx={{ p: 4, height: { xs: 400, md: 520 }, marginBottom: "40px" }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, sm: 1, md: 2, lg: 2 }}
                sx={{
                  width: { xs: "60ch", md: "80ch", lg: "100ch" },
                  mb: "3ch",
                }}
              >
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
                    // sx={{ width: "60ch" }}
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
                <Box
                  sx={{
                    justifyContent: "flex-end",
                    display: "flex",
                    minWidth: "max-content",
                  }}
                >
                  <Button
                    color="info"
                    component="label"
                    variant="contained"
                    onClick={handleDisplayPayslip}
                  >
                    View Details
                  </Button>
                </Box>
              </Stack>
              <Container>
                <DataTable
                  columns={columns}
                  data={data}
                  fixedHeader
                  fixedHeaderScrollHeight="300px"
                  customStyles={customStyles}
                  paginationRowsPerPageOptions={[10,50,100]}
                  highlightOnHover
                 
                  // progressPending={loader}
                  // subHeader
                  // subHeaderComponent={subHeaderViewCompanyMemo}
                  pagination
                  dense
                />
                {/* </Box> */}
              </Container>
              {data && data.length > 0 ? (
                <Box
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    // minWidth: "max-content",
                  }}
                >
                  <Button
                    color="info"
                    component="label"
                    variant="contained"
                    onClick={handleDelete}
                  >
                    Delete Data
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Card>
          </Container>
        </div>
      </Box>
    </>
  );
}

export default ViewSalaryDetails;