import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import SessionStorageMock from './utils/sessionStorageMock';
import './utils/fontAwesomeConfig';

global.sessionStorage = new SessionStorageMock();

configure({ adapter: new Adapter() });
