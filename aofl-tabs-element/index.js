import styles from './styles.css';
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import '@aofl/web-components/aofl-select-list';
import '@aofl/web-components/aofl-list-option';

/**
 * @summary AoflTabsElement
 * @class AoflTabsElement
 * @extends {AoflElement}
 */
class AoflTabsElement extends AoflElement {
  /**
   * Creates an instance of AoflTabsElement.
   * @memberof AoflTabsElement
   */
  constructor() {
    super();
    this.tabs = [];
    this.openTab = '';
  }

  /**
   * @readonly
   * @static
   * @memberof AoflTabsElement
   */
  static get is() {
    return 'aofl-tabs';
  }

  /**
   *
   *
   * @return {Object}
   * @memberof AoflTabsElement
   */
  _render() {
    return super._render(template, [window.globalStyles, styles]);
  }

  /**
   *
   *
   * @param {*} e
   * @memberof AoflTabsElement
   */
  tabChanged(e) {
    this.openTab = e.target.selectedValue;
    this.updateTabs(this.openTab);
    this.dispatchEvent(new CustomEvent('change'));
  }

  /**
   *
   *
   * @param {*} selected
   * @memberof AoflTabsElement
   */
  updateTabs(selected) {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].hide();
      if (this.tabs[i].dataset.id === selected) {
        this.tabs[i].show();
      }
    }
  }

  /**
   *
   *
   * @param {*} tabContentElement
   * @memberof AoflTabsElement
   */
  addTabContent(tabContentElement) {
    this.tabs.push(tabContentElement);
    this.updateTabs(this.openTab);
  }
}

if (!customElements.get(AoflTabsElement.is)) {
  window.customElements.define(AoflTabsElement.is, AoflTabsElement);
}

export default AoflTabsElement;
