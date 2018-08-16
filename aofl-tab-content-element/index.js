import styles from './styles.css';
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';

/**
 * @summary AoflTabContentElement
 * @class AoflTabContentElement
 * @extends {AoflElement}
 */
class AoflTabContentElement extends AoflElement {
  /**
   * Creates an instance of AoflTabContentElement.
   * @memberof AoflTabContentElement
   */
  constructor() {
    super(); /** todo: import store instance */
    this.drawerState = false;
  }

  /**
   * @readonly
   * @static
   * @memberof AoflTabContentElement
   */
  static get is() {
    return 'aofl-tab-content';
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof AoflTabContentElement
   */
  static get properties() {
    return {
      drawerState: Boolean
    };
  }
  /**
   *
   *
   * @memberof AoflTabContentElement
   */
  connectedCallback() {
    super.connectedCallback();
    this.tabElement = this.findParent();
    this.tabElement.addTabContent(this);
  }
  /**
   *
   *
   * @return {Object}
   * @memberof AoflTabContentElement
   */
  _render() {
    return super._render(template, [window.globalStyles, styles]);
  }

  /**
   *
   *
   * @memberof AoflTabContentElement
   */
  show() {
    this.drawerState = true;
  }

  /**
   *
   *
   * @memberof AoflTabContentElement
   */
  hide() {
    this.drawerState = false;
  }

  /**
   * @return {HTMLElement}
   */
  findParent() {
    let parent = this.parentNode;
    let assignedSlot = this.assignedSlot;
    if (assignedSlot !== null) {
      parent = assignedSlot;
    }

    while (parent) {
      if (typeof parent.addTabContent === 'function') {
        return parent;
        break;
      }

      if (typeof parent.tagName === 'undefined' && typeof parent.host !== 'undefined') {
        parent = parent.host;
      } else {
        parent = parent.parentNode;
      }
    }
    return null;
  }
}

if (!customElements.get(AoflTabContentElement.is)) {
  window.customElements.define(AoflTabContentElement.is, AoflTabContentElement);
}

export default AoflTabContentElement;
