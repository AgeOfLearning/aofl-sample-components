export const template = (context, html) => html`
  <aofl-drawer open$="${context.drawerState}">
    <slot></slot>
  </aofl-drawer>
`;
