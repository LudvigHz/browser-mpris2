#!/bin/bash
# Compile all source codes into dist/ folder

out="dist/"

function title() {
    green="\e[32m"
    fin="\e[0m"
    echo -e "\n${green}$1${fin}"
}

title "Step 1: Base Scripts"
npx google-closure-compiler --js='src/main/**.js' --js_output_file="${out}base.js" --language_out=ECMASCRIPT_2015
echo "Compiled all files in src/media into ${out}base.js ✓"

title "Step 2: Provider Scripts"
for filename in src/providers/*.js; do
	echo "↳ Compiling $filename"
	name=$(basename ${filename})
	npx google-closure-compiler --js="$filename" --js_output_file="${out}providers/$name" --language_out=ECMASCRIPT_2015
done
echo "Compiled all providers into ${out}providers/ ✓"

title "Step 3: Init Script"
npx google-closure-compiler --js='src/init.js' --js_output_file="${out}init.js" --language_out=ECMASCRIPT_2015
echo "Compiled src/init.js into ${out}init.js ✓"

title "Step 4: Background Script"
npx google-closure-compiler --js='background.js' --js_output_file="${out}background.js" --language_out=ECMASCRIPT_2015
echo "Compiled background.js into ${out}background.js ✓"

title "Step 5: Manifest"
cat manifest.json | \
    jq '.content_scripts[0].js = ["base.js"]' | \
	jq '.content_scripts[-1].js = ["init.js"]' \
	> ${out}manifest.json
sed -i -e 's,src/,,g' ${out}manifest.json
echo "Generated ${out}manifest.json ✓"

title "DONE ✓"
exit 0;
