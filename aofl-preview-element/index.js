import styles from './styles.css';
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import '../aofl-code-element';
import PreviewContext from './js/preview-context';
import playSvg from './svgs/play.svg';
import contrastSvg from './svgs/contrast.svg';
import codeSvg from './svgs/code.svg';
import {html} from '@polymer/lit-element';
/**
 * @summary AoflPreviewElement
 * @class AoflPreviewElement
 * @extends {AoflElement}
 */
class AoflPreviewElement extends AoflElement {
  /**
   * Creates an instance of AoflPreviewElement.
   * @memberof AoflPreviewElement
   */
  constructor() {
    super();
    this.drawerState = false;
    this.darkmode = false;
    this.playSvg = html([playSvg]);
    this.contrastSvg = html([contrastSvg]);
    this.codeSvg = html([codeSvg]);
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  connectedCallback() {
    super.connectedCallback();
    this.codeElems = {
      'js-code': this.shadowRoot.querySelector('#js-code'),
      'html-code': this.shadowRoot.querySelector('#html-code'),
      'css-code': this.shadowRoot.querySelector('#css-code')
    };
    const previewPanel = this.shadowRoot.querySelector('#preview-panel');
    const target = previewPanel.attachShadow({mode: 'open'});
    this.previewContext = new PreviewContext(target);
    this.renderComplete
    .then(() => {
      this.run();
    });
  }

  /**
   * @readonly
   * @static
   * @memberof AoflPreviewElement
   */
  static get is() {
    return 'aofl-preview';
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof AoflPreviewElement
   */
  static get properties() {
    return {
      drawerState: Boolean,
      darkmode: Boolean
    };
  }

  /**
   *
   *
   * @return {Object}
   * @memberof AoflPreviewElement
   */
  _render() {
    return super._render(template, [window.globalStyles, styles]);
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  toggleCode() {
    this.drawerState = !this.drawerState;
    this.renderComplete
    .then(() => {
      this.codeElems['html-code'].cm.refresh();
    });
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  run() {
    this.previewContext
    .render(this.codeElems['js-code'].getCode(), this.codeElems['css-code'].getCode(), this.codeElems['html-code'].getCode());
  }

  /**
   *
   *
   * @param {*} e
   * @memberof AoflPreviewElement
   */
  tabChanged(e) {
    let tab = e.target.openTab;
    this.renderComplete.then(() => {
      this.codeElems[tab].cm.refresh();
    });
  }


  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  toggleDarkMode() {
    this.darkmode = !this.darkmode;
  }
}

if (!customElements.get(AoflPreviewElement.is)) {
  window.customElements.define(AoflPreviewElement.is, AoflPreviewElement);
}

export default AoflPreviewElement;
