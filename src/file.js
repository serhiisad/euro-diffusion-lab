import fs from "fs";

export default class FileParser {
  static parseInputFile(filename) {
    if (!filename) {
      throw new Error("Filename is missing");
    }
    const countryStrings = [];
    const lines = fs
      .readFileSync(filename)
      .toString()
      .split("\n")

      .map((line) => line.replace("\r", ""));

    let lineIndex = 0;

    while (lineIndex < lines.length - 2) {
      const currentLine = lines[lineIndex];
      const countryNumber = parseInt(currentLine);
      if (countryNumber) {
        //TODO
        lineIndex += 1; // move to first country line
        const countries = [];
        for (
          let countryLineIndex = lineIndex;
          countryLineIndex < countryNumber + lineIndex;
          countryLineIndex++
        ) {
          countries.push(lines[countryLineIndex]);
        }
        lineIndex += countryNumber; // move to next number of countries
        countryStrings.push(countries);
      } else {
        throw new Error(
          `INPUT ERROR in LINE '${lines[lineIndex]}'. NUMBER OF COUNTRIES IS EXPECTED`
        );
      }
    }

    if (lines[lines.length - 1] !== "0") {
      throw new Error("Input file must end with '0' line");
    }

    return countryStrings;
  }
}
