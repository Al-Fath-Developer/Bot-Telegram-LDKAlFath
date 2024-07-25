// Utils/3. SpreadsheetUtils.js

/**
 * SpreadsheetUtils
 * 
 * Modul utilitas untuk mengelola operasi pada spreadsheet Google.
 * Menyediakan fungsi-fungsi untuk membuat, membaca, memperbarui, dan menghapus entri,
 * serta melakukan pencarian berdasarkan kriteria tertentu.
 */

const SpreadsheetUtils = {
   MasterSpreadsheet : SpreadsheetApp.getActiveSpreadsheet(),

/**
     * Objek indeks untuk mempercepat pencarian.
     * Menyimpan data dengan ID sebagai kunci untuk akses cepat.
     */
    index : {},

    /**
     * 
     * @param {Array} arr 
     * @returns Array
     */
    bulkSanitize: (arr)=>{
        const newArr = []
        arr.forEach(element => {
            newArr.push(sanitizeForCSV(element))
        });
        return newArr
    },
    
    /**
     * Membuat entri baru di spreadsheet.
     * 
 * @param {Array} data - Data entri baru.
 * @param {string} sheetName - Nama sheet tempat entri akan ditambahkan.
 * @return {number} - mengirim posisi di sheet
    */
    createEntry: (data, sheetName) =>{
        data = SpreadsheetUtils.bulkSanitize(data)
       const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
           
       const lr = sheet.appendRow([...data]).getLastRow();
       SpreadsheetUtils.index[data[0]] = data;
       return lr
    },
    
/**
 * Membuat kunci cache
 * @param {string} sheetName - Nama sheet
 * @param {string} range - Range data
 * @param {string|Object} [identifier] - ID atau kriteria pencarian
 * @returns {string} - Kunci cache
 */
createCacheKey: (sheetName, range, identifier = '') => {
    let idString = '';
    if (typeof identifier === 'object') {
      idString = JSON.stringify(identifier);
    } else {
      idString = identifier.toString();
    }
    return `${sheetName}_${range}_${idString}`;
  },

/**
 * Mendapatkan data dari cache atau spreadsheet
 * @param {string} sheetName - Nama sheet
 * @param {string} range - Range data
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @param {string|Object} [identifier] - ID atau kriteria pencarian
 * @returns {Array} - Data dari cache atau spreadsheet
 */
getDataFromCacheOrSheet: (sheetName, range, useCache = false, identifier = '') => {
    if (useCache) {
      const cache = CacheService.getScriptCache();
      const cacheKey = SpreadsheetUtils.createCacheKey(sheetName, range, identifier);
      
      let cachedData = cache.get(cacheKey);
      if (cachedData != null) {
        return JSON.parse(cachedData);
      }
    }

    const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
    const data = sheet.getRange(range).getValues();
    
    if (useCache) {
      const cache = CacheService.getScriptCache();
      const cacheKey = SpreadsheetUtils.createCacheKey(sheetName, range, identifier);
      cache.put(cacheKey, JSON.stringify(data), SpreadsheetUtils.CACHE_DURATION);
    }
    
    return data;
  },

/**
 * Memperbarui cache setelah perubahan data
 * @param {string} sheetName - Nama sheet
 * @param {string} range - Range data
 * @param {boolean} [useCache=false] - Apakah perlu memperbarui cache
 * @param {string|Object} [identifier] - ID atau kriteria pencarian
 */
updateCache: (sheetName, range, useCache = false, identifier = '') => {
    if (useCache) {
      const cache = CacheService.getScriptCache();
      const cacheKey = SpreadsheetUtils.createCacheKey(sheetName, range, identifier);
      
      const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
      const data = sheet.getRange(range).getValues();
      
      cache.put(cacheKey, JSON.stringify(data), SpreadsheetUtils.CACHE_DURATION);
    }
  },

/**
 * Membaca entri dari spreadsheet berdasarkan ID.
 * @param {any} id - ID entri yang dicari.
 * @param {string} sheetName - Nama sheet tempat entri disimpan.
 * @param {string} range - Lokasi range data entri.
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @returns {Array|null} - Data entri yang sesuai dengan ID atau null jika tidak ditemukan.
*/
 readEntryById: (id, sheetName, range, useCache = false) => {
    const data = SpreadsheetUtils.getDataFromCacheOrSheet(sheetName, range, useCache, id);
    for (let row of data) {
        if (row[0] === id) {
            return row;
        }
    }
    return null;
},
/**
 * Membaca entri dari spreadsheet eksternal berdasarkan ID.
 * @param {any} id - ID entri yang dicari.
 * @param {string} spreadsheetUrl - URL spreadsheet eksternal
 * @param {string} sheetName - Nama sheet tempat entri disimpan.
 * @param {string} range - Lokasi range data entri.
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @returns {Array|null} - Data entri yang sesuai dengan ID atau null jika tidak ditemukan.
*/
readEntryByIdFromExternalSpreadsheet: (id, spreadsheetUrl, sheetName, range, useCache = false) => {
  const data = SpreadsheetUtils.getDataFromCacheOrSheetInExternalSpreadsheet(spreadsheetUrl, sheetName, range, useCache, id);
  for (let row of data) {
    if (row[0] === id) {
      return row;
    }
  }
  return null;
},

/**
 * Mendapatkan data dari cache atau spreadsheet eksternal
 * @param {string} spreadsheetUrl - URL spreadsheet eksternal
 * @param {string} sheetName - Nama sheet
 * @param {string} range - Range data
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @param {string|Object} [identifier] - ID atau kriteria pencarian
 * @returns {Array} - Data dari cache atau spreadsheet eksternal
 */
getDataFromCacheOrSheetInExternalSpreadsheet: (spreadsheetUrl, sheetName, range, useCache = false, identifier = '') => {
  if (useCache) {
    const cache = CacheService.getScriptCache();
    const cacheKey = SpreadsheetUtils.createCacheKeyInExternalSpreadsheet(spreadsheetUrl, sheetName, range, identifier);

    let cachedData = cache.get(cacheKey);
    if (cachedData != null) {
      return JSON.parse(cachedData);
    }
  }

  const externalSpreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  const sheet = externalSpreadsheet.getSheetByName(sheetName);
  const data = sheet.getRange(range).getValues();

  if (useCache) {
    const cache = CacheService.getScriptCache();
    const cacheKey = SpreadsheetUtils.createCacheKeyInExternalSpreadsheet(spreadsheetUrl, sheetName, range, identifier);
    cache.put(cacheKey, JSON.stringify(data), SpreadsheetUtils.CACHE_DURATION);
  }

  return data;
},

/**
 * Membuat kunci cache untuk spreadsheet eksternal
 * @param {string} spreadsheetUrl - URL spreadsheet eksternal
 * @param {string} sheetName - Nama sheet
 * @param {string} range - Range data
 * @param {string|Object} [identifier] - ID atau kriteria pencarian
 * @returns {string} - Kunci cache
 */
createCacheKeyInExternalSpreadsheet: (spreadsheetUrl, sheetName, range, identifier = '') => {
  let idString = '';
  if (typeof identifier === 'object') {
    idString = JSON.stringify(identifier);
  } else {
    idString = identifier.toString();
  }
  return `${spreadsheetUrl}_${sheetName}_${range}_${idString}`;
},

/**
 * Memperbarui entri di spreadsheet berdasarkan ID.
 * @param {number} id - ID entri yang akan diperbarui.
 * @param {Array} newData - Data baru untuk entri.
 * @param {string} sheetName - Nama sheet tempat entri disimpan.
 * @param {string} range - Lokasi range data entri.
 * @param {boolean} [useCache=false] - Apakah perlu memperbarui cache
*/
 updateEntryById: (id, newData, sheetName, range, useCache = false) =>{
    newData = SpreadsheetUtils.bulkSanitize(newData)

    const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
    const data = SpreadsheetUtils.getDataFromCacheOrSheet(sheetName, range, useCache, id);
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === id) {
            sheet.getRange(range).offset(i, 0, 1, newData.length).setValues([newData]);
            SpreadsheetUtils.index[id] = newData;
            SpreadsheetUtils.updateCache(sheetName, range, useCache, id);
            break;
        }
    }
},

