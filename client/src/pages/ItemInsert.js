// import React, { Component } from 'react';
// import { shared } from '../constants';
// import api from '../api';

// import styled from 'styled-components';

// const Title = styled.h1.attrs({
//   className: 'h1',
// })``;

// const Wrapper = styled.div.attrs({
//   className: 'form-group',
// })`
//   margin-top: 0 30px;
// `;

// const Label = styled.label`
//   margin: 5px;
//   max-width: 30%;

//   @media screen and (max-width: 420px) {
//     height: auto;
//     max-width: 75%;
//   }
// `;

// const InputText = styled.input.attrs({
//   className: 'form-control',
// })`
//   margin: 5px auto;
//   max-width: 30%;
//   text-align: center;

//   @media screen and (max-width: 420px) {
//     height: auto;
//     max-width: 75%;
//   }
// `;

// const Fieldset = styled.fieldset.attrs({
//   className: 'form-control',
// })`
//   background-color: transparent;
//   border-color: transparent;
//   margin: 1em auto 0.5em;
//   max-width: 50%;
//   min-height: 6em;

//   @media screen and (max-width: 420px) {
//     height: auto;
//     max-width: 75%;
//   }
// `;

// const DayInput = styled.input.attrs({
//   className: '',
// })`
//   margin: 5px 5px 5px auto;
//   text-align: center;
// `;

// const Button = styled.button.attrs({
//   className: 'btn btn-primary',
// })`
//   margin: 15px 15px 15px 5px;
// `;

// const CancelButton = styled.a.attrs({
//   className: 'btn btn-danger',
// })`
//   margin: 15px 15px 15px 5px;
// `;

// class ItemInsert extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       daysOfWeek: {},
//       timeframeNote: '',
//       priority: 0,
//       content: '',
//     };
//   }

//   handleChangeInputName = async event => {
//     const name = event.target.value;
//     this.setState({ name });
//   };

//   handleChangeDays = async event => {
//     const { checked, value } = event.target;
//     const { daysOfWeek } = this.state;
//     const { DAYS_OF_WEEK } = shared;

//     if (checked && !daysOfWeek[value]) {
//       daysOfWeek[value] = DAYS_OF_WEEK[value];
//     } else if (!checked && daysOfWeek[value]) {
//       delete daysOfWeek[value];
//     }
//     this.setState({ daysOfWeek });
//   };

//   handleChangeInputTimeframe = async event => {
//     const timeframeNote = event.target.value;
//     this.setState({ timeframeNote });
//   };

//   handleChangeInputPriority = async event => {
//     const priority = event.target.validity.valid ? event.target.value : this.state.priority;

//     this.setState({ priority });
//   };

//   handleChangeInputContent = async event => {
//     const content = event.target.value;
//     this.setState({ content });
//   };

//   insertSingleItem = item => {
//     return api
//       .insertItem(item)
//       .then(resp => {
//         console.log('insertItem: resp');
//         console.log(resp);
//         if ((resp.data || {}).success) {
//           const newItem = JSON.parse(resp.config.data);
//           console.log('insertItem: newItem', newItem);
//         }
//         return resp;
//       })
//       .catch(err => {
//         console.error(`ERROR in 'insertSingleItem': ${err}`);
//         console.error(err);
//         return err;
//       });
//   };

//   handleInsertItem = event => {
//     event.preventDefault();

//     const { name, daysOfWeek, timeframeNote, priority, content } = this.state;
//     const item = { name, daysOfWeek, timeframeNote, priority, content };

//     this.insertSingleItem(item)
//       .then(resp => {
//         console.log('handleInsertItem: resp');
//         console.log(resp);
//         if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
//           window.alert('Item inserted successfully');
//           this.setState({
//             name: '',
//             daysOfWeek: {},
//             timeframeNote: '',
//             priority: 0,
//             content: '',
//           });
//         } else {
//           throw resp;
//         }
//       })
//       .catch(err => {
//         // TODO: pass error object correctly so that things like validation errors can be displayed to user
//         window.alert(`There was an error creating the item... :(`);
//         console.log('handleInsertItem: err');
//         console.log(err);
//       });
//   };

//   render() {
//     const { name, daysOfWeek, timeframeNote, priority, content } = this.state;

//     const { DAYS_OF_WEEK } = shared;

//     return (
//       <Wrapper>
//         <Title>Create Item</Title>

//         <Label>Name: </Label>
//         <InputText type="text" value={name} onChange={this.handleChangeInputName} />

//         <Fieldset>
//           <legend>Day(s) of the Week: </legend>
//           {Object.keys(DAYS_OF_WEEK).map((day, i) => (
//             <React.Fragment key={day}>
//               <Label htmlFor={day}>
//                 <DayInput
//                   type="checkbox"
//                   id={day}
//                   value={day}
//                   onChange={this.handleChangeDays}
//                   checked={typeof daysOfWeek[day] === 'string'}
//                 />
//                 {DAYS_OF_WEEK[day]}
//               </Label>
//             </React.Fragment>
//           ))}
//         </Fieldset>

//         <Label>Timeframe Note: </Label>
//         <InputText type="text" value={timeframeNote} onChange={this.handleChangeInputTimeframe} />

//         <Label>Priority: </Label>
//         <InputText
//           type="number"
//           step="0.1"
//           lang="en-US"
//           min="0"
//           max="1000"
//           pattern="[0-9]+([,\.][0-9]+)?"
//           value={priority}
//           onChange={this.handleChangeInputPriority}
//         />

//         <Label>Content: </Label>
//         <InputText type="textarea" value={content} onChange={this.handleChangeInputContent} />

//         <Button onClick={this.handleInsertItem}>Add Item</Button>
//         <CancelButton href={'/items'}>Cancel</CancelButton>
//       </Wrapper>
//     );
//   }
// }

// export default ItemInsert;

import React, { Component } from 'react';
import { shared } from '../constants';
import api from '../api';
import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px; 
  .box1 {
    float: left;
    width: 50%;
  }
  .box2 {
    float: right;
     width: 50%; 
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
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
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
 
  // handleChangeInputTimeframe = async event => {
  //   const timeframeNote = event.target.value;
  //   this.setState({ timeframeNote });
  // };

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

    // const { DAYS_OF_WEEK } = shared;

    return (
      <Wrapper>

        <Title>Create Item</Title>

        <Button onClick={this.handleInsertItem}>Add Item</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
        <br></br>

        <div className="box1">
          <h2>Patient Info </h2>

        <Label>Pateint ID: </Label>
        <InputText type="text" value={patientId} onChange={this.handleChangeInputPatientId} />

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
        <h2>Exam Info</h2>

        <div className="box2">
        <Label>Exam ID: </Label>
        <InputText type="text" value={examId} onChange={this.handleChangeInputExamId} />

        <Label>Image URL: </Label>
        <InputText type="text" value={imageUrl} onChange={this.handleChangeInputImageUrl} />

        <Label>Date: </Label>
        <InputText type="text" value={date} onChange={this.handleChangeInputDate} />
        
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
