
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import Nav from '../Components/UI/Nav';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { exportToExcel } from './utils/excelUtils'
import DockBookingCanvas from './canvas/DockBookingCanvas';

const MultiLineHeader = ({ headerText, enableSorting, enableFilter, sortOrder, setSort }) => {
        const headerLines = headerText.split(" ");
    
        const handleSort = () => {
            if (enableSorting) {
                // Toggle sorting order when clicked
                const newSort = sortOrder === 'asc' ? 'desc' : 'asc';
                setSort(newSort);
            }
        };
    
        const renderSortIndicator = () => {
            if (enableSorting) {
                if (sortOrder === 'asc') {
                    return '↑';
                } else if (sortOrder === 'desc') {
                    return '↓';
                }
            }
            return null;
        };
    
    
        return (
            <div style={{ textAlign: 'center', whiteSpace: 'pre-wrap',cursor: enableSorting ? 'pointer' : 'default' }} onClick={handleSort} >
                {headerLines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {renderSortIndicator()}
    
            </div>
        );
    };
    


const Dockbooking = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [bookingNo, setBookingNo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        Bno: "",
        DBstatus: "",
        Reject: "",
        OType: "",
        CType: "",
        Lname: "",
        Dname: "",
        DinOut: "",
        Tname: "",
        TType: "",
        Tno: "",
        driver: "",
        Oremark: "",
        Tremark: "",
        RBdock: "",

    });
    const [formDataEdit, setFormDataEdit] = useState({
        Bno: "",
        DBstatus: "",
        Reject: "",
        OType: "",
        CType: "",
        Lname: "",
        Dname: "",
        DinOut: "",
        Tname: "",
        TType: "",
        Tno: "",
        driver: "",
        Oremark: "",
        Tremark: "",
        RBdock: "",
    });
    

    const columnDefs = [
        { field: "select" },
            { 
                field: "Bno.", 
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Booking No", enableSorting: true},
                sortable: true,
                filter: true,
        
            },
            { 
                field: "DBstatus", 
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Dock Booking Status",enableSorting:true},
                sortable: true,
                filter: true,
                },
            { field: "Reject"
        
             },
            { field: "OType",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Order Type",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "CType",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Commodity Type",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "Lname",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Location Name",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "Dname",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Dock Name",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "DinOut",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Dock In-Out",enableSorting:true },
             },
            { field: "Tname",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Cust/Tenant /Cons Name ",enableSorting:true,sort: '', setSort: () => {}  },
                width: 200,
             },
            { field: "TType",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Truck Type",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "Tno",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Truck No.",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "driver",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Driver 1",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "Oremark",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Order Remark",enableSorting:true,sort: '', setSort: () => {}  },
             },
            { field: "Tremark",
                headerComponent: MultiLineHeader,
                headerComponentParams: { headerText: "Transporter Remark",enableSorting:true,sort: '', setSort: () => {}  },
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
        sortable: true, filter: true, editable: true, flex: 2,
    };

    const getFetchData = async () => {
        const response = await axios.get("http://localhost:5000/dockbooking");
        if (response.data.success) {
            setTableData(response.data.data);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/createdockbooking", formData);
        if (response.data.success) {

            alert(response.data.message);
            getFetchData();
            setFormData({
                Bno: "",
                DBstatus: "",
                Reject: "",
                OType: "",
                CType: "",
                Lname: "",
                Dname: "",
                DinOut: "",
                Tname: "",
                TType: "",
                Tno: "",
                driver: "",
                Oremark: "",
                Tremark: "",
                RBdock: "",
            });
            setAddSection(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting:", id);
            const response = await axios.delete(`http://localhost:5000/deletedockbooking/${id}`);
            if (response.data.success) {
                // Update tableData state to reflect the changes
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
        const response = await axios.put("http://localhost:5000/updatedockbooking", formDataEdit);
        if (response.data.success) {
            getFetchData();
            alert(response.data.message);
            setEditSection(false);
        }
    };


    const handleEdit = (data) => {
        console.log("Editing:", data)

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
        exportToExcel(tableData, "dockbooking", "DockBooking.xlsx");
    };


   // Function to handle search action
    const handleSearch = () => {


        // Reset current page to 1 when performing a new search
        setCurrentPage(1);
        // Perform data fetching or filtering logic based on search criteria
        // This is just a placeholder for actual search logic.
    };

    
    
    return (
        <>
            <Nav />
            <div style={{paddingLeft: "50px"}}>
            <Grid>
                <DockBookingCanvas
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
            </div>



            <div style={{paddingLeft: "50px"}}>
            <hr />
            <div>
                 <h4>Search Booking</h4>
             </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', alignItems: 'center' }}>
                <div>
                    <p>Location Name :</p>
                    <select id="dropdown">
                     <option value="text" aria-placeholder='select'>--Select--</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                    </select>
                </div>

                <div>
                    <p>From Date :</p>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>

                <div>
                    <p>To Date :</p>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>

                <div>
                    <p>Cust/Tenant/Cons :</p>
                    <select id="dropdown">
                    <option value="text" aria-placeholder='select'>--Select--</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}

                    </select>
                </div>

                <div style={{paddingTop: "15px"}}> 
                    <p>Dock-IN-OUT Date :</p>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}  />

                    <button type="button" className="btn btn-primary" style={{ backgroundColor: '#4d7c8a',marginLeft: "20px", height: "40px", width:"150px" }} onClick={handleSearch}>Search</button>

                </div>

                <div style={{paddingTop: "15px"}}>
                    <p>Action :</p>
                    <select id="dropdown">
                        <option value="text" aria-placeholder='select'>--Select--</option>
                        <option value="text">Approved</option>
                        <option value="text">Rejected</option>
                        </select>

                        <button type="button" className="btn btn-primary" style={{ backgroundColor: '#4d7c8a', marginLeft: "20px", height: "40px", width:"150px"}} onClick={handleSearch}>Update</button>

                </div>
              </div>


                <br/>
                </div>

            
            <div style={{ paddingLeft: "50px" }}>
            
            
                
                <hr style={{ width: '95vw', border: '1px solid black' }} />
                <div className='d-flex vh-30 justify-content-center align-items-center'>
                    <div className='w-100 bg-white rounded p-3'>
                        <div className="ag-theme-quartz" style={{ height: 600, width: '100%' }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowData={tableData}
                                pagination={true}
                                height={600}
                                headerHeight={80}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dockbooking;