/**
 * Menghapus entri dari spreadsheet berdasarkan ID.
 * @param {number} id - ID entri yang akan dihapus.
 * @param {string} sheetName - Nama sheet tempat entri disimpan.
 * @param {string} range - Lokasi range data entri.
 * @param {boolean} [useCache=false] - Apakah perlu memperbarui cache
*/
 deleteEntryById:(id, sheetName, range, useCache = false) =>{
    const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
    const data = SpreadsheetUtils.getDataFromCacheOrSheet(sheetName, range, useCache, id);
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === id) {
            sheet.getRange(range).offset(i, 0, 1, data[i].length).clearContent();
            delete SpreadsheetUtils.index[id];
            SpreadsheetUtils.updateCache(sheetName, range, useCache, id);
            break;
        }
    }
},

/**
 * Mencari entri dalam spreadsheet berdasarkan kriteria tertentu.
 * @param {Object} criteria - Kriteria pencarian.
 * @param {string} sheetName - Nama sheet tempat entri disimpan.
 * @param {string} range - Lokasi range data entri.
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @returns {Array} - Array entri yang sesuai dengan kriteria.
*/
 searchEntries: (criteria, sheetName, range, useCache = false) => {
    const data = SpreadsheetUtils.getDataFromCacheOrSheet(sheetName, range, useCache, criteria);
    const headers = data[0]; // Mengambil header kolom sebagai referensi kunci
    const results = [];
    
    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        let match = true;
        
        for (let key in criteria) {
            let columnIndex = headers.indexOf(key);
            if (columnIndex !== -1 && row[columnIndex] !== criteria[key]) {
                match = false;
                break;
            }
        }
        
        if (match) {
            results.push(row);
        }
    }
    
    return results;
},
/**
 * fungsi untuk ngedapetin sheet mentah
 * @param {String} sheet_name nama sheet yang dicari
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} sheet 
 */
