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



function App() {
  const formReducer = useSelector(({ formReducer }) => formReducer)
  const dispatch = useDispatch()

  const [validated, setvalidated] = useState(false)
  const [dataForm, setdataForm] = useState(formReducer.form)
  const [objForm, setobjForm] = useState({ gender: 'Male', nationality: 'Thailand' })
  // const [checkAll, setcheckAll] = useState(false)
  const [selectArray, setselectArray] = useState(new Array)
  const [currentPage, setcurrentPage] = useState(0)

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

  // const onChangeCheckbox = (row, rowIndex) => {
  //   // console.log('row', row)
  //   // dataForm[rowIndex] = { ...dataForm[rowIndex], check: !row.check }
  //   // console.log('dataForm[rowIndex] ', dataForm[rowIndex])
  //   // setdataForm([...dataForm])

  // }

  const deleteRows = (rowIndex) => {
    dataForm.splice(((currentPage - 1) * 5) + rowIndex, 1)
    dispatch(formAction.onDelete(dataForm))
  }

  const onDeleteSelect = () => {
    let filtered = dataForm.filter(function (value, index, arr) {
      return selectArray.indexOf(index) === -1
    });
    setdataForm(filtered)
    dispatch(formAction.onDelete(filtered))

    setselectArray(new Array)

  }

  const pagination = paginationFactory({
    hideSizePerPage: true,
    sizePerPage: 5,
    onPageChange: (page) => {
      setcurrentPage(page)
    }
  });

  const selectRow = {
    mode: 'checkbox',
    onSelect: (row, isSelect, rowIndex, e) => {

      switch (isSelect) {
        case true:
          selectArray.push(rowIndex)
          break;
        case false:
          let index = selectArray.indexOf(rowIndex);
          selectArray.splice(index, 1)
          break;

      }
      setselectArray([...selectArray])
      // console.log('isSelect ', isSelect)
      // console.log('row ', row)
      // return
    },

    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        console.log('rows ', rows)
        let rowSelect = new Array
        rows.map((row, i) => {
          selectArray.push(i)
          rowSelect.push(row.id)
        })
        setselectArray([...selectArray])
        console.log('rowSelect ',rowSelect)
        return rowSelect;
      } else {
        setselectArray(new Array)
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

  const editFormatter = (cell, row, rowIndex) => {
    return (
      <Row className='fn-table'>
        <Col>
          EDIT
        </Col>
        /
        <Col>
          <span onClick={() => deleteRows(rowIndex)}>
            DELETE
        </span>

        </Col>
      </Row>

    );
  };

  // const checkFormatter = (cell, row, rowIndex) => {
  //   return (
  //     <Form.Group>
  //       <Form.Check type="checkbox" onChange={() => onChangeCheckbox(row, rowIndex)} />
  //     </Form.Group>
  //   )
  // }

  const nameFormatter = (cell, row, rowIndex) => {
    return (
      <div>{`${row.firstname} ${row.lastname}`}</div>
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
        <Form.Row>
          <Col className='col-8'>
            <Form.Group as={Row} >
              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onChange={() => setcheckAll(!checkAll)} />
              </Form.Group>
              <Col >
                <Form.Label column >
                  Select All
                </Form.Label>
              </Col> */}
              <Col>
                <Button onClick={onDeleteSelect}>Delete Select</Button>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
      </div>
      <BootstrapTable keyField='id' data={dataForm} columns={columns} pagination={pagination} selectRow={selectRow} />

    </div >
  );
}

export default App;
