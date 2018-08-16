export const template = (context, html) => html`
  <aofl-select-list on-change="${(e) => context.tabChanged(e)}">
    <slot name="tab"></slot>
  </aofl-select-list>
`;
