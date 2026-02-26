'use strict';
{
    // No-op: site root sw.js already controls this scope. Registering a local sw.js would 404
    // and cause confusion. Let the root PWA handle caching.
    window.C3_RegisterSW = async function C3_RegisterSW() {}
}
;
