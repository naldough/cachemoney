import React, { Component } from 'react';
import styled from 'styled-components';

import Links from './Links';

const Container = styled.div.attrs({
  className: 'container',
})`
  max-width: 100%;
  padding-left: 20px;
`;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-light bg-light',
})`
  margin-bottom: -40px;
  padding-right: 20px;

  @media screen and (min-width: 992px) {
    // padding: 1em 4%;
  }
`;

const navBarItems = [
  {
    name: 'Exam List',
    toPathname: '/items',
    className: 'nav-link',
  },
  // {
  //   name: 'Edit List',
  //   toPathname: '/items/edit',
  //   className: 'nav-link',
  // },
  {
    name: 'Create Exam',
    toPathname: '/item/create',
    className: 'nav-link',
  },
];

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <Links navBarItems={navBarItems} />
        </Nav>
      </Container>
    );
  }
}

export default NavBar;
