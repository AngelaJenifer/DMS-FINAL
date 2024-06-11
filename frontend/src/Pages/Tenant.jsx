import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Nav from '../Components/UI/Nav';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { exportToExcel } from './utils/excelUtils'
import TenantCanvas from './canvas/TenantCanvas';


const Tenant = () => {
    const [tableData, setTableData] = useState([]);
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        Tcode: '',
        Tname:'',
        address: '', 
        Cperson:'',
        email: "",
        Cnumber: "",
    });
    const [formDataEdit, setFormDataEdit] = useState({
        Tcode: '',
        Tname:'',
        address: '', 
        Cperson:'',
        email: "",
        Cnumber: "",
    });
    
   

    const columnDefs = [
        { headerName: 'Cust/Tenant/Cons code', field: 'Tcode' },
        { headerName: 'Cust/Tenant/Cons Name', field: 'Tname' },
        { headerName: 'Address', field: 'address' },
        { headerName: 'Contact person', field: 'Cperson' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Contact Number', field: 'Cnumber' },
        
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
        const response = await axios.get("http://localhost:5000/tenant");
        if (response.data.success) {
            console.log(response.data.data);
            setTableData(response.data.data);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/createtenant", formData);
        if (response.data.success) {
            alert(response.data.message);
            getFetchData();
            setFormData({  
            Tcode: '',
            Tname:'',
            address: '', 
            Cperson:'',
            email: "",
            Cnumber: "",});
            setAddSection(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting:", id);
            const response = await axios.delete(`http://localhost:5000/deletetenant/${id}`);
            if (response.data.success) {
                setTableData(prevData => prevData.filter(item => item._id !== id));
                alert(response.data.message);
            } else {
                alert("Failed to delete location" + response.data.message);
            }
        } catch (error) {
            console.error("Error deleting location:", error);
            alert("An error occurred while deleting the company");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await axios.put("http://localhost:5000/updatetenant", formDataEdit);
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
        exportToExcel(tableData, "Tenants", "TenantData.xlsx");
    };

    return (
        <>
            <Nav />
            <div style={{ paddingLeft: "50px" }}>
                <Grid>
                    <TenantCanvas
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
            
        </>
    );
};

export default Tenant;
