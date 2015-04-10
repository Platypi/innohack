/**
 * This is the entry-point for Browserify. This file can maintain references to all your 
 * custom controls, injectables, and other files that won't necessarily be loaded from files
 * included in this file.
 */

// libraries
require('platypus');
require('platypusui');

// app
require('./app/app');

require('./services/factual/factual.service');

require('./common/injectables/facebook/facebook.injectable');
