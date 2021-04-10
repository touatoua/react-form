import React from 'react'
import { Form, Col, InputGroup, Button, Image, Row, FormControl } from "react-bootstrap";
import CountrySelect from 'react-bootstrap-country-select';
import PhoneInput from 'react-phone-input-2'

export default function fieldcontrol(props) {
    const { type, placeholder, typeInput, name, defaultValue, option, onChange } = props
    switch (type) {
        case 'text':
            return (
                <Form.Group as={Row} >
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        <Form.Control type={typeInput} placeholder={placeholder} onChange={onChange} />
                    </Col>
                </Form.Group>
            )
        case 'select':
            return (
                <Form.Group as={Row} c>
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        <Form.Control as="select" defaultValue={defaultValue}>
                            {option.map((e, i) =>
                                <option value={e} key={i}>{e}</option>
                            )}
                        </Form.Control>
                    </Col>
                </Form.Group>
            )

        case 'date':
            return (
                <Form.Group as={Row} >
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        <Form.Control type="date" name='date_of_birth' />
                    </Col>
                </Form.Group>
            )

        case 'national':
            return (
                <Form.Group as={Row} >
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        <CountrySelect
                            // value={value}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
            )
        case 'radio':
            return (
                <Form.Group as={Row} >
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        {option.map((e, i) =>
                            <Form.Check inline label={e} type={'radio'} key={i} name={name} />

                        )}

                    </Col>
                </Form.Group>
            )

        case 'phone':
            return (
                <Form.Group as={Row} >
                    <Form.Label column >
                        {name}
                    </Form.Label>
                    <Col >
                        <PhoneInput
                            placeholder="Enter phone number"
                            // value={value}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
            )


        default:
            break;
    }
}
