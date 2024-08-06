#!/usr/bin/env node

import { createReadStream, createWriteStream, readFileSync, writeFileSync } from 'node:fs';
import readline from 'node:readline';

import archiver from 'archiver';

let rules = [];
let id = 0;

(async function () {
    const fileStream = createReadStream('blocked-domains.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const filter_pattern = line.trim();
        if (filter_pattern.startsWith('#')) continue;
        rules.push({
            id: ++id,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: '||' + filter_pattern,
                resourceTypes: ["main_frame"]
            }
        });
    }

    const rules_json = JSON.stringify(rules, null, 2);

    writeFileSync("rules.json", rules_json, { flush: true });

    let manifest = JSON.parse(readFileSync("manifest.json"));

    manifest.browser_specific_settings = {
        gecko: {
            id: 'no-frills-website-blocker@winstonfrantz.com'
        }
    };

    let manifest_json = JSON.stringify(manifest, null, 2);

    const archive = archiver('zip', { zlib: { level: 0 }});
    const zip_output = createWriteStream('out.xpi');

    archive.pipe(zip_output);
    archive.append(rules_json, { name: 'rules.json' });
    archive.append(manifest_json, { name: 'manifest.json' });
    archive.finalize();
})();



