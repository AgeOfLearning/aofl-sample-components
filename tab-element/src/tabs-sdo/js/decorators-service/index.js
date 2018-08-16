import {deepAssign} from '@aofl/object-utils';
import {storeInstance} from '@aofl/store';
import tabsSdoEnumerate from '../constants-enumerate';

const {NAMESPACE} = tabsSdoEnumerate;
export default [
  (_nextState) => {
    const state = storeInstance.getState();
    let nextState = _nextState;

    for (let groupKey in nextState[NAMESPACE]) {
      if (!nextState[NAMESPACE].hasOwnProperty(groupKey) ||
      (state[NAMESPACE][groupKey] === nextState[NAMESPACE][groupKey] && typeof nextState[NAMESPACE][groupKey].$selected !== 'undefined')) continue;

      for (let key in nextState[NAMESPACE][groupKey]) {
        if (!nextState[NAMESPACE][groupKey].hasOwnProperty(key) || groupKey === '$selected') continue;

        if (nextState[NAMESPACE][groupKey][key] === true) {
          nextState = deepAssign(nextState, `tabs.${groupKey}`, {
            $selected: key
          });
          break;
        }
      }
    }

    return nextState;
  }
];
