chrome.commands.onCommand.addListener(function (command) {
    (pages || []).forEach(page => {
        page.postMessage({method: command, args: []});
    });
});
