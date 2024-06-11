import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const DockCanvas = ({
    show,
    setAddSection,
    handleSubmit,
    handleOnChange,
    formData,
    editSection,
    handleEditOnChange,
    handleUpdate,
    formDataEdit,
    exportToExcel,
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
                        style={{ backgroundColor: '#4d7c8a', marginLeft:'1100px' }} // Added margin to the right
                    >
                        Add Dock
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
                        {editSection ? "Edit Location" : "Add Location"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Form onSubmit={editSection ? handleUpdate : handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="locationname">Location Name <span style={{color: "red"}}>*</span></Label>
                                    <Input
                                        id="locationname"
                                        name="locationname"
                                        type="text"
                                        value={editSection ? formDataEdit.locationname : formData.locationname}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

                                
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="Nodocks">Number of Docks</Label>
                                    <Input
                                        id="Nodocks"
                                        name="Nodocks"
                                        type="text"
                                        value={editSection ? formDataEdit.Nodocks : formData.Nodocks}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                    <Label for="remarks">Remarks</Label>
                                    <Input
                                        id="remarks"
                                        name="remarks"
                                        type="textarea"
                                        value={editSection ? formDataEdit.remarks : formData.remarks}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            name="Active"
                                            checked={editSection ? formDataEdit.Active : formData.Active}
                                            onChange={editSection ? handleEditOnChange : handleOnChange}
                                        />
                                        Active
                                    </Label>
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

export default DockCanvas;