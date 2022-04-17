import { writable, readable } from 'svelte/store';

/**
 * Top App Bar properties -- used in the following components:
 *  - AppBar
 *  - Drawer
 *  - Main
 */
export const appbarDense = writable(false);
export const appbarFixed = writable(false);
export const appbarMenuOpen = writable(false);
export const appbarProminent = writable(false);
export const appbarShort = writable(false);
export const appbarShortAlwaysClosed = writable(false);


/**
 * Drawer properties -- used in the following components:
 *  - Drawer
 *  - Main
 */
export const drawerDismissible = writable(true);
export const drawerModal = writable(false);

