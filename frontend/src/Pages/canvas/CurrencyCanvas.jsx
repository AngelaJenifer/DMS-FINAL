import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { getNames } from 'country-list';
import currencyCodes from 'currency-codes';

const CurrencyCanvas = ({
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
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        setVisible(show);
        setCountryList(getNames());
    }, [show]);

    const toggleShow = () => {
        setVisible(!visible);
        setAddSection(!visible);
    };

    const handleCountryChange = (e) => {
        const { value } = e.target;
        const currency = currencyCodes.country(value)?.[0]?.code || '';
        const changeHandler = editSection ? handleEditOnChange : handleOnChange;

        changeHandler({ target: { name: 'country', value } });
        changeHandler({ target: { name: 'currency', value: currency } });
    };

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Country & Currency List</h2>
            <Button
                        variant="primary"
                        onClick={toggleShow}
                        style={{ backgroundColor: '#7c5f87', marginLeft:'800px' }} // Added margin to the right
                    >
                        Add Currency
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={exportToExcel}
                        style={{ backgroundColor: '#7c5f87', marginRight:'20px' }}
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
                        {editSection ? "Edit country" : "Add country"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Form onSubmit={editSection ? handleUpdate : handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="country">Country *</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        type="select"
                                        value={editSection ? formDataEdit.country : formData.country}
                                        onChange={handleCountryChange}
                                    >
                                        <option value="">Select a country</option>
                                        {countryList.map((country) => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </Input>
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
                                    <Label for="currency">Currency</Label>
                                    <Input
                                        id="currency"
                                        name="currency"
                                        type="text"
                                        value={editSection ? formDataEdit.currency : formData.currency}
                                        onChange={editSection ? handleEditOnChange : handleOnChange}
                                    />
                                </FormGroup>

                                <Button
                                    type="submit"
                                    style={{ marginTop: '15px', backgroundColor: '#7c5f87' }}
                                >
                                    {editSection ? "Update Country" : "Add Country"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CurrencyCanvas;
