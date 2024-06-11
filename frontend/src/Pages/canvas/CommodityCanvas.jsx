import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const CommodityCanvas = ({
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
                <h2>Commodity List</h2>
                <Button
                    variant="primary"
                    onClick={toggleShow}
                    style={{ backgroundColor: '#4d7c8a', marginLeft:'950px' }} // Added margin to the right
                >
                    Add Commodity
                </Button>

                <Button
                        variant="secondary"
                        onClick={exportToExcel}
                        style={{ backgroundColor: '#4d7c8a',marginRight:'20px' }}
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
                        {editSection ? "Edit Commodity" : "Add Commodity"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Form onSubmit={editSection ? handleUpdate : handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="commodityname">Commodity Name *</Label>
                                    <Input
                                        id="commodityname"
                                        name="commodityname"
                                        type="text"
                                        value={editSection ? formDataEdit.commodityname : formData.commodityname}
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
                                    <Label for="commoditycode">Commodity Code</Label>
                                    <Input
                                        id="commoditycode"
                                        name="commoditycode"
                                        type="text"
                                        value={editSection ? formDataEdit.commoditycode : formData.commoditycode}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

                            </Col>
                           

                            </Row>
                            <Button
                                    type="submit"
                                    style={{ marginTop: '15px', backgroundColor: '#4d7c8a' }}
                                >
                                    {editSection ? "Update Commodity" : "Add Commodity"}
                                </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CommodityCanvas;