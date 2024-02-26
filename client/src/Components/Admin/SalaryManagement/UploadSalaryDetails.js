import React from "react";
import AdminNavBar from "../../Comman/NavBar/AdminNavBar";
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
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useMemo } from "react";
import { CloudUpload, FileUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import * as XLSX from "xlsx";


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

function UploadSalaryDetails() {
  const [files, setFiles] = useState([]);
  const [excelData, setExcelData] = useState(null);

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx",".csv" ],
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
    
  };

  const handleAddFormDataYear = (e) => {
    // console.log(e.target.name);
    setYear(e.target.value);
    
  };

  // // submit event
  const prepareFile = (e) => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setExcelData(data);
    }
  };

  useEffect(() => {
    prepareFile();
    return () => {};
  }, [excelFile]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, index) => 2014 + index
  );

  const handleUploadFile = async () => {
    if (!month || !year) {
      toast.warning("Select month and year to upload!");
      return;
    }

    if (!excelData) {
      toast.warning("Select file to upload!");
    } else {
      let msg = "";
      const payslipsData = {};
      payslipsData.data = excelData;
      payslipsData.date = {
        month: month,
        year: year,
      };
      try {
        const result = await toast.promise(
          axios.post("/api/uploadpayslip", payslipsData, {
           
          }),

          {
            pending: {
              render() {
                return "Uploading File";
              },
            },
            success: {
              render() {
                // setFiles([]);
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
        console.log(result);
      } catch (err) {
        msg = err.response.data;
      }
    }
  };

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
            <Card sx={{ p: 4, height: "auto", marginBottom: "40px" }}>
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
                    {years.map((name, index) => (
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
              </Stack>
              <></>
              <section>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <h3>Drag 'n' drop file here, or click to select file</h3>
                  <CloudUpload sx={{ fontSize: 50 }} />
                </div>
                <Typography m={1} component={"h5"} variant="p" color={"red"}>
                  *upload excel sheets
                </Typography>
                <Stack
                  direction={"row"}
                  height={{ xs: 30, md: 20 }}
                  spacing={12}
                  p={1}
                >
                  {files.length !== 0 ? (
                    <>
                      <Typography component={"h3"} variant="p" m={1}>
                        File:
                      </Typography>
                      <Chip
                        color="success"
                        label={files[0].name}
                        variant="outlined"
                        onDelete={() => setFiles([])}
                      />
                    </>
                  ) : null}
                </Stack>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="info"
                    component="label"
                    variant="contained"
                    endIcon={<FileUpload />}
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>
                </Box>
              </section>
            </Card>
          </Container>
        </div>
      </Box>
    </>
  );
}

export default UploadSalaryDetails;