import styles from './styles.css';
import {template} from './template';
import '@aofl/web-components/aofl-drawer';
import AoflElement from '@aofl/web-components/aofl-element';
import {mapStatePropertiesMixin} from '@aofl/map-state-properties-mixin';
import {storeInstance} from '@aofl/store';
import tabsSdoEnumerate from '../tabs-sdo/js/constants-enumerate';

const {NAMESPACE} = tabsSdoEnumerate;
/**
 * @summary TabContentElement
 * @class TabContentElement
 * @extends {AoflElement}
 */
class TabContentElement extends mapStatePropertiesMixin(AoflElement) {
  /**
   * Creates an instance of TabContentElement.
   * @memberof TabContentElement
   */
  constructor() {
    super();
    this.storeInstance = storeInstance;
  }


  /**
   * @readonly
   * @static
   * @memberof TabContentElement
   */
  static get is() {
    return 'tab-content';
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof TabContentElement
   */
  static get properties() {
    return {
      groupId: String,
      tabId: String,
      drawerState: Boolean
    };
  }

  /**
   *
   *
   * @memberof TabContentElement
   */
  connectedCallback() {
    super.connectedCallback();
    this.mapStateProperties();
  }
  /**
   *
   *
   * @memberof TabContentElement
   */
  mapStateProperties() {
    const state = this.storeInstance.getState();
    this.drawerState = state[NAMESPACE][this.groupId][this.tabId];
  }

  /**
   *
   *
   * @return {Object}
   * @memberof TabContentElement
   */
  _render() {
    return super._render(template, [styles]);
  }
}

window.customElements.define(TabContentElement.is, TabContentElement);

export default TabContentElement;
