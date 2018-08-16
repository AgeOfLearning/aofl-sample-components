import {html} from '@polymer/lit-element';
import {render} from 'lit-html'; // eslint-disable-line

/**
 *
 *
 * @class PreviewContext
 */
class PreviewContext {
  /**
   * Creates an instance of PreviewContext.
   * @param {HTMLElement} target
   * @param {HTMLElement} jsElement
   * @param {HTMLElement} cssElement
   * @param {HTMLElement} templateElement
   * @memberof PreviewContext
   */
  constructor(target) {
    let _this = this;
    this.target = target;
    this.context = new Proxy({
      html
    }, {
      set(target, name, value) {
        target[name] = value;
        _this.render(_this.jsCode, _this.cssCode, _this.templateCode);
        return true;
      }
    });
  }

  /**
   *
   *
   * @param {*} jsCode
   * @param {*} cssCode
   * @param {*} templateCode
   * @memberof PreviewContext
   */
  render(jsCode, cssCode, templateCode) {
    if (this.cssCode !== cssCode) {
      this.cssCode = cssCode;
      this.previewCss = html(['<style>' + this.cssCode + '</style>']);
    }

    if (this.templateCode !== templateCode) {
      this.templateCode = templateCode;
      this.previewTemplate = eval(templateCode);
    }

    ((context) => eval(jsCode))(this.context);
    render(html`${this.previewCss} ${this.previewTemplate(this.context, html)}`, this.target);
  }
}

export default PreviewContext;
