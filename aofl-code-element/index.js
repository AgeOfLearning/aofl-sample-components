import styles from './template.css';
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import monokai from 'codemirror/theme/monokai.css';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
/**
 * @summary AoflCodeElement
 * @class AoflCodeElement
 * @extends {AoflElement}
 */
class AoflCodeElement extends AoflElement {
  /**
   * Creates an instance of AoflCodeElement.
   * @memberof AoflCodeElement
   */
  constructor() {
    super();
    this.language = '';
  }

  /**
   * @readonly
   * @static
   * @memberof AoflCodeElement
   */
  static get is() {
    return 'aofl-code';
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof AoflCodeElement
   */
  static get properties() {
    return {
      language: String
    };
  }

  /**
   *
   *
   * @memberof AoflCodeElement
   */
  connectedCallback() {
    const childNodes = this.childNodes;
    let code = this.innerHTML;
    if (childNodes.length > 0 && typeof childNodes[0].assignedNodes === 'function') {
      const slottedChildNodes = childNodes[0].assignedNodes();
      if (slottedChildNodes.length > 0) {
        code = slottedChildNodes[0].textContent;
      }
    }
    this.innerHTML = '';
    this.code = code;
    super.connectedCallback();
    this.renderComplete
    .then(() => {
      const textArea = this.shadowRoot.querySelector('textarea');
      this.cm = CodeMirror.fromTextArea(textArea, {
        lineNumbers: false,
        indentUnit: 2,
        mode: this.language,
        theme: 'monokai'
      });
      this.cm.setSize('100%', '100%');
      this.cm.setOption('extraKeys', {
        'Ctrl-Enter': (cm) => {
          this.dispatchEvent(new CustomEvent('update'));
        }
      });
    });
  }

  /**
   *
   * @return {String}
   * @memberof AoflCodeElement
   */
  getCode() {
    return this.cm.doc.getValue();
  }
  /**
   *
   *
   * @return {Object}
   * @memberof AoflCodeElement
   */
  _render() {
    return super._render(template, [codeMirrorStyles, monokai, styles]);
  }
}

if (!customElements.get(AoflCodeElement.is)) {
  window.customElements.define(AoflCodeElement.is, AoflCodeElement);
}

export default AoflCodeElement;
