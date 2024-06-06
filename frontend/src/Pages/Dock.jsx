import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Nav from '../Components/UI/Nav';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ClearIcon from '@mui/icons-material/Clear';
import PrintIcon from '@mui/icons-material/Print';
import QRmodal from './utils/QRmodel';
import DockCanvas from './canvas/DockCanvas';
import { exportToExcel } from './utils/excelUtils'


const Dock = () => {
    const [tableData, setTableData] = useState([]);
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        locationname: '',
        Nodocks:'',
        remarks:'',
        Active:false,
    });
    const [formDataEdit, setFormDataEdit] = useState({
        locationname: '',
        Nodocks:'',
        remarks:'',
        Active:false,
    });
    
    const [qrCodeData, setQrCodeData] = useState('');
    const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);

    const handleDownloadPdf = (qrCodeData) => {
        setQrCodeData(qrCodeData);
        setQrCodeModalOpen(true);
    };

    const columnDefs = [
        { headerName: 'Dock Name', field: 'Nodocks' },
        { headerName: 'Location', field: 'locationname' },
        {
            headerName: 'QR Code',
            field: 'qrcode',
            cellRenderer: (params) => (
                <div>
                    <span
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        onClick={() => handleDownloadPdf(params.value)}
                    >
                        <PrintIcon style={{ color: "blueviolet"}}/>
                    </span>
                </div>
            )
        },
        {
            headerName: 'Active', field: 'Active',
            cellRenderer: (params) => (
                <ThumbUpIcon style={{ color: params.value ? 'green' : 'grey' }} />
            )
        },
        {
            headerName: 'Edit',
            field: '',
            cellRenderer: (params) => (
                <div style={{ display: 'inline-block', marginRight: "25px" }}>
                    <EditIcon onClick={() => handleEdit(params.data)} style={{ color: '#E9C46A', cursor: 'pointer' }} />
                </div>
            )
        },
        {
            headerName: 'Delete', field: 'delete',
            cellRenderer: (params) => (
                <div style={{ display: 'inline-block' }}>
                    <ClearIcon onClick={() => handleDelete(params.data._id)} style={{ color: "red", cursor: "pointer"}} />
                </div>
            )
        },
    ];

    const defaultColDef = {
        sortable: true, filter: true, editable: true, flex: 1
    };

    const getFetchData = async () => {
        const response = await axios.get("http://localhost:5000/dock");
        if (response.data.success) {
            setTableData(response.data.data);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/createdock", formData);
        if (response.data.success) {
            alert(response.data.message);
            getFetchData();
            setFormData({ truckname: "", truckcode: "" });
            setAddSection(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting:", id);
            const response = await axios.delete(`http://localhost:5000/deletedock/${id}`);
            if (response.data.success) {
                setTableData(prevData => prevData.filter(item => item._id !== id));
                alert(response.data.message);
            } else {
                alert("Failed to delete company" + response.data.message);
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            alert("An error occurred while deleting the company");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await axios.put("http://localhost:5000/updatedock", formDataEdit);
        if (response.data.success) {
            getFetchData();
            alert(response.data.message);
            setEditSection(false);
        }
    };

    const handleEdit = (data) => {
        console.log("Editing:", data);
        setFormDataEdit(data);
        setEditSection(true);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditOnChange = (e) => {
        const { name, value } = e.target;
        setFormDataEdit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExportToExcel = () => {
        exportToExcel(tableData, "Docks", "DocksData.xlsx");
    };

    return (
        <>
            <Nav />
            <div style={{ paddingLeft: "50px" }}>
                <Grid>
                    <DockCanvas
                        show={addSection || editSection}
                        setAddSection={setAddSection}
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        formData={formData}
                        editSection={editSection}
                        handleEditOnChange={handleEditOnChange}
                        handleUpdate={handleUpdate}
                        formDataEdit={formDataEdit}
                        exportToExcel={handleExportToExcel} 
                    />
                </Grid>
                <hr style={{ width: '95vw', border: '1px solid black' }} />
                <div className='d-flex vh-30 justify-content-center align-items-center'>
                    <div className='w-100 bg-white rounded p-3'>
                        <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowData={tableData}
                                pagination={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <QRmodal
                open={qrCodeModalOpen}
                onClose={() => setQrCodeModalOpen(false)}
                qrCodeData={qrCodeData}
            />
        </>
    );
};

export default Dock;
