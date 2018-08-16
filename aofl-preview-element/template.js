export const template = (context, html) => html`
  <header>
    <h3><slot name="title"></slot></h3>
    <div id="button-container">
      <button class="button" on-click="${() => context.run()}">${context.playSvg}</button>
      <button class="button" on-click="${() => context.toggleDarkMode()}">${context.contrastSvg}</button>
      <button class="button" on-click="${() => context.toggleCode()}">${context.codeSvg}</button>
    </div>
  </header>
  <div id="preview-panel" class$="${context.darkMode? `dark`: ``}"></div>
  <div style="overflow: hidden">
    <aofl-drawer open$="${context.drawerState}">

      <tab-headers groupId$="${context['dom-scope']}" on-change="${(e) => context.tabChanged(e)}">
        <aofl-list-option slot="tab" class="link" value="html-code" selected$="${context.selectedTab === 'html-code'}">HTML</aofl-list-option>
        <aofl-list-option slot="tab" class="link" value="css-code" selected$="${context.selectedTab === 'css-code'}">CSS</aofl-list-option>
        <aofl-list-option slot="tab" class="link" value="js-code" selected$="${context.selectedTab === 'js-code'}">JS</aofl-list-option>
      </tab-headers>

      <tab-content groupId="${context['dom-scope']}" tabId="html-code">
        <aofl-code id="html-code" language="htmlmixed" on-update="${() => context.run()}"><slot name="htmlmixed"></slot></aofl-code>
      </tab-content>
      <tab-content groupId="${context['dom-scope']}" tabId="css-code">
        <aofl-code id="css-code" language="css" on-update="${() => context.run()}"><slot name="css"></slot></aofl-code>
      </tab-content>
      <tab-content groupId="${context['dom-scope']}" tabId="js-code">
        <aofl-code id="js-code" language="javascript" on-update="${() => context.run()}"><slot name="javascript"></slot></aofl-code>
      </tab-content>

    </aofl-drawer>
  <div>
`;
