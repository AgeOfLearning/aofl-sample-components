export const template = (context, html) => html`
  <aofl-drawer id="mydrawer" open$="${context.drawerState}">
    <slot></slot>
  </aofl-drawer>
`;
