import React, { useState } from 'react';
import './App.scss';
import { Button, Form, Col, Row } from "react-bootstrap";
import Fieldcontrol from '../src/components/field-control'
import { titleData, genderData } from '../src/static/index'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux'
import countryList from "react-select-country-list";
import * as formAction from '../src/redux/actions/form'

const pagination = paginationFactory({
  hideSizePerPage: true,
});


function App() {
  const formReducer = useSelector(({ formReducer }) => formReducer)
  const dispatch = useDispatch()

  const [validated, setvalidated] = useState(false)
  const [dataForm, setdataForm] = useState(formReducer.form)
  const [objForm, setobjForm] = useState({ gender: 'Male', nationality: 'Thailand' })
  const [checkAll, setcheckAll] = useState(false)

  const onChangeInput = ({ target: { name, value } }) => {
    console.log('name ', name)
    console.log('value', value)

    setobjForm({ ...objForm, [name]: value })

  }

  const onChangeIdCard = (e) => {
    setobjForm({ ...objForm, citizen_id: e.value })
  }

  const onChangePhone = (e) => {
    setobjForm({ ...objForm, phone: e })
  }

  const onChangeNumber = (e, name) => {
    setobjForm({ ...objForm, [name]: e.value })

  }



  const selectRow  = {
    mode: 'checkbox',
      // onSelect: (row, isSelect, rowIndex, e) => {
    //   console.log('rowIndex ', rowIndex)
    //   return 
    // },
    
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        return dataForm.map((row, i) => i);
      } else {
        return []
      }
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert('please complete all requried input field')
    } else {
      dispatch(formAction.onAdd(objForm))
    }
    setvalidated(true);

  }

  const editFormatter = (cell, rowIndex, name) => {
    return (
      <div>
        EDIT/DELETE
      </div>
    );
  };

  const checkFormatter = () => {
    return (
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" />
      </Form.Group>
    )
  }

  const nameFormatter = (cell, rowIndex, name) => {
    return (
      <div>{`${rowIndex.firstname} ${rowIndex.lastname}`}</div>
    )
  }


  const columns = [
    // {
    //   text: '',
    //   formatter: checkFormatter,
    //   // headerClasses: 'header-custom __checkAcc __icon',
    // },
    {
      formatter: nameFormatter,
      text: 'NAME'
    },
    {
      dataField: 'gender',
      text: 'GENDER'
    },
    {
      dataField: 'phone',
      text: 'MOBILE PHONE'
    },
    {
      dataField: 'nationality',
      text: 'NATIONALITY'
    },
    {
      text: '',
      formatter: editFormatter,
      // headerClasses: 'header-custom __checkAcc __icon',
    }
  ];

  console.log('objForm ', objForm)

  return (
    <div className='form'>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Row>
          <Col className='col-2'>
            <Fieldcontrol
              value={objForm.title}
              label='Title'
              type='select'
              typeInput='text'
              name='title'
              option={titleData}
              onChange={onChangeInput}
              require={true}
            />
          </Col>
          <Col className='col-5'>
            <Fieldcontrol
              value={objForm.firstname}
              label='First Name'
              type='text'
              placeholder='First Name'
              typeInput='text'
              name='firstname'
              onChange={onChangeInput}
              require={true}

            />
          </Col>
          <Col className='col-5'>
            <Fieldcontrol
              label='Last Name'
              type='text'
              placeholder='Last Name'
              typeInput='text'
              name='lastname'
              onChange={onChangeInput}
              require={true}

            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className='col-4'>
            <Fieldcontrol
              onChange={onChangeInput}
              label='Birth Day'
              type='date'
              name='birthday'
              require={true}

            />
          </Col>
          <Col className='col-8'>
            <Fieldcontrol
              defaultValue={'Thailand'}
              value={objForm.nationality}
              label='Nationality'
              type='select'
              typeInput='text'
              name='nationality'
              option={countryList().getData()}
              onChange={onChangeInput}
              require={true}


            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              format='#-####-#####-##-#'
              label='CitizenID'
              type='citizen'
              placeholder='CitizenID'
              name='citizen_id'
              onChange={onChangeIdCard}
              value={objForm.citizen_id}
              require={true}

            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              label='Gender'
              type='radio'
              option={genderData}
              name='gender'
              onChange={onChangeInput}
              value={objForm.gender}
              require={true}


            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              label='Phone'
              type='phone'
              name='phone'
              onChange={onChangePhone}
              require={true}
              value={objForm.phone}

            />

          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              label='Passport No'
              type='text'
              placeholder='Passport No'
              typeInput='number'
              name='passport'
              onChange={onChangeInput}
              require={true}

            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='col-8'>
            <Fieldcontrol
              label='Expected Salary'
              type='number'
              decimalScale={2}
              placeholder='Expected Salary'
              name='salary'
              onChange={(e) => onChangeNumber(e, 'salary')}
              value={objForm.salary}
              require={true}
            />

          </Col>
          <Col>
            <Button type='submit'>Submit</Button>
          </Col>
        </Form.Row>
      </Form>

      <div className='uper-table'>
        {/* <Form.Row>
          <Col className='col-8'>
            <Form.Group as={Row} >
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onChange={onSelectAll} />
              </Form.Group>
              <Col >
                <Form.Label column >
                  Select All
                </Form.Label>
              </Col>
              <Col>
                <Button >Delete</Button>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row> */}
      </div>
      <BootstrapTable keyField='id' data={dataForm} columns={columns} pagination={pagination} selectRow={selectRow } />


    </div >
  );
}

export default App;
