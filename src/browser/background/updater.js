chrome.runtime.onStartup.addListener(() => {
    fetch('https://api.github.com/repos/lt-mayonesa/browser-mpris2/releases/latest')
      .then(response => response.json())
      .then(json => {
          return {
              title: json.name, version: json.tag_name, artifact: json.assets[0].browser_download_url
          };
      })
      .then(data => {
          let current = chrome.runtime.getManifest().version
            .replace('v', '')
            .replace(/\./g, '');
          let latest = data.version.replace('v', '')
            .replace(/\./g, '');
          if (Number(latest) > Number(current)) {
              chrome.browserAction.setBadgeText({
                  text: 'new'
              });
              chrome.browserAction.setBadgeBackgroundColor({
                  color: '#F00'
              });
          }
      })
      .catch(console.error);
});
