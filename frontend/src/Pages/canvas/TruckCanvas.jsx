import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const TruckCanvas = ({
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',paddingLeft:'50px' }}>
                <h2>TruckType List</h2>
                <Button
                    variant="primary"
                    onClick={toggleShow}
                    style={{ backgroundColor: '#4d7c8a', marginLeft:'950px' }} // Added margin to the right
                >
                    Add TruckType
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
                        {editSection ? "Edit Truck" : "Add Truck"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Form onSubmit={editSection ? handleUpdate : handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="truckname">Truck Name *</Label>
                                    <Input
                                        id="truckname"
                                        name="truckname"
                                        type="text"
                                        value={editSection ? formDataEdit.truckname : formData.truckname}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

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
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="truckcode">Country</Label>
                                    <Input
                                        id="truckcode"
                                        name="truckcode"
                                        type="text"
                                        value={editSection ? formDataEdit.truckcode : formData.truckcode}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

                                <Button
                                    type="submit"
                                    style={{ marginTop: '15px', backgroundColor: '#4d7c8a' }}
                                >
                                    {editSection ? "Update Truck" : "Add Truck"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default TruckCanvas;