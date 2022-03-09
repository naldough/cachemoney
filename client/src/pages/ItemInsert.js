import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';

const h2 = styled.h1.attrs({
  className: 'h2',
})`
  padding: 5px;

`;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  background: #88CCF1;
  font-family: 'Lato', sans-serif;
  margin: 40px;
  .box1 {
    background: #f4f7f8;
    float: left;
    width: 50%;
    padding-bottom: 10px;
  }
  .box2 {
    background: #f4f7f8;
    float: right;
    width: 50%; 
    padding-bottom: 10px;
  }
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 10px 10px 10px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 10px 10px 10px 5px;
`;

class ItemInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: '',
      age: '',
      sex: '',
      bmi: '',
      zipCode: '',
      examId: '',
      imageUrl: '',
      date: '',
      keyFindings: '',
      brixiaScore: ''
    };
  }

  handleChangeInputPatientId = async event => {
    const patientId = event.target.value;
    this.setState({ patientId });
  };

  handleChangeInputAge = async event => {
    const age = event.target.value;
    this.setState({ age });
  };

  handleChangeInputSex = async event => {
    const sex = event.target.value;
    this.setState({ sex });
  };

  handleChangeInputBmi = async event => {
    const bmi = event.target.value;
    this.setState({ bmi });
  };

  handleChangeInputZipCode = async event => {
    const zipCode = event.target.value;
    this.setState({ zipCode });
  };
 
  // Exam Info states

  handleChangeInputExamId = async event => {
    const examId = event.target.value;
    this.setState({ examId });
  };

  handleChangeInputImageUrl = async event => {
    const imageUrl = event.target.value;
    this.setState({ imageUrl });
  };

  handleChangeInputDate = async event => {
    const date = event.target.value;
    this.setState({ date });
  };

  handleChangeInputKeyFindings= async event => {
    const keyFindings = event.target.value;
    this.setState({ keyFindings });
  };

  handleChangeInputBrixiaScore = async event => {
    const brixiaScore= event.target.value;
    this.setState({ brixiaScore });
  };


  insertSingleItem = async item => {
    try {
      const resp = await api
        .insertItem(item);
      console.log('insertItem: resp');
      console.log(resp);
      if ((resp.data || {}).success) {
        const newItem = JSON.parse(resp.config.data);
        console.log('insertItem: newItem', newItem);
      }
      return resp;
    } catch (err) {
      console.error(`ERROR in 'insertSingleItem': ${err}`);
      console.error(err);
      return err;
    }
  };

  handleInsertItem = event => {
    event.preventDefault();

    const { patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore } = this.state;
    const item = { patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore };

    this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            patientId: '',
            age: '',
            sex: '',
            bmi: '',
            zipCode: '',
      
            examId: '',
            imageUrl: '',
            date: '',
            keyFindings: '',
            brixiaScore: ''
          });
        } else {
          throw resp;
        }
      })
      .catch(err => {
        // TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the item... :(`);
        console.log('handleInsertItem: err');
        console.log(err);
      });
  };

  render() {
    const { patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore } = this.state;


    return (
      <Wrapper>

        <h4>Create Exam</h4>

        <Button onClick={this.handleInsertItem}>Create</Button>

        <CancelButton href={'/items'}>Cancel</CancelButton>
        <br></br>

        <div className="box1">
          <h4>Patient Info </h4>
          <Label>Pateint ID: </Label>
          <InputText type="text" name="patientId" value={patientId} onChange={this.handleChangeInputPatientId} />

          <Label>Age: </Label>
          <InputText type="text" value={age} onChange={this.handleChangeInputAge} />

          <Label>Sex: </Label>
          <InputText type="text" value={sex} onChange={this.handleChangeInputSex} />
          
          <Label>BMI: </Label>
          <InputText type="text" value={bmi} onChange={this.handleChangeInputBmi} />

          <Label>ZipCode: </Label>
          <InputText type="text" value={zipCode} onChange={this.handleChangeInputZipCode} />

        </div>
        {/* Exam inputs */}
        <div className="box2">
          <h4>Exam Info</h4>
          <Label>Exam ID: </Label>
          <InputText type="text" name="examId" value={examId} onChange={this.handleChangeInputExamId} />

          <Label>Image URL: </Label>
          <InputText type="text" value={imageUrl} onChange={this.handleChangeInputImageUrl} />

          <Label>Date: </Label>
          <InputText type="date" value={date} onChange={this.handleChangeInputDate} />
          
          {/* input shud be textarea */}
          <Label>KeyFindings: </Label>
          <InputText type="text" value={keyFindings} onChange={this.handleChangeInputKeyFindings} />

          <Label>Brixia Score: </Label>
          <InputText type="text" value={brixiaScore} onChange={this.handleChangeInputBrixiaScore} />

        </div>
       
      </Wrapper>
    );
  }
}

export default ItemInsert;
