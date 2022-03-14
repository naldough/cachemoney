import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import { ViewButton } from '../components/buttons';

import api from '../api';

import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-item-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log('ItemsList: props');
    console.log(this.props);

    this.fetchAllItems();
  }

  fetchAllItems = () => {
    api
      .getAllItems()
      .then(resp => {
        debugger;
        const { items } = resp.data;
        console.log('getAllItems: resp');
        console.log(items);
        this.setState({ items });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllItems': ${err}`);
        console.error(err);
        return err;
      });
  };


  render() {
    const items = this.state.items || {};
    console.log(items);

    const columns = [
      {
        Header: 'Patient ID',
        accessor: 'patientId',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-item-patientId={original.patientId}>{props.value}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'examId',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-examId={original.examId}>{props.value}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-imageUrl={original.imageUrl}><img src= {original.imageUrl} alt="display iamge" height="150" width="150" ></img></span>;
  
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'keyFindings',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-keyFindings={original.keyFindings}>{props.value}</span>;
        },
      },
      {
        Header: 'Brixia Score',
        accessor: 'brixiaScore',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-brixiaScore={original.brixiaScore}>{props.value}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-age={original.age}>{props.value}</span>;
        },
      },
      {
        Header: 'Sex',
        accessor: 'sex',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-sex={original.sex}>{props.value}</span>;
        },
      },
      {
        Header: 'BMI',
        accessor: 'bmi',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-bmi={original.bmi}>{props.value}</span>;
        },
      },
      {
          Header: '',
          accessor: 'View',
          Cell: props => {
            const { original } = props.cell.row;
  
            return (
              <button className='view-item-btn'><Link data-view-id={original._id} to={`/item/view/${original._id}`}>
                View
              </Link></button>
            );
          },
        },

      // {
      //   Header: '',
      //   accessor: 'More',
      //   Cell: props => {
      //     const { original } = props.cell.row;
      //     return (
      //       <button><Link to={`/item/plain`}>more</Link></button>
      //     );
      //   },
      // },
  
    ];

    return (
      <Wrapper>
        <CssBaseline />

        {(items || []).length > 0 ? (
          <Table data={items} columns={columns} />
        ) : (
          `No items to render...`
        )}
      </Wrapper>
    );
  }
}

export default ItemsList;