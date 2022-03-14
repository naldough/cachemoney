import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Update = styled.div.attrs({
  className: 'update-item-btn',
})`
  cursor: pointer;
  background-color: #255995;
  border: 10px solid red;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
`;

class UpdateButton extends Component {
  confirmUpdateButton= event => {
    event.preventDefault();

    if (
        window.confirm(
            `Do you want to update this item? ${this.props.id}`
        )
    ) {
         this.props.onUpdate(this.props.id);
    }
  };

  render() {
   
    return <Update onClick={this.confirmDeleteItem}>Update Item</Update>;
  }
}

UpdateButton.propTypes = {
  id: PropTypes.string,
};

export default UpdateButton;
