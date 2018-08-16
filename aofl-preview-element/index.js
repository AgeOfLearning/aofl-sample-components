import styles from './template.css';
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import '@aofl/aofl-samples/aofl-code-element';
import PreviewContext from './js/preview-context';
import playSvg from './svgs/play.svg';
import contrastSvg from './svgs/contrast.svg';
import codeSvg from './svgs/code.svg';
import {html} from '@polymer/lit-element';
import '@aofl/web-components/aofl-drawer';
import {storeInstance} from '@aofl/store';
import {tabsSdoEnumerate} from '../tab-element';
import {mapStatePropertiesMixin} from '@aofl/map-state-properties-mixin';
import previewSdoEnumerate from './js/preview-sdo';

/**
 * @summary AoflPreviewElement
 * @class AoflPreviewElement
 * @extends {AoflElement}
 */
class AoflPreviewElement extends mapStatePropertiesMixin(AoflElement) {
  /**
   * Creates an instance of AoflPreviewElement.
   * @memberof AoflPreviewElement
   */
  constructor() {
    super();
    this.drawerState = false;
    this.darkMode = false;
    this.playSvg = html([playSvg]);
    this.contrastSvg = html([contrastSvg]);
    this.codeSvg = html([codeSvg]);
    this.storeInstance = storeInstance;
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  connectedCallback() {
    this.storeInstance.commit({
      namespace: tabsSdoEnumerate.NAMESPACE,
      mutationId: tabsSdoEnumerate.ADD_GROUP,
      payload: {
        groupId: this['dom-scope'],
        tabs: {
          'html-code': true,
          'css-code': true,
          'js-code': false
        }
      }
    }, {
      namespace: previewSdoEnumerate.NAMESPACE,
      mutationId: previewSdoEnumerate.ADD_PREVIEW,
      payload: {
       previewId: this['dom-scope']
      }
    });

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
      'dom-scope': String,
      'drawerState': Boolean,
      'darkMode': Boolean
    };
  }

  /**
   *
   *
   * @return {Object}
   * @memberof AoflPreviewElement
   */
  _render() {
    return super._render(template, [styles]);
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  mapStateProperties() {
    const state = storeInstance.getState();
    this.selectedTab = state[tabsSdoEnumerate.NAMESPACE][this['dom-scope']].$selected;
    this.darkMode = state[previewSdoEnumerate.NAMESPACE][this['dom-scope']].darkMode;
    this.drawerState = state[previewSdoEnumerate.NAMESPACE][this['dom-scope']].drawerState;
    this.tabChanged();
  }

  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  toggleCode() {
    this.storeInstance.commit({
      namespace: previewSdoEnumerate.NAMESPACE,
      mutationId: previewSdoEnumerate.TOGGLE_DRAWER,
      payload: {
        previewId: this['dom-scope']
      }
    });

    this.tabChanged();
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
  tabChanged() {
    this.renderComplete.then(() => {
      this.codeElems[this.selectedTab].cm.refresh();
    });
  }


  /**
   *
   *
   * @memberof AoflPreviewElement
   */
  toggleDarkMode() {
    this.storeInstance.commit({
      namespace: previewSdoEnumerate.NAMESPACE,
      mutationId: previewSdoEnumerate.TOGGLE_DARK_MODE,
      payload: {
        previewId: this['dom-scope']
      }
    });
  }
}

if (!customElements.get(AoflPreviewElement.is)) {
  window.customElements.define(AoflPreviewElement.is, AoflPreviewElement);
}

export default AoflPreviewElement;
