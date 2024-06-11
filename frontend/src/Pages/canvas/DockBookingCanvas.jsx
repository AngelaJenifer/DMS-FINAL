import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { exportToExcel } from '../utils/excelUtils';

const DockBookingCanvas = ({
    show,
    setAddSection,
    handleSubmit,
    handleOnChange,
    formData,
    editSection,
    handleEditOnChange,
    handleUpdate,
    formDataEdit,
}) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
    }, [show]);

    const toggleShow = () => {
        setVisible(!visible);
        setAddSection(!visible);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Dock List</h2>
                
                    <Button
                        variant="primary"
                        onClick={toggleShow}
                        style={{ backgroundColor: '#4d7c8a', marginLeft:'1000px' }} // Added margin to the right
                    >
                        Add Dock Booking
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={exportToExcel}
                        style={{ backgroundColor: '#4d7c8a', marginRight:'20px' }}
                    >
                        Export to Excel
                    </Button>
                
            </div>
            <Offcanvas
                show={visible}
                onHide={toggleShow}
                style={{ width: "80%" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {editSection ? "Edit Dock" : "Add Dock"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Form onSubmit={editSection ? handleUpdate : handleSubmit}>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="Lname">Location Name <span style={{color: "red"}}>*</span></Label>
                                    <Input
                                        id="Lname"
                                        name="Lname"
                                        type="select"
                                        value={editSection ? formDataEdit.Lname : formData.Lname}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Ctype">Commodity </Label>
                                    <Input
                                        id="Ctype"
                                        name="Ctype"
                                        type="select"
                                        value={editSection ? formDataEdit.Ctype : formData.Ctype}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Tname">Customer/Tenant/Consignee Name <span style={{color: "red"}}>*</span></Label>
                                    <Input
                                        id="Tname"
                                        name="Tname"
                                        type="select"
                                        value={editSection ? formDataEdit.Tname : formData.Tname}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Ttype">Truck Type </Label>
                                    <Input
                                        id="Ttype"
                                        name="Ttype"
                                        type="select"
                                        value={editSection ? formDataEdit.Ttype : formData.Ttype}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

                                
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="Lcode">Location Code</Label>
                                    <Input
                                        id="Lcode"
                                        name="Lcode"
                                        type="text"
                                        disabled='true'
                                        value={editSection ? formDataEdit.Lcode : formData.Lcode}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                    <FormGroup>
                                    <Label for="OType">Order Type </Label>
                                    <Input
                                        id="OType"
                                        name="OType"
                                        type="select"
                                        value={editSection ? formDataEdit.OType : formData.OType}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Tcode">Customer/Tenant/Consignee Code </Label>
                                    <Input
                                        id="Tcode"
                                        name="Tcode"
                                        type="select"
                                        disabled='true'
                                        value={editSection ? formDataEdit.Tcode : formData.Tcode}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Tremark">Transporter Remarks</Label>
                                    <Input
                                        id="Tremark"
                                        name="Tremark"
                                        type="textarea"
                                        value={editSection ? formDataEdit.Tremark : formData.Tremark}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>


                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="LOdate">Loading Order Date</Label>
                                    <Input
                                        id="LOdate"
                                        name="LOdate"
                                        type="date"
                                        value={editSection ? formDataEdit.LOdate : formData.LOdate}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Oremark">Order Remarks</Label>
                                    <Input
                                        id="Oremark"
                                        name="Oremark"
                                        type="textarea"
                                        value={editSection ? formDataEdit.Oremark : formData.Oremark}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Caddress">Customer/Tenant/Consignee Address</Label>
                                    <Input
                                        id="Caddress"
                                        name="Caddress"
                                        type="text"
                                        value={editSection ? formDataEdit.Caddress : formData.Caddress}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="Bno">Dock Booking Number</Label>
                                    <Input
                                        id="Bno"
                                        name="Bno"
                                        type="text"
                                        disabled='true'
                                        value={editSection ? formDataEdit.Bno : formData.Bno}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                <Button>Available Slot and Time Booking</Button>
                                    <Label for="Dname">Dock Name</Label>
                                    <Input
                                        id="Dname"
                                        name="Dname"
                                        type="text"
                                        value={editSection ? formDataEdit.Dname : formData.Dname}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ENtime">Entry Time</Label>
                                    <Input
                                        id="ENtime"
                                        name="ENtime"
                                        type="text"
                                        value={editSection ? formDataEdit.ENtime : formData.ENtime}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                    <Label for="EXtime">Exist Time</Label>
                                    <Input
                                        id="EXtime"
                                        name="EXtime"
                                        type="text"
                                        value={editSection ? formDataEdit.EXtime : formData.EXtime}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                </Col>
                               
                                </Row>

                                <Col md={4}>
                                    <FormGroup>

                                <Button
                                    type="submit"
                                    style={{ marginTop: '15px', backgroundColor: '#4d7c8a' }}
                                >
                                    {editSection ? "Update Dock" : "Add Dock"}
                                </Button>
                                </FormGroup>
                                </Col>
                            
                        
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default DockBookingCanvas;