getSheetByName(sheet_name){
    return SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheet_name)
    

},

/**
 * Mendapatkan nilai sel berdasarkan posisi sel
 * @param {String} cellPosition - Posisi sel (misalnya 'A1')
 * @param {String} sheetName - Nama sheet
 * @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
 * @returns {any} - Nilai sel
 */
getCellValueByCellPosition: (cellPosition, sheetName, useCache = false) => {
    if (useCache) {
      const cache = CacheService.getScriptCache();
      const cacheKey = SpreadsheetUtils.createCacheKey(sheetName, cellPosition);
      
      let cachedValue = cache.get(cacheKey);
      if (cachedValue != null) {
        return JSON.parse(cachedValue);
      }
    }
    
    const sheet = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(sheetName);
    const value = sheet.getRange(cellPosition).getValue();
    
    if (useCache) {
      const cache = CacheService.getScriptCache();
      const cacheKey = SpreadsheetUtils.createCacheKey(sheetName, cellPosition);
      cache.put(cacheKey, JSON.stringify(value), SpreadsheetUtils.CACHE_DURATION);
    }
    
    return value;
  },

/**
 * 
 * @param {String} spreadsheet_url 
 * @param {String} sheet_name 
 * @param {Array} arrData 
 * @returns {Number} last Row
  */
appendRowDataToExternalSpreadsheet(spreadsheet_url, sheet_name, arrData){
    

        const externalSpreadsheet = SpreadsheetApp.openByUrl(spreadsheet_url)
    if (externalSpreadsheet == null){
        throw new Error("Maaf, ada kesalahan dalam penulisan link spreadsheet hasil. Hubungi Admin untuk memperbaikinya")

    }
    
    const sheet = externalSpreadsheet.getSheetByName(sheet_name)
    if (sheet == null){
        throw new Error("Maaf, nama sheet yang dituju salah. Hubungi Admin untuk memperbaikinya")
    }
    return sheet.appendRow(arrData).getLastRow()

},
/** 
* Mencari entri dalam spreadsheet eksternal berdasarkan kriteria tertentu.
* @param {Object} criteria - Kriteria pencarian.
* @param {string} spreadsheetUrl - URL spreadsheet eksternal
* @param {string} sheetName - Nama sheet tempat entri disimpan.
* @param {string} range - Lokasi range data entri.
* @param {boolean} [useCache=false] - Apakah boleh menggunakan cache
* @returns {Array} - Array entri yang sesuai dengan kriteria.
*/
searchEntriesInExternalSpreadsheet (criteria,spreadsheetUrl, sheetName, range, useCache = false ) {
 const externalSpreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
 if (externalSpreadsheet == null) {
   throw new Error("Maaf, tidak dapat mengakses spreadsheet eksternal. Pastikan URL spreadsheet benar dan Anda memiliki akses ke spreadsheet tersebut.");
 }

 const sheet = externalSpreadsheet.getSheetByName(sheetName);
 if (sheet == null) {
   throw new Error("Maaf, sheet dengan nama tersebut tidak ditemukan dalam spreadsheet eksternal.");
 }

 const data = sheet.getRange(range).getValues();
 const headers = data[0]; // Mengambil header kolom sebagai referensi kunci
 const results = [];

 for (let i = 1; i < data.length; i++) {
   let row = data[i];
   let match = true;

   for (let key in criteria) {
     let columnIndex = headers.indexOf(key);
     if (columnIndex !== -1 && row[columnIndex] !== criteria[key]) {
       match = false;
       break;
     }
   }

   if (match) {
     results.push(row);
   }
 }

 return results;
},
checkEditorAccess(spreadsheet_url){
    const externalSpreadsheet = SpreadsheetApp.openByUrl(spreadsheet_url)


},

/**
 * Durasi cache dalam detik (default: 1 jam)
 */
CACHE_DURATION: 3600,

/**
 * Mereset semua data dalam cache atau cache tertentu
 * @param {Object} [criteria] - Kriteria untuk mereset cache tertentu
 */
