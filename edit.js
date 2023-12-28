const fs = require("fs");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

const workbook = new ExcelJS.Workbook();
const worksheetName = "LocalizationData";

// Load the Excel file
workbook.xlsx
  .readFile("transformed.xlsx")
  .then(() => {
    // Get the worksheet
    const worksheet = workbook.getWorksheet(worksheetName);

    if (!worksheet) {
      console.error(
        `Worksheet "${worksheetName}" not found in the Excel file.`
      );
      return;
    }

    const razorViewContent = fs.readFileSync("papara.cshtml", "utf8");
    const loadFile = cheerio.load(razorViewContent);

    const table = loadFile("table").first();

    // Table values ve indexleri
    const tableValues = table
      .find("th")
      .map((index, th) => loadFile(th).text().trim())
      .get()
      .filter((value) => value.trim() !== "");

    // Excel column D
    const columnDValues = worksheet.getColumn("D").values;

    // Map Excel Değerlerini alıyorum
    const columnDToAColumnMap = {};
    worksheet.getColumn("A").eachCell((cell, rowNumber) => {
      const columnAValue = cell.value;
      const columnDValue = columnDValues[rowNumber - 1];
      if (columnDValue !== undefined) {
        // uniqueness
        if (!columnDToAColumnMap.hasOwnProperty(columnDValue)) {
          columnDToAColumnMap[columnDValue] = columnAValue;
        }
      }
    });

    // Table editliyorum
    table.find("th").each((index, th) => {
      const thValue = loadFile(th).html().trim();

      const correspondingDColumnValue = columnDToAColumnMap[thValue];

      if (correspondingDColumnValue !== undefined) {
        // Yorumda bulunan index değeri column sırasını temsil ediyor.
        // Orijinal sayfayı değişitirmeden önce sırayı kontrol ediniz.
        const keyIndex = tableValues.indexOf(thValue);

        // Key değerini data-i18n attribute u ile ekliyorum
        loadFile(th).html(
          `<span data-i18n="[html]${correspondingDColumnValue}"></span> <!-- ${keyIndex} -->`
        );
      }
    });

    // Label Değerlerini değiştiriyorum
    loadFile("label").each((index, label) => {
      const labelElement = loadFile(label);
      const labelValue = labelElement.html().trim();
      const labelValueFromExcel = columnDToAColumnMap[labelValue];

      if (labelValueFromExcel !== undefined) {
        // data-i18n attribute ekliyorum
        labelElement.attr("data-i18n", `[html]${labelValueFromExcel}`);

        // Girilen attribute (key) değerinin doğrulunu yorumda bulunan değer ile eşleştiğinden emin olunuz
        labelElement.html(`<!-- ${labelValue} -->`);
      } else {
        // Value bulunmazsa throw
        console.warn(`Label value "${labelValue}" not found in Excel.`);
      }
    });

    // Save file
    fs.writeFileSync("modified_papara.cshtml", loadFile.html(), "utf8");
  })
  .catch((error) => {
    console.error("Error reading the Excel file:", error);
  });
