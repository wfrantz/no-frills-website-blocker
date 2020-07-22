powershell "Compress-Archive background.html,background.js,blocked-domains.js,green.svg,manifest.json,red.svg out.zip"
move out.zip out.xpi
@pause
