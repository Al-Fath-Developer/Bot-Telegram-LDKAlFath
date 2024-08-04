class PresensiServices{
    constructor(){
        this.presensiRepository = new PresensiRepository()
        this.addAdminPresensi = this.addAdminPresensi.bind(this)


    }
    /**
     * Menambahkan data presensi admin
     * @param {Array} arrData - Array berisi data presensi
     * @returns {number} Nomor baris terakhir yang ditambahkan
     */
    addAdminPresensi(arrData){
        arrData.unshift(new Date())
        const lastRow = this.presensiRepository.addAdminPresensi(arrData)
        return lastRow
        }

        addKonfirmasiKehadiran(id_telegram,arrUser, answer, spreadsheet_hasil_link, sheet_hasil_name){
            const arrData = [new Date(),   TextUtils.encodeText(id_telegram), ...arrUser, ...answer]
            return this.presensiRepository.addKonfirmasiKehadiran(arrData, spreadsheet_hasil_link, sheet_hasil_name)
        }
        /**
         * 
         * @param {String} id_konfirm_kehadiran 
         * @returns {Object} Konfigurasi konfirmasi kehadiran
         */
        getKonfigKonfirmasiKehadiran(id_konfirm_kehadiran){
            return this.presensiRepository.getKonfigKonfirmasiKehadiran(id_konfirm_kehadiran)
        }

}