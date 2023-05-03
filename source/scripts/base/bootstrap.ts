/* ==========================================================================
   Vendor
   ========================================================================== */

import { Alpine as AlpineType } from 'alpinejs';

declare global {
  var Alpine: AlpineType;
}

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();
