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
        lineIndex += 1;
        const countries = [];
        for (
          let countryLineIndex = lineIndex;
          countryLineIndex < countryNumber + lineIndex;
          countryLineIndex++
        ) {
          countries.push(lines[countryLineIndex]);
        }
        lineIndex += countryNumber;
        countryStrings.push(countries);
      } else {
        throw new Error(
          `INPUT ERROR in LINE '${lines[lineIndex]}'. NUMBER OF COUNTRIES IS EXPECTED`
        );
      }
    }
    if (lines[lines.length - 1] !== "0") {
      throw new Error("INPUT FILE MUST END WITH a ZERO line");
    }

    return countryStrings;
  }
}
