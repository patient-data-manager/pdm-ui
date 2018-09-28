import { fullRenderComponent } from '../../utils/testHelpers';
import Footer from '../../components/Footer';

it('renders the footer with the mitre logo', () => {
  const component = fullRenderComponent(Footer);

  expect(component.find('.footer')).toExist();
  expect(component.find('.logo-mitre')).toExist();
});
