import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import SessionStorageMock from './utils/sessionStorageMock';

global.sessionStorage = new SessionStorageMock();

configure({ adapter: new Adapter() });
