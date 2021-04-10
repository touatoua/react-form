import React, { useState } from 'react';
import './App.scss';
import { Button, Form, Row, Col } from "react-bootstrap";
import Fieldcontrol from '../src/components/field-control'
import { titleData, genderData } from '../src/static/index'
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux'

function App() {
  const [value, setValue] = useState(null);
  const [validated, setvalidated] = useState(false)
  const formReducer = useSelector(({ formReducer }) => formReducer)
  const [dataForm, setdataForm] = useState(formReducer.form)


  const editFormatter = (cell, rowIndex, name) => {
    return (
      <div>
        EDIT/DELETE
      </div>
    );
  };

  const checkFormatter =()=>{
    return (
      <div>

      </div>
    )
  }

  const columns = [
    {
      text: '',
      formatter: checkFormatter,
      // headerClasses: 'header-custom __checkAcc __icon',
    },
    {
      dataField: 'id',
      text: 'NAME'
    },
    {
      dataField: 'name',
      text: 'GENDER'
    },
    {
      dataField: 'price',
      text: 'MOBILE PHONE'
    },
    {
      dataField: 'price',
      text: 'NATIONALITY'
    },
    {
      text: '',
      formatter: editFormatter,
      // headerClasses: 'header-custom __checkAcc __icon',
    }
  ];


  const onChangeInput = (e) => {
    console.log('e ', e)

  }

  console.log('value ', value)

  const submit = (event) => {
    event.preventDefault();
    console.log('submit')

  }

  return (
    <div className='form'>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Row>
          <Col className='col-2'>
            <Fieldcontrol
              type='select'
              typeInput='text'
              name='Title'
              option={titleData}
            />
          </Col>
          <Col className='col-5'>
            <Fieldcontrol
              type='text'
              placeholder='First Name'
              typeInput='text'
              name='First Name'
            />
          </Col>
          <Col className='col-5'>
            <Fieldcontrol
              type='text'
              placeholder='Last Name'
              typeInput='text'
              name='Last Name'
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className='col-4'>
            <Fieldcontrol
              type='date'
              name='Birth Day'
            />
          </Col>
          <Col className='col-8'>
            <Fieldcontrol
              type='national'
              name='Nationality'
              onChange={onChangeInput}

            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              type='text'
              // placeholder='Last Name'
              typeInput='text'
              name='CitizenID'
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              type='radio'
              option={genderData}
              // // placeholder='Last Name'
              // typeInput='text'
              name='Gender'
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              type='phone'
              // placeholder='Last Name'
              name='Phone'
              onChange={onChangeInput}
            />

          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              type='text'
              // placeholder='Last Name'
              typeInput='text'
              name='Passport'
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              type='text'
              // placeholder='Last Name'
              typeInput='text'
              name='Expected Salary'
            />
          </Col>
          <Col>
            <Button type='submit'>Submit</Button>
          </Col>
        </Form.Row>
      </Form>

      <BootstrapTable keyField='id' data={dataForm} columns={columns} />


    </div >
  );
}

export default App;
