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
  { header: "Key", key: "key", width: 50 },
  { header: "Lang", key: "lang", width: 15 },
  { header: "Target", key: "target", width: 15 },
  { header: "Value", key: "value", width: 50 },
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

const addKeys = (keys, values) => {
  languages.forEach((lang) => {
    keys.forEach((key, index) => {
      const value = Array.isArray(values) ? values[index] : values;
      worksheet.addRow({ key, lang, target: 11, value });
    });
  });
};

// header key
addKeys([headerKey], headerValue);

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

  addKeys(
    keys.map((key) => key.originalKey),
    filteredTableValues
  );
};

// Table Key
rowKeys();

// Form Labelları alıyorum
function formLabelKeyGenerator(pageName, label) {
  const lowercased = pageName.toLowerCase().replace(/\s+/g, "_");
  const withoutCommonPart = label.toLowerCase().replace(/\s+/g, "_");

  if (!withoutCommonPart.trim()) {
    return null;
  }

  return `${lowercased}_form_${withoutCommonPart}_label`;
}

const labels = [];
loadFile("label").each((index, labelElement) => {
  const labelText = loadFile(labelElement).text().trim();

  if (labelText.trim() !== "") {
    labels.push(labelText);

    const labelKey = formLabelKeyGenerator(pageName, labelText);

    if (labelKey !== null) {
      addKeys([labelKey], labelText);
    }
  }
});

// Excel dosyasını oluşturuyorum
workbook.xlsx
  .writeFile("adminMultiLang.xlsx")
  .then(() => {
    console.log("Dosya oluşturuldu");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
