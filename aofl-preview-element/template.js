export const template = (context, html) => html`
  <header>
    <h3><slot name="title"></slot></h3>
    <div id="button-container">
      <button class="button" on-click="${() => context.run()}">${context.playSvg}</button>
      <button class="button" on-click="${() => context.toggleDarkMode()}">${context.contrastSvg}</button>
      <button class="button" on-click="${() => context.toggleCode()}">${context.codeSvg}</button>
    </div>
  </header>
  <div id="preview-panel" class$="${context.darkmode? `dark`: ``}"></div>
  <div style="overflow: hidden">
    <aofl-drawer open$=${context.drawerState}>
      <aofl-tabs on-change="${(e) => context.tabChanged(e)}">
        <div id="tabs" slot="tab">
          <aofl-list-option class="link" value="html-code" selected="true">HTML</aofl-list-option>
          <aofl-list-option class="link" value="css-code">CSS</aofl-list-option>
          <aofl-list-option class="link" value="js-code">JS</aofl-list-option>
        </div>
        <aofl-tab-content data-id="html-code">
          <aofl-code id="html-code" language="htmlmixed" on-update="${() => context.run()}"><slot name="htmlmixed"></slot></aofl-code>
        </aofl-tab-content>
        <aofl-tab-content data-id="css-code">
          <aofl-code id="css-code" language="css" on-update="${() => context.run()}"><slot name="css"></slot></aofl-code>
        </aofl-tab-content>
        <aofl-tab-content data-id="js-code">
          <aofl-code id="js-code" language="javascript" on-update="${() => context.run()}"><slot name="javascript"></slot></aofl-code>
        </aofl-tab-content>
    </aofl-tabs>
    </aofl-drawer>
  <div>

`;
