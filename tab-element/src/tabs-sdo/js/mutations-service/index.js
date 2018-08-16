import {deepAssign} from '@aofl/object-utils';
import tabsSdoEnumerate from '../constants-enumerate';

const mutations = {
  init(payload) {
    const defaultModuleState = {
      // contentTabs: {
      //   overview: true,
      //   examples: false
      // }
    };

    return payload || defaultModuleState;
  },

  [tabsSdoEnumerate.ADD_GROUP](moduleState, {groupId, tabs}) {
    if (typeof moduleState[groupId] !== 'undefined') {
      return moduleState;
    }

    return Object.assign({}, moduleState, {
      [groupId]: tabs
    });
  },

  [tabsSdoEnumerate.UNSELECT](moduleState, {groupId, tabId}) {
    return deepAssign(moduleState, `${groupId}`, {
      [tabId]: false
    });
  },

  [tabsSdoEnumerate.UNSELECT_ALL](moduleState, groupId) {
    let tabGroup = Object.assign({}, moduleState[groupId]);
    for (let key in tabGroup) {
      if (!tabGroup.hasOwnProperty(key)) continue;
      tabGroup[key] = false;
    }

    return deepAssign(moduleState, `${groupId}`, tabGroup);
  },

  [tabsSdoEnumerate.SELECT](moduleState, {groupId, tabId}) {
    if (typeof moduleState[groupId] === 'undefined' || typeof moduleState[groupId][tabId] === 'undefined') {
      return moduleState;
    }
    let nextModuleState = mutations.unselectAll(moduleState, groupId);
    return deepAssign(nextModuleState, `${groupId}`, {
      [tabId]: true
    });
  }
};

export default mutations;
