import { fullRenderComponent } from '../../../../utils/testHelpers';
import TableList from '../../../../components/dashboard/shared/TableList';
import * as mocks from '../../../../__mocks__/tableListMocks';
import moment from 'moment';

function setup() {
  const props = {
    title: `Animals on Old McDonald's Farm`,
    data: [
      mocks.tableListMockA,
      mocks.tableListMockB,
      mocks.tableListMockC,
      mocks.tableListMockD,
      mocks.tableListMockE],
    headers: ['name', 'birthday', 'gender', 'species'],
    formatters: { 'birthday': (value) => moment(value).format('MMM D, YYYY') },
    sort: { order: 'asc', orderBy: 3 }
  };

  return fullRenderComponent(TableList, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.table-list')).toExist();
  expect(component.find('.table-list__table')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('renders title and headers correctly', () => {
  const component = setup();

  expect(component.find('div.table-list__title').text(`Animals on Old McDonald's Farm`));
  expect(component.find('.table-list thead tr th')).toHaveLength(4);
  expect(component.find('.table-list thead tr th').at(0).text()).toEqual('name');
  expect(component.find('.table-list thead tr th').at(1).text()).toEqual('birthday');
  expect(component.find('.table-list thead tr th').at(2).text()).toEqual('gender');
  expect(component.find('.table-list thead tr th').at(3).text('species'));
});

it('table is not displayed if data array is empty', () => {
  const component = fullRenderComponent(TableList, 
    { title: 'table', headers: ['1', '2', '3'], data: [] });

  expect(component.find('div.table-list')).toExist();
  expect(component.find('div.no-entries')).toExist();
  expect(component.find('.table-list__table')).toHaveLength(0);
});

it('sorts the table on init', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr').at(0).find('td').at(3).text()).toEqual('chicken');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(3).text()).toEqual('cow');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(3).text()).toEqual('duck');
  expect(component.find('.table-list tbody tr').at(3).find('td').at(3).text()).toEqual('horse');
  expect(component.find('.table-list tbody tr').at(4).find('td').at(3).text()).toEqual('sheep');
});

it('clicking table headers sorts correctly alphabetically', () => {
  const component = setup();

  component.find('.table-list thead tr th span').at(0).simulate('click');
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Baa');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Dixie');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Ed');
  expect(component.find('.table-list tbody tr').at(3).find('td').at(0).text()).toEqual('Moo');
  expect(component.find('.table-list tbody tr').at(4).find('td').at(0).text()).toEqual('Quack');

  component.find('.table-list thead tr th span').at(0).simulate('click');
  expect(component.find('.table-list tbody tr').at(4).find('td').at(0).text()).toEqual('Baa');
  expect(component.find('.table-list tbody tr').at(3).find('td').at(0).text()).toEqual('Dixie');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Ed');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Moo');
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Quack');
});

it('clicking table headers sorts correctly by date', () => {
  const component = setup();

  component.find('.table-list thead tr th span').at(1).simulate('click');
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Ed');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Baa');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Moo');
  expect(component.find('.table-list tbody tr').at(3).find('td').at(0).text()).toEqual('Quack');
  expect(component.find('.table-list tbody tr').at(4).find('td').at(0).text()).toEqual('Dixie');

  component.find('.table-list thead tr th span').at(1).simulate('click');
  expect(component.find('.table-list tbody tr').at(4).find('td').at(0).text()).toEqual('Ed');
  expect(component.find('.table-list tbody tr').at(3).find('td').at(0).text()).toEqual('Baa');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Moo');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Quack');
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Dixie');
});

it('formats dates correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr').at(0).find('td').at(1).text()).toEqual('Feb 9, 2018');
});
