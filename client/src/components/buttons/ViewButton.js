import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const View = styled.div.attrs({
  className: 'view-item-btn',
})`
cursor: pointer;
background-color: tomato;
border: none;
color: white;
padding: 5px 10px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 10px;
margin: 4px 2px;
cursor: pointer;
`;



/*class ViewButton extends Component {
  confirmViewItem = event => {
    event.preventDefault();

    if (
        window.confirm(
            `Do you want to view this item? ${this.props.id}`
        )
    ) {
         this.props.onView(this.props.id);
    }
  };

  render() {
    return <View onClick={this.confirmViewItem}>View</View>;
  }
}

ViewButton.propTypes = {
  id: PropTypes.string,
};*/

export default View;
