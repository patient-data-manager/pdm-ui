import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import _ from 'lodash';

export default class TableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: this.props.sort.order,
      orderBy: this.props.sort.orderBy
    };
  }

  handleSort = (index) => {
    const orderBy = index;
    let order = 'asc';

    if (this.state.orderBy === orderBy && this.state.order === 'asc') {
      order = 'desc';
    }

    this.setState({ order, orderBy });
  }

  getSorting = (key) => {
    const { order } = this.state;

    return order === 'desc'
      ? (a, b) => (b[key] < a[key] ? -1 : 1)
      : (a, b) => (a[key] < b[key] ? -1 : 1);
  }

  renderTableHeaders = () => {
    const { orderBy, order } = this.state;
    const { headers } = this.props;

    return headers.map((header, index) => {
      return (
        <TableCell key={index} sortDirection={orderBy === index ? order : false}>
          <TableSortLabel
            active={orderBy === index}
            direction={order}
            onClick={() => this.handleSort(index)}>
            {header}
          </TableSortLabel>
        </TableCell>
      );
    });
  }

  renderTableData = () => {
    const { orderBy } = this.state;
    const { headers, formatters } = this.props;
    const data = this.props.data.slice().sort(this.getSorting(headers[orderBy]));

    return data.map((dataRow, index) => {
      return (
        <TableRow key={index}>
          {headers.map((key, indx) =>
            <TableCell key={indx}>{formatters[key] ? formatters[key](dataRow[key]) : dataRow[key]}</TableCell>
          )}
        </TableRow>
      );
    });
  }

  render() {
    const { data, title } = this.props;

    return (
      <div className="table-list">
      <h5 id={_.lowerCase(title)}>{title}</h5>
        <div className="table-list__table-wrapper">
          {data.length === 0 ?
            <div className="no-entries">No entries</div>
            :
            <Table className="table-list__table">
              <TableHead>
                <TableRow>
                  {this.renderTableHeaders()}
                </TableRow>
              </TableHead>

              <TableBody>
                {this.renderTableData()}
              </TableBody>
            </Table>
          }
        </div>
      </div>
    );
  }
}

TableList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  formatters: PropTypes.object,
  sort: PropTypes.shape({
    order: PropTypes.string,
    orderBy: PropTypes.number
  })
};

TableList.defaultProps = {
  formatters: {},
  sort: { order: 'asc', orderBy: 0 }
};
