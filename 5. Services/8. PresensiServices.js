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

}