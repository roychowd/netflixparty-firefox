'use strict';

// make sure we are in strict mode
(function() {
  var strictMode = false;
  try {
    NaN = NaN;
  } catch (err) {
    strictMode = true;
  }
  if (!strictMode) {
    throw 'Unable to activate strict mode.';
  }
})();

// register the message handler
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === 'check') {
      sendResponse({ type: 'not-password' });
      return;
    }
  }
);
