import React from 'react'
import { Form, Col, Row } from "react-bootstrap";
// import CountrySelect from 'react-bootstrap-country-select';
import PhoneInput from 'react-phone-input-2'
import NumberFormat from "react-number-format";

export default function fieldcontrol(props) {
    const { type, placeholder, typeInput, name, option, onChange, label, value, format, decimalScale, suffix, require, star } = props
    switch (type) {
        case 'text':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label} {star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <Form.Control
                            name={name}
                            type={typeInput}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            format={format}
                            required={require}
                        />
                    </Col>
                </Form.Group>
            )
        case 'select':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3} >
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <Form.Control as="select" onChange={onChange} name={name} required={require} value={value}>
                            {option.map((e, i) =>
                                name === 'nationality' ? <option value={e.label} key={i}>{e.label}</option>
                                    : <option value={e} key={i}>{e}</option>
                            )}
                        </Form.Control>
                    </Col>
                </Form.Group>
            )

        case 'date':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <Form.Control type="date" name={name} onChange={onChange} required={require} value={value} />
                    </Col>
                </Form.Group>
            )
        case 'radio':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        {option.map((e, i) =>
                            <Form.Check
                                inline label={e}
                                type={'radio'}
                                key={i}
                                name={name}
                                onChange={onChange}
                                value={e}
                                checked={e === value}
                                required={require}
                            />

                        )}

                    </Col>
                </Form.Group>
            )

        case 'phone':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <PhoneInput
                            country='th'
                            placeholder="Enter phone number"
                            value={value}
                            onChange={onChange}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                            }}
                        />
                    </Col>
                </Form.Group>
            )

        case 'citizen':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <NumberFormat
                            placeholder={placeholder}
                            value={value}
                            format={format}
                            type={typeInput}
                            onValueChange={onChange}
                            customInput={Form.Control}
                            required={require}
                        />
                    </Col>
                </Form.Group>
            )

        case 'number':
            return (
                <Form.Group as={Row} >
                    <Form.Label column md={3}>
                        {label}{star && <span className='-require' >*</span>}
                    </Form.Label>
                    <Col >
                        <NumberFormat
                            placeholder={placeholder}
                            value={value}
                            format={format}
                            type={typeInput}
                            onValueChange={onChange}
                            customInput={Form.Control}
                            decimalScale={decimalScale}
                            fixedDecimalScale={decimalScale}
                            suffix={suffix}
                            required={require} />
                    </Col>
                </Form.Group>
            )


        default:
            break;
    }
}
