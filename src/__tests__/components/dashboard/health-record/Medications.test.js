import { fullRenderComponent } from '../../../../utils/testHelpers';
import Medications from '../../../../components/dashboard/health-record/Medications';

function setup() {
    return fullRenderComponent(Medications);
}

it('renders self and self components', () => {
    const component = setup();

    expect(component).toBeDefined();
    expect(component.find('div.health-record__medications')).toExist();
});