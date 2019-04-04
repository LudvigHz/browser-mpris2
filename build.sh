#!/bin/bash
# Compile all source code into dist/ folder

function title() {
    green="\e[32m"
    fin="\e[0m"
    echo -e "\n${green}$1${fin}"
}

version=${1:-v666}
out="dist/"

if [[ -d ${out} ]]; then
    rm -r ${out}
fi

# BUILD EXTENSION
title "BUILDING EXTENSION"

extension=${out}"extension/"
lang_out="ECMASCRIPT_2015"


title "Step 1: Base Scripts"
npx google-closure-compiler --js='src/browser/main/**.js' --js_output_file="${extension}base.js" --language_out=${lang_out}
echo "Compiled all files from src/browser/media into ${extension}base.js ✓";

title "Step 2: Provider Scripts"
for filename in src/browser/providers/*.js; do
	echo "↳ Compiling $filename"
	name=$(basename ${filename})
	npx google-closure-compiler --js="$filename" --js_output_file="${extension}providers/$name" --language_out=${lang_out}
done
echo "Compiled all providers into ${extension}providers/ ✓"

title "Step 3: Init Script"
npx google-closure-compiler --js='src/browser/init.js' --js_output_file="${extension}init.js" --language_out=${lang_out}
echo "Compiled src/browser/init.js into ${extension}init.js ✓"

title "Step 4: Background Scripts"
for filename in src/browser/background/*.js; do
	echo "↳ Compiling $filename"
	name=$(basename ${filename})
	npx google-closure-compiler --js="$filename" --js_output_file="${extension}background/$name" --language_out=${lang_out}
done
echo "Compiled background scripts into ${extension}background/ ✓"

title "Step 5: Popup files"
for filename in src/browser/popup/*.js; do
	echo "↳ Compiling $filename"
	name=$(basename ${filename})
	npx google-closure-compiler --js="$filename" --js_output_file="${extension}popup/$name" --language_out=${lang_out}
done
cp -v "src/browser/popup/popup.html" "${extension}popup/"
echo "Compiled popup files into ${extension}popup/ ✓"

title "Step 6: Manifest"
# replace version, first and last content script js with base.js and init.js respectively
cat "src/browser/manifest.json" | \
    jq '.name = "browser-mpris2"' | \
    jq '.version = "'${version/v/}'"' | \
	> ${extension}manifest.json
# replace all instances of src/ with empty string
echo "Generated ${extension}manifest.json ✓"


# BUILD NATIVE
title "BUILDING NATIVE"
native=${out}"native/"

title "Step 1: Copy source files"
cp -rv "src/native/" "$native"


title "PACKAGE"

title "Step 1: Replace package id"
grep -lR org.mpris.browser_host.debug dist/ | xargs sed -i 's/org.mpris.browser_host.debug/org.mpris.browser_host/g'
echo "Replaced all occurrences of 'org.mpris.browser_host.debug' with 'org.mpris.browser_host' ✓"

# Compress extension and native to a release zip
title "Step 2: Zip Release"
cd dist
zip -r "browser-mpris2-$version.zip" "."
cd ..
echo "Created release .zip for version $version ✓"

if [[ "$version" != "v666" ]]; then
    title "Step 3: Package extension"
    /opt/google/chrome/chrome --no-message-box --pack-extension=./dist/extension --pack-extension-key=./extension.pem
    echo "Create release .crx for version $version ✓"

#    title "Step 4: Generate update .xml"
#    echo "<?xml version='1.0' encoding='UTF-8'?>
#<gupdate xmlns='https://www.google.com/update2/response' protocol='2.0'>
#  <app appid='mcakdldkgmlakhcpdmecedogacbagdba'>
#    <updatecheck codebase='https://github.com/Lt-Mayonesa/browser-mpris2/releases/download/$version/browser-mpris2-$version.crx' version='"${version/v/}"' />
#  </app>
#</gupdate>
#" > "${out}updates.xml";
#
#    title "Step 5: Add updated URL"
#    cat "${extension}manifest.json" | \
#        jq '. + {update_url: "https://github.com/Lt-Mayonesa/browser-mpris2/releases/download/'${version}'/update.xml"}' \
#        > ${extension}manifest.json
fi

title "DONE ✓"
exit 0;
