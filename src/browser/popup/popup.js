

const manifestData = chrome.runtime.getManifest();
document.getElementById('version').innerText = manifestData.version;

fetch('https://api.github.com/repos/lt-mayonesa/browser-mpris2/releases/latest')
    .then(response => response.json())
    .then(json => {
        return {
            title: json.name, version: json.tag_name, artifact: json.assets[0].browser_download_url
        };
    })
    .then(data => {
        let current = new Version(chrome.runtime.getManifest().version);
        let latest = new Version(data.version);
        if (latest.isGreaterThan(current)) {
            let p = document.getElementById('latest');
            p.classList.remove('hidden');
            p.querySelector('a').innerHTML = data.version;
        }
    })
    .catch(console.error);
