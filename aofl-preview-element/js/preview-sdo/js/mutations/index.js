import {deepAssign} from '@aofl/object-utils';
import previewSdoEnumerate from '../constants-enumerate';

const mutations = {
  init(payload) {
    const initState = {};

    return payload || initState;
  },

  [previewSdoEnumerate.ADD_PREVIEW](moduleState, {previewId}) {
    if (typeof moduleState[previewId] !== 'undefined') {
      return moduleState;
    }

    return Object.assign({}, moduleState, {
      [previewId]: {
        darkMode: false,
        drawerState: false
      }
    });
  },

  [previewSdoEnumerate.TOGGLE_DARK_MODE](moduleState, {previewId}) {
    return deepAssign(moduleState, previewId, {
      darkMode: !moduleState[previewId].darkMode
    });
  },

  [previewSdoEnumerate.TOGGLE_DRAWER](moduleState, {previewId}) {
    return deepAssign(moduleState, previewId, {
      drawerState: !moduleState[previewId].drawerState
    });
  }
};

export default mutations;
