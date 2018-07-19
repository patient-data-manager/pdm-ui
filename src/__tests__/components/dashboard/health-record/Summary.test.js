import { fullRenderComponent } from '../../../../utils/testHelpers';
import Summary from '../../../../components/dashboard/health-record/Summary';

function setup() {
    return fullRenderComponent(Summary);
}

it('renders self and self components', () => {
    const component = setup();

    expect(component).toBeDefined();
    expect(component.find('div.summary__image')).toExist();
    expect(component.find('div.summary__divider')).toExist();
    expect(component.find('div.summary__table')).toExist();
    expect(component.find('div.summary__row')).toHaveLength(6);
});
