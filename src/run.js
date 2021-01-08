import CountryMap from "./map";
import Country from "./country";
import FileParser from "./file";

const calculateCase = function (countryStrings) {
  try {
    const countries = countryStrings.map((cStr) =>
      Country.parseCountryString(cStr)
    );
    const result = new CountryMap(countries).diffuse();
    return result;
  } catch (err) {
    console.log("ERROR calculating case: ", err);
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