resetAllCache: (criteria = null) => {
    const cache = CacheService.getScriptCache();
    
    if (criteria === null) {
      // Mereset semua cache
      cache.removeAll([
        'Data_A:C', 
        'OtherSheet_A:D', 
        'Users_A:E',
        'Products_A:F_{"category":"Electronics"}',
        'Orders_A:G_{"status":"Pending"}',
        'Inventory_A:D_1',
        'Customers_A:E_{"country":"Indonesia"}',
        'Data_B2',
        'Users_A1'
      ]);
    } else {
      const keysToRemove = [];
      
      if (criteria.sheetName) {
        if (criteria.range) {
          if (criteria.identifier) {
            // Reset cache untuk sheet, range, dan identifier tertentu
            const cacheKey = SpreadsheetUtils.createCacheKey(criteria.sheetName, criteria.range, criteria.identifier);
            keysToRemove.push(cacheKey);
          } else {
            // Reset semua cache untuk sheet dan range tertentu
            keysToRemove.push(`${criteria.sheetName}_${criteria.range}`);
          }
        } else if (criteria.cellPosition) {
          // Reset cache untuk posisi sel tertentu
          const cacheKey = SpreadsheetUtils.createCacheKey(criteria.sheetName, criteria.cellPosition);
          keysToRemove.push(cacheKey);
        } else if (criteria.id) {
          // Reset cache untuk ID tertentu
          const cacheKey = SpreadsheetUtils.createCacheKey(criteria.sheetName, '*', criteria.id);
          keysToRemove.push(cacheKey);
        } else {
          // Reset semua cache untuk sheet tertentu
          keysToRemove.push(`${criteria.sheetName}_`);
        }
      }
      
      if (keysToRemove.length > 0) {
        cache.removeAll(keysToRemove);
      }
    }
  }

}

function resetCache(){
    // reset info
    // SpreadsheetUtils.resetAllCache({
//   sheetName: 'Informasi',
//   cellPosition: 'A7'
// });
// reset soal
    SpreadsheetUtils.resetAllCache({ sheetName: 'Soal Isian Singkat', range: 'A:D', identifier: 'kritik_saran_bot' });
   
    
   
//     // Contoh 1: Mereset semua cache
// SpreadsheetUtils.resetAllCache();

// // Contoh 2: Mereset cache untuk sheet tertentu
// SpreadsheetUtils.resetAllCache({ sheetName: 'Data' });

// // Contoh 3: Mereset cache untuk sheet dan range tertentu
// SpreadsheetUtils.resetAllCache({ sheetName: 'Users', range: 'A:E' });

// // Contoh 4: Mereset cache untuk sheet, range, dan identifier tertentu (ID)
// SpreadsheetUtils.resetAllCache({ sheetName: 'Inventory', range: 'A:D', identifier: 1 });

// // Contoh 5: Mereset cache untuk sheet, range, dan identifier tertentu (kriteria objek)
// SpreadsheetUtils.resetAllCache({
//   sheetName: 'Products',
//   range: 'A:F',
//   identifier: { category: 'Electronics' }
// });

// // Contoh 6: Mereset cache untuk ID tertentu
// SpreadsheetUtils.resetAllCache({
//   sheetName: 'Orders',
//   id: 1001
// });

// // Contoh 7: Mereset cache untuk posisi sel tertentu
// SpreadsheetUtils.resetAllCache({
//   sheetName: 'Customers',
//   cellPosition: 'B2'
// });

// // Contoh 8: Mereset cache untuk beberapa ID sekaligus
// const idsToReset = [1001, 1002, 1003];
// idsToReset.forEach(id => {
//   SpreadsheetUtils.resetAllCache({
//     sheetName: 'Orders',
//     id: id
//   });
// });

// // Contoh 9: Mereset cache untuk beberapa posisi sel sekaligus
// const cellsToReset = ['A1', 'B2', 'C3'];
// cellsToReset.forEach(cell => {
//   SpreadsheetUtils.resetAllCache({
//     sheetName: 'Data',
//     cellPosition: cell
//   });
// });
}
function coba(){
        
        // Membuat entri baru
        // createEntry([3, 'Alice Johnson', 35], 'Data');
        
// // Membaca entri berdasarkan ID
// const entry = readEntryById(3, 'Data', 'A:C');
// console.log(entry);

// // Memperbarui entri berdasarkan ID
// updateEntryById(3, [3, 'John Updated', 32], 'Data', 'A:C');

// // Menghapus entri berdasarkan ID
// deleteEntryById(3, 'Data', 'A:C');
// 
// // Mencari entri berdasarkan kriteria
const results = searchEntries({ Age: 8 }, 'Data', 'A:C');
console.log(results);
}

Logger.log("Loaded SpreadsheetUtils.js" + (new Date() - startTime) + "ms")