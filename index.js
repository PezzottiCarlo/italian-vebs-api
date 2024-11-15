import fetch from 'node-fetch';
import fs from 'fs';
import * as cheerio from 'cheerio';

const url = "https://www.italian-verbs.com";

const getVerbs = async (page) => {
    const response = await fetch(`${url}/verbi-italiani/verbi-italiani-top.php?pg=${page}`);
    const data = await response.text();
    const $ = cheerio.load(data);
    const rows = $('table#mw tbody tr');
    const verbs = [];
    rows.each((i, row) => {
        const cols = $(row).find('td');
        if (cols.length >= 3) {
            const verb = $(cols[1]).find('a').text().trim();
            const conjugations = $(cols[1]).find('a').attr('href');
            const usage = $(cols[2]).text().trim();

            verbs.push({
                verb,
                usage,
                conjugations
            });
        }
    });
    return verbs;
}

const getConjugations = async (verbUrl) => {
    const response = await fetch(`${verbUrl}`);
    const data = await response.text();
    const $ = cheerio.load(data);
    const conjugations = {};
    let currentTense = null;
    $(".list").each((_, list) => {
        $(list).children().each((_, element) => {
            if ($(element).find(".tempo").length) {
                currentTense = $(element).find(".tempo").text().trim();
                if (!conjugations[currentTense]) {
                    conjugations[currentTense] = [];
                }
            } 
            else if ($(element).hasClass("cpad")) {
                const conjugation = $(element).text().trim();
                if (conjugation && currentTense) {
                    conjugations[currentTense].push(conjugation);
                }
            }
        });
    });

    return conjugations;
};


const findInfinitive = (verbConjugations, conjugatedVerb) => {
    const normalizedConjugatedVerb = conjugatedVerb.toLowerCase().replace(/^(io|tu|lui\/lei|noi|voi|loro)\s+/i, '').trim();
    for (let entry of verbConjugations) {
        const infinitive = entry['verb'];
        for (let tense in entry['conjugations']) {
            for (let conjugation of entry['conjugations'][tense]) {
                const normalizedConjugation = conjugation.toLowerCase().replace(/^(io|tu|lui\/lei|noi|voi|loro)\s+/i, '').trim();
                
                if (normalizedConjugation[normalizedConjugation.length - 2] === "/") {
                    if (normalizedConjugation.slice(0, -3) === normalizedConjugatedVerb.slice(0, -1)) {
                        return infinitive;
                    }
                }
                else if (normalizedConjugation === normalizedConjugatedVerb) {
                    return infinitive;
                }
            }
        }
    }
    return null;
};

const main = async () => {
    const verbConjugations = JSON.parse(fs.readFileSync('verbs_conjugated.json'));
    console.log(findInfinitive(verbConjugations, "ho fattorizzato"));
}

main();
