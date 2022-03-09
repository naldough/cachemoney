import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';

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
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;
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

class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
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

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.fetchSingleItem(itemId).then(resp => {
      const { item } = resp.data;
      this.setState({ ...item});
    });
  }

  fetchSingleItem = itemId => {
    return api
      .getItemById(itemId)
      .then(resp => {
        console.log('getItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  
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

  // Exam Info 

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
  
  handleChangeInputKeyFindings = async event => {
    const keyFindings= event.target.value;
    this.setState({ keyFindings });
  };

  handleChangeInputBrixiaScore = async event => {
    const brixiaScore = event.target.value;
    this.setState({ brixiaScore });
  };

  updateSingleItem = item => {
    return api
      .updateItemById(item._id, item)
      .then(resp => {
        console.log('updateItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('newItem: ', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleUpdateItem = event => {
    const { _id, patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore} = this.state;
    const item = {_id, patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore};

    return this.updateSingleItem(item)
      .then(resp => {
        console.log('handleUpdateItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item updated successfully');
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the item... :(`);
        console.error('handleUpdateItem: err');
        console.error(err);
      });
  };

  confirmUpdateItem = event => {
    if (window.confirm(`Are you sure you want to update this item? ${this.state._id}`)) {
      return this.handleUpdateItem(event);
    }
  };

  render() {
    const { _id, patientId, age, sex, bmi, zipCode, examId, imageUrl, date, keyFindings, brixiaScore} = this.state;

    return (

      _id && (
        <Wrapper>
        <h4>Update Exam</h4>
        <Button onClick={this.confirmUpdateItem}>Update</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
        <br></br>

        <div className="box1">
          <h4>Patient Info</h4>

          <Label>Ptient ID: </Label>
          <InputText type="text" value={patientId} onChange={this.handleChangeInputPatientId} />

          <Label>Age: </Label>
          <InputText type="text" value={age} onChange={this.handleChangeInputAge} />

          <Label>Sex: </Label>
          {/* <select> options 
              </select> */}

          <InputText type="text" value={sex} onChange={this.handleChangeInputSex} />

          <Label>BMI: </Label>
          <InputText type="text" value={bmi} onChange={this.handleChangeInputBmi} />

          <Label>ZipCode: </Label>
          <InputText type="text" value={zipCode} onChange={this.handleChangeInputZipCode} />

        </div>

        <div className="box2">
          <h4>Exam Info</h4>

          <Label>Exam ID: </Label>
          <InputText type="text" value={examId} onChange={this.handleChangeInputExamId} />

          <Label>Image URL: </Label>
          <InputText type="text" value={imageUrl} onChange={this.handleChangeInputImageUrl} />

          <Label>Date: </Label>
          <InputText type="date" value={date} onChange={this.handleChangeInputDate} />

          <label>Key Findings: </label>
          <InputText value={keyFindings} onChange={this.handleChangeInputKeyFindings} />

          <Label>Brixia Score: </Label>
          <InputText type="text" value={brixiaScore} onChange={this.handleChangeInputBrixiaScore} />

        </div>
        
      </Wrapper>
      )
    );
  }
}


export default ItemUpdate;



