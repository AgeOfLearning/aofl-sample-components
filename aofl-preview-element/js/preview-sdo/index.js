import mutations from './js/mutations';
import {storeInstance} from '@aofl/store';
import previewSdoEnumerate from './js/constants-enumerate';

const sdo = {
  namespace: previewSdoEnumerate.NAMESPACE,
  mutations
};

storeInstance.addState(sdo);

export default previewSdoEnumerate;
