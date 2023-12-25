const fs = require("fs");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

// İŞLEM YAPILAN SAYFA ADI
const pageName = "Checkout 3DS Ödemeleri";

// Excel Dosyasını hazırlma işlemi
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("LocalizationData");

// Statik Sütunları yaratıyorum
const languages = ["tr", "en", "es"];

worksheet.columns = [
  { header: "Key", key: "key", width: 15 },
  { header: "Lang", key: "lang", width: 15 },
  { header: "Target", key: "target", width: 15 },
  { header: "Value", key: "value", width: 15 },
];

// cshtml dosyasını okuyorum
const razorViewContent = fs.readFileSync("papara.cshtml", "utf8");
const loadFile = cheerio.load(razorViewContent);

// key olusturma fonksiyonum
function keyGenerator(pageName, section) {
  const lowercased = pageName.toLowerCase();
  const withUnderscores = lowercased.replace(/\s+/g, "_");

  const withoutCommonPart = section.toLowerCase().replace(/^page_/, "");

  const result = withUnderscores + "_" + withoutCommonPart;

  return result;
}

const headerKey = keyGenerator(pageName, "title");

const headerValue = loadFile("h3").text();

const addRows = (keys, values) => {
  languages.forEach((lang) => {
    keys.forEach((key, index) => {
      const value = Array.isArray(values) ? values[index] : values;
      worksheet.addRow({ key, lang, target: 11, value });
    });
  });
};

// header key
addRows([headerKey], headerValue);

// table
const table = loadFile("table").first();

// Table Değerlerini alıyorum
const tableValues = table
  .find("th")
  .map((index, th) => loadFile(th).text().trim())
  .get();

const rowKeys = () => {
  const filteredTableValues = tableValues.filter(
    (value) => value.trim() !== ""
  );

  const keys = filteredTableValues.map((value) => {
    const lastPart = keyGenerator(
      pageName,
      value.toLowerCase().replace(/\s+/g, "_")
    )
      .split("_")
      .pop();

    const originalKey = keyGenerator(
      pageName,
      value.toLowerCase().replace(/\s+/g, "_")
    );

    return {
      originalKey,
      comparisonKey:
        keyGenerator(pageName, value.toLowerCase().replace(/\s+/g, "_")) +
        "_page_" +
        lastPart.toUpperCase(),
    };
  });

  addRows(
    keys.map((key) => key.originalKey),
    filteredTableValues
  );
};

// Table Key
rowKeys();

// Excel dosyasını oluşturuyorum
workbook.xlsx
  .writeFile("adminMultiLang.xlsx")
  .then(() => {
    console.log("Dosya oluşturuldu");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
