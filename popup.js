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

$(function() {
  // get the current tab
  chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      var showError = function(err) {
        $('.some-error').removeClass('hidden');
        $('.no-error').addClass('hidden');
        $('#error-msg').html(err);
      };

      // make sure we got the tab
      if (tabs.length !== 1) {
        return showError('Open a video on Netflix first.');
      }

      // get the domain
      var domain = null;
      var matches = tabs[0].url.match(/^http(?:s?):\/\/([^/]*)/);
      if (matches) {
        domain = matches[1].toLowerCase();
      } else {
        // example cause: files served over the file:// protocol
        return showError('Open a video on Netflix first.');
      }
      if (/^http(?:s?):\/\/chrome\.google\.com\/webstore.*/.test(tabs[0].url)) {
        // technical reason: Chrome prevents content scripts from running in the app gallery
        return showError('Open a video on Netflix first.');
      }
      if (domain !== 'www.netflix.com') {
        return showError('Open a video on Netflix first.');
      }

      // run the content script
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'content_script.js'
      }, function() {
        // listen for the enter key in the session id field
        $('#session-id').keydown(function(e) {
          if (e.which === 13) {
            $('#join-session').click();
          }
        });

        $('#join-session').click(function() {
          //
        });

        $('#new-session').click(function() {
          //
        });

        /*
          chrome.tabs.sendMessage(tabs[0].id, {
              type: 'check'
            }, function(response) {
              // response.type === 'password'
              // window.close();
            }
          );
        */
      });
    }
  );
});
