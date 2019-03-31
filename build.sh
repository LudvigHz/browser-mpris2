#!/bin/bash
# Compile all source code into dist/ folder

function title() {
    green="\e[32m"
    fin="\e[0m"
    echo -e "\n${green}$1${fin}"
}

out="dist/"

if [[ ! -d ${out} ]]; then
    mkdir ${out}
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

title "Step 4: Background Script"
npx google-closure-compiler --js='background.js' --js_output_file="${extension}background.js" --language_out=${lang_out}
echo "Compiled background.js into ${extension}background.js ✓"

title "Step 5: Manifest"
# replace version, first and last content script js with base.js and init.js respectively
cat manifest.json | \
    jq '.name = "browser-mpris2"' | \
    jq '.version = "'$1'"' | \
    jq '.content_scripts[0].js = ["base.js"]' | \
	jq '.content_scripts[-1].js = ["init.js"]' \
	> ${extension}manifest.json
# replace all instances of src/ with empty string
sed -i -e 's,src/,,g' ${extension}manifest.json
echo "Generated ${extension}manifest.json ✓"


# BUILD NATIVE
title "BUILDING NATIVE"
native=${out}"native/"

title "Step 1: Copy source files"
cp -rv "src/native/" "$native"


title "REPLACE PACKAGE ID"
grep -lR org.mpris.browser_host.debug dist/ | xargs sed -i 's/org.mpris.browser_host.debug/org.mpris.browser_host/g'
echo "Replaced all occurrences of 'org.mpris.browser_host.debug' with 'org.mpris.browser_host'"

# Compress extension and native to a release zip
title "Step 6: Zip Release"
zip -r "browser-mpris2-$1.zip" ${extension} ${native}
echo "Created release .zip for version $1 ✓"

title "DONE ✓"
exit 0;
