# Italian Verb Conjugation Extractor

This project is designed to extract Italian verb conjugations and find the infinitive form of a conjugated verb from a given dataset. The script scrapes verb data from a website, processes it, and provides the ability to identify the infinitive form from conjugated verb inputs.

### Problem Overview

The goal of the project was to handle conjugated Italian verbs and identify their infinitive form. There wasn't an easily accessible library or API that could perform this task, so this solution was created by scraping verb tables and conjugation data from an external source.

---

## How It Works

1. **Fetching Data**: 
   The script fetches verb data from the website `https://www.italian-verbs.com`, specifically from a page that contains a list of common Italian verbs.

2. **Extracting Verbs and Conjugations**:
   The verb data is processed using the `cheerio` library (a jQuery-like API for Node.js), which allows us to parse and navigate the HTML of the fetched pages.

3. **Finding Infinitives**:
   Given a conjugated verb, the script matches it to its corresponding infinitive form by comparing it against the conjugations extracted from the website.

---

## Prerequisites

Before running this script, ensure you have the following dependencies installed:

- **Node.js**: Version 12 or higher.
- **npm** (Node Package Manager): For managing the libraries.

---

## Installation

1. Clone or download this repository.
   
2. Navigate to the project directory and install the dependencies by running:

    ```bash
    npm install
    ```

---

## Dependencies

The script uses the following libraries:

- **node-fetch**: To make HTTP requests to the target website.
- **cheerio**: To parse and manipulate the HTML content of the fetched pages.
- **fs**: To interact with the file system and read/write JSON files.

---

## Usage

### Step 1: Scraping Verbs and Conjugations

The main functionality of the script is divided into two parts:

1. **Fetching and Parsing Verbs**:
    The function `getVerbs(page)` fetches a list of verbs from the website. It processes the HTML to extract the verb name, its conjugations page URL, and its usage.

    Example usage:
    ```javascript
    const verbs = await getVerbs(1); // Get verbs from page 1
    console.log(verbs);
    ```

2. **Fetching Conjugations**:
    The function `getConjugations(verbUrl)` fetches the conjugations for a given verb's URL. It parses the conjugation tables for each verb in different tenses.

    Example usage:
    ```javascript
    const conjugations = await getConjugations(verbUrl); // Pass verb URL to get conjugations
    console.log(conjugations);
    ```

### Step 2: Finding Infinitive for a Conjugated Verb

After scraping the verb data and storing it in `verbs_conjugated.json`, you can find the infinitive form of a given conjugated verb by using the `findInfinitive()` function.

The function works as follows:
- It compares the input conjugated verb with the conjugations of verbs in the `verbs_conjugated.json` file.
- It returns the infinitive form if a match is found.

Example usage:
```javascript
const verbConjugations = JSON.parse(fs.readFileSync('verbs_conjugated.json'));
const infinitive = findInfinitive(verbConjugations, "ho fattorizzato"); // Pass conjugated verb
console.log(infinitive); // Output: "fattorizzare"
```

### Step 3: Running the Script

To run the script, simply execute the `main()` function, which loads the verb data, performs the search for a conjugated verb, and prints the corresponding infinitive:

```bash
node index.js
```

---

## Code Breakdown

- **`getVerbs(page)`**: Fetches verb data from the website for a specific page, parsing the verb name, usage, and conjugation URL.
- **`getConjugations(verbUrl)`**: Fetches and parses conjugation data for a verb from its respective URL.
- **`findInfinitive(verbConjugations, conjugatedVerb)`**: Compares a conjugated verb with the conjugations in `verbs_conjugated.json` and returns the infinitive form.
- **`main()`**: The main execution function that loads conjugated verbs from a file, finds the infinitive form of a given conjugated verb, and logs the result.

---

## Example Output

For the input conjugated verb `"ho fattorizzato"`, the output might be:

```bash
fattorizzare
```

---

## Limitations

- **Website Structure**: The script is dependent on the structure of the target website, so any changes in the HTML layout could break the functionality.
- **Verb Coverage**: The verb list and conjugation data may not be exhaustive or comprehensive for all Italian verbs.

---

## Conclusion

This script is a practical solution for identifying the infinitive form of conjugated Italian verbs by scraping conjugation data from the website `https://www.italian-verbs.com`. It fills the gap left by the absence of a suitable API or library for this specific task.