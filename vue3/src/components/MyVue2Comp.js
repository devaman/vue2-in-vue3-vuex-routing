import Button from 'vue2App/Button';

import { wrapVue2ComponentForVue3, vue2ToVue3 } from '../utils';

const MyWrappedVue2Component = vue2ToVue3(Button);
export default MyWrappedVue2Component;