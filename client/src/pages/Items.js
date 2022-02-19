import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import '../styles/App.css';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { ItemsList, ItemsPlain, ItemsTable } from '../pages';

const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: -10px;
  min-height: 10px;
  padding: 50px;
  width: 22%;
  margin-left: -50px;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? 'white' : 'rgba(255,255,255,.75)';
};

const itemsPageVariants = [
  {
    name: 'Exams',
    toPathname: routes.ITEMS,
    pageComonent: ItemsList,
  },
  // {
  //   name: 'Items (using react-table-v6)',
  //   toPathname: `${routes.ITEMS}/react-table-v6`,
  //   pageComponent: ItemsTable,
  // },
  // {
  //   name: 'Items (with only styled-components)',
  //   toPathname: `${routes.ITEMS}/items-plain`,
  //   pageComponent: ItemsPlain,
  // },
];

class Items extends Component {
  render() {
    // TODO: would be better to dynamically create the routes based on page variations
    const itemsPages = (
      <Switch>
        <Route exact path={routes.ITEMS} component={ItemsList} />
        {/* <Route exact path={`${routes.ITEMS}/react-table-v6`} component={ItemsTable} /> */}
        {/* <Route exact path={`${routes.ITEMS}/items-plain`} component={ItemsPlain} /> */}
      </Switch>
    );

    return (
      <>
        <LinksGridContainer>
          {itemsPageVariants.map((itemsPageVariant, i) => (
            <LinkGridWrapper
              key={itemsPageVariant.name}
              style={{ gridColumn: `${(i + 2) * 2 - 1} / span 2` }}>
              <Button className="Button" className="bg-dark">
                <Link
                  style={{ color: linkTextColor(itemsPageVariant.toPathname) }}
                  to={itemsPageVariant.toPathname}>
                  {itemsPageVariant.name}
                </Link>
              </Button>
            </LinkGridWrapper>
          ))}
        </LinksGridContainer>
        {itemsPages}
      </>
    );
  }
}

export default Items;
