class User {
      /**
     * Creates a new User instance using the provided parameters.
      * @param {Object} userData - The user data.
      * @param {number} userData.id_telegram - The Telegram ID of the user.
     * @param {string} userData.nim - The student ID of the user.
     * @param {string} userData.nama_lengkap - The full name of the user.
     * @param {string} userData.nama_panggilan - The nickname of the user.
     * @param {string} userData.jenis_kelamin - The gender of the user.
     * @param {string} userData.email - The email of the user.
     * @param {string} userData.angkatan - angkatan user
     * @param {string} userData.fakultas - fakultas kuliah user
     * @param {string} userData.departemen - departemen atau bidang kader
     * @param {string} userData.wilayah - berisi pusat / fakultas
     * @param {string} userData.amanah - berisi amanah dari kader
     * @param {string} userData.id_kader - berisi amanah dari kader
     * @returns {User} A new User instance.
     */

      constructor({id_telegram, nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah, id_kader}){
        this.id_telegram = id_telegram;
        this.nim = nim;
        this.nama_lengkap = nama_lengkap;
        this.nama_panggilan = nama_panggilan;
        this.jenis_kelamin = jenis_kelamin;
        this.email = email;
        this.angkatan =angkatan 
        this.fakultas =fakultas 
        this.departemen =departemen 
        this.wilayah =wilayah 
        this.amanah =amanah 
        this.id_kader =id_kader
    }
     /**
     * nge print data user
     * @returns {string} data user
     */
    printDataUser(){
        
        return`
        Nama Lengkap: [${this.nama_lengkap}]
        Nama Panggilan: [${this.nama_panggilan}]
        NIM: [${this.nim}]
        Jenis Kelamin : [${this.jenis_kelamin}]
        Email: [${this.email}]
        Angkatan: [${this.angkatan}]
        Fakultas: [${this.fakultas}]
        Departemen/Bidang: [${this.departemen}]
        Wilayah: [${this.wilayah}]
        Amanah: [${this.amanah}]
        `
        
            }
        

}
Logger.log("Loaded User.js" + (new Date() - startTime) + "ms")