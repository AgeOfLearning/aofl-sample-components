import '@aofl/web-components/aofl-select-list';
import AoflElement from '@aofl/web-components/aofl-element';
import styles from './styles.css';
import {template} from './template';
import {mapStatePropertiesMixin} from '@aofl/map-state-properties-mixin';
import {storeInstance} from '@aofl/store';
import tabsSdoEnumerate from '../tabs-sdo/js/constants-enumerate';

/**
 * @summary TabHeadersElement
 * @class TabHeadersElement
 * @extends {AoflElement}
 */
class TabHeadersElement extends mapStatePropertiesMixin(AoflElement) {
  /**
   * Creates an instance of TabHeadersElement.
   * @memberof TabHeadersElement
   */
  constructor() {
    super();
    this.storeInstance = storeInstance;
  }

  /**
   * @readonly
   * @static
   * @memberof TabHeadersElement
   */
  static get is() {
    return 'tab-headers';
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof TabHeadersElement
   */
  static get properties() {
    return {
      groupId: String,
      selected: String
    };
  }

  /**
   *
   *
   * @memberof TabHeadersElement
   */
  mapStateProperties() {
    const state = this.storeInstance.getState();
    this.selected = state[tabsSdoEnumerate.NAMESPACE][this.groupId].$selected;
  }

  /**
   *
   *
   * @return {Object}
   * @memberof TabHeadersElement
   */
  _render() {
    return super._render(template, [styles]);
  }

  /**
   *
   *
   * @param {*} e
   * @memberof TabHeadersElement
   */
  tabChanged(e) {
    this.storeInstance.commit({
      namespace: tabsSdoEnumerate.NAMESPACE,
      mutationId: tabsSdoEnumerate.SELECT,
      payload: {
        groupId: this.groupId,
        tabId: e.target.value
      }
    });
    this.dispatchEvent(new CustomEvent('change'));
  }
}

window.customElements.define(TabHeadersElement.is, TabHeadersElement);

export default TabHeadersElement;
