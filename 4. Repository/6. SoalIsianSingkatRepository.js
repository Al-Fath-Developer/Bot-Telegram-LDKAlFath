class SoalIsianSingkatRepository{
    constructor (){
        this.spreadsheet_link = getMapENV('SOAL_ISIAN_SINGKAT_SPREADSHEET_LINK')
        this.sheet_name = getMapENV('SOAL_ISIAN_SINGKAT_SHEET_NAME')
        this.sheet_range = getMapENV('SOAL_ISIAN_SINGKAT_SHEET_RANGE')
    }

    /**
     * Mengambil data soal bedasarkan id
     * @param {Number} id_soal 
     * @returns {SoalIsianSingkat}
     */
    getDataSoalLengkapById(id_soal){
        const arrData = SpreadsheetUtils.readEntryByIdFromExternalSpreadsheet(id_soal,this.spreadsheet_link, this.sheet_name, this.sheet_range,false);
        
        if (arrData != null){

            return new SoalIsianSingkatBuilder()
            .setIdSoal(arrData[0])
            .setTemplatePertanyaan(arrData[1])
        .setSpreadsheetHasilLink(arrData[2])
        .setSheetHasilName(arrData[3])
        .setBuktiLokasi(arrData[4])
        .build()
    }else{
        return null
    }
}

/**
 * 
 * @param {Array} arrData 
 * @param {String} spreadsheet_hasil_link 
 * @param {String} sheet_hasil_name 
 */  
    addAnswerFromUser(arrData, spreadsheet_hasil_link, sheet_hasil_name){

        return SpreadsheetUtils.appendRowDataToExternalSpreadsheet(spreadsheet_hasil_link, sheet_hasil_name, arrData)


        


    }
    
}
Logger.log("Loaded SoalIsianSingkatRepository" + (new Date() - startTime) + "ms")