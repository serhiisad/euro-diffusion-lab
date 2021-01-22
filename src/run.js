import CountryMap from "./map";
import Country from "./country";
import FileParser from "./file";

const calculateCase = function (countryStrings) {
  try {
    const countries = countryStrings.map((cStr) =>
      Country.parseCountryString(cStr)
    );
    return new CountryMap(countries).diffuse();
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

const countryStrings = FileParser.parseInputFile("inputFile");
countryStrings.forEach((caseCountries, caseNumber) => {
  console.log(
    `Case Number ${caseNumber + 1}` +
      "\n" +
      CountryMap.stringifyResult(calculateCase(caseCountries))
  );
});
