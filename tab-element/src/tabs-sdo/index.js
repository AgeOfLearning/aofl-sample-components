import mutations from './js/mutations-service';
import decorators from './js/decorators-service';
import {storeInstance} from '@aofl/store';
import tabsSdoEnumerate from './js/constants-enumerate';

const sdo = {
  namespace: tabsSdoEnumerate.NAMESPACE,
  mutations,
  decorators
};

storeInstance.addState(sdo);

export default tabsSdoEnumerate;
