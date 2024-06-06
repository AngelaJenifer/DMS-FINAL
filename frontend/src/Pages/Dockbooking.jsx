import React, { useEffect, useState } from 'react';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import Nav from '../Components/UI/Nav';
import { SortIndicatorComp } from 'ag-grid-react';


const MultiLineHeader = ({ headerText, enableSorting, sort, setSort }) => {
    const headerLines = headerText.split(" ");

    const handleSort = () => {
        if (enableSorting) {
            // Toggle sorting order when clicked
            const newSort = sort === 'asc' ? 'desc' : 'asc';
            setSort(newSort);
        }
    };

    const renderSortIndicator = () => {
        if (enableSorting) {
            if (sort === 'asc') {
                return '↑';
            } else if (sort === 'desc') {
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


const DockBooking = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [bookingNo, setBookingNo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch locations data
        fetchLocations();
        // Fetch customers data
        fetchCustomers();
    }, []);

    const fetchLocations = () => {
        // Replace 'your_api_endpoint' with your actual API endpoint to fetch locations
        fetch('http://localhost:3001/locations')
            .then(response => response.json())
            .then(data => setLocations(data))
            .catch(error => console.error('Error fetching locations:', error));
    };

    const fetchCustomers = () => {
        // Replace 'your_api_endpoint' with your actual API endpoint to fetch customers
        fetch('http://localhost:3001/customers')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    };

const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "select" },
    { 
        field: "Booking No.", 
        headerComponent: MultiLineHeader,
        headerComponentParams: { headerText: "Booking No", enableSorting: true,sort: '', setSort: () => {}},

        sortable: true,
    },
    { 
        field: "Dock Booking Status", 
        headerComponent: MultiLineHeader,
        headerComponentParams: { headerText: "Dock Booking Status",enableSorting:true,sort: '', setSort: () => {}  },
        sortable:true,
        },
    { field: "Reject" },
    { field: "Order Type" },
    { field: "Commodity Type" },
    { field: "Location Name" },
    { field: "Dock Name" },
    { field: "Dock-in-out" },
    { field: "Cust/Tenant/Cons Name" },
    { field: "Truck Type" },
    { field: "Truck No." },
    { field: "Driver 1" },
    { field: "Order Remark" },
    { field: "Transporter Remark" },
    { field: "Edit" },
  ]);
    // Function to handle search action
    const handleSearch = () => {
        

        // Reset current page to 1 when performing a new search
        setCurrentPage(1);
        // Perform data fetching or filtering logic based on search criteria
        // This is just a placeholder for actual search logic.
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Implement logic to fetch data for the new page
    };

    return (
        <>
        <Nav />
        <div style={{paddingLeft: "50px"}}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{paddingTop: "20px"}}>
                    <h1>Dock Booking List</h1>
                </div>
                <div style={{paddingRight: "50px"}}>
                    <button type="button" className="btn btn-primary" style={{ backgroundColor: '#7c5f87' }} onClick={handleSearch}>Add Dock Booking</button>
                </div>
            </div>
            <hr style={{ width: '93vw', border: '1px solid black' }} />


            <div>
                <h2>Search Booking</h2>
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
                    
                    <button type="button" className="btn btn-primary" style={{ backgroundColor: '#7c5f87',marginLeft: "20px", height: "40px", width:"150px" }} onClick={handleSearch}>Search</button>
                    
                </div>

                <div style={{paddingTop: "15px"}}>
                    <p>Action :</p>
                    <select id="dropdown">
                        <option value="text" aria-placeholder='select'>--Select--</option>
                        <option value="text">Approved</option>
                        <option value="text">Rejected</option>
                        </select>

                        <button type="button" className="btn btn-primary" style={{ backgroundColor: '#7c5f87', marginLeft: "20px", height: "40px", width:"150px"}} onClick={handleSearch}>Update</button>

                </div>
              </div>


                <br/>

           {/* ag grid starts from here */}
               <div className='ag-theme-quartz' style={{ height:"100vh" , width:'95vw'}}>
                <AgGridReact 
                rowData={rowData} 
                columnDefs={colDefs}
                pagination = {true}
                 domLayout='autoHeight' // Adjust the layout to fit content automatically
                 defaultColDef={{ flex: 2 }} // Set all columns to have flexible width
                 headerHeight={60}
                />
               </div>
               </div>
        </>
    );
}

export default DockBooking;