
/**
 * Sebuah class untuk ngurus user ke database
 */
class UserRepository{
    constructor(){
        this.sheet_name =  getMapENV('USER_SHEET_NAME')
        this.createNewUser = this.createNewUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.isExist = this.isExist.bind(this)
        this.findById = this.findById.bind(this)
        this.getRawUserByNIM = this.getRawUserByNIM.bind(this)
        
    }

    
    /**
     * Creates a new User instance using the provided parameters.
      * @param {Object} userData - The user data.
     * @param {number} userData.id_telegram - The Telegram ID of the user.
     * @param {string} userData.nama_lengkap - The full name of the user.
     * @param {string} userData.nama_panggilan - The nickname of the user.
     * @param {string} userData.nim - The student ID of the user.
     * @param {string} userData.jenis_kelamin - The gender of the user.
     * @param {string} userData.email - The email of the user.
     * @param {string} userData.angkatan - angkatan user
     * @param {string} userData.fakultas - fakultas kuliah user
     * @param {string} userData.departemen - departemen atau bidang kader
     * @param {string} userData.wilayah - berisi pusat / fakultas
     * @param {string} userData.amanah - berisi amanah dari kader
     * @returns {User} A new User instance.
     */
     createNewUser({id_telegram, nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah}) {
        const user = {id_telegram, nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah} 
        let data = UserUtils.userToArray(user);
        SpreadsheetUtils.createEntry(data, this.sheet_name)
        
        
        const new_user = new UserBuilder()
        .setIdTelegram(id_telegram)
        .setNamaLengkap(nama_lengkap)
        .setNamaPanggilan(nama_panggilan)
        .setNim(nim)
        .setJenisKelamin(jenis_kelamin)
        .setEmail(email)
        .setAngkatan(angkatan)
        .setFakultas(fakultas)
        .setDepartemen(departemen)
        .setWilayah(wilayah)
        .setAmanah(amanah)
        .build()
        return new_user;
    }
    
   
      /**
     * Constructs a new User instance.
   * @param {Object} userData - The user data.
     * @param {number} userData.id_telegram - The Telegram ID of the user.
     * @param {string} userData.nama_lengkap - The full name of the user.
     * @param {string} userData.nama_panggilan - The nickname of the user.
     * @param {string} userData.nim - The student ID of the user.
     * @param {string} userData.jenis_kelamin - The gender of the user.
     * @param {string} userData.email - The email of the user.
     * @param {string} userData.angkatan - angkatan user
     * @param {string} userData.fakultas - fakultas kuliah user
     * @param {string} userData.departemen - departemen atau bidang kader
     * @param {string} userData.wilayah - berisi pusat / fakultas
     * @param {string} userData.amanah - berisi amanah dari kader
     * @returns {User} A new User instance.
     */
     updateUser({id_telegram, nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah}){
        const updatedUser = new UserBuilder()
        .setIdTelegram(id_telegram)
        .setNamaLengkap(nama_lengkap)
        .setNamaPanggilan(nama_panggilan)
        .setNim(nim)
        .setJenisKelamin(jenis_kelamin)
        .setEmail(email)
        .setAngkatan(angkatan)
        .setFakultas(fakultas)
        .setDepartemen(departemen)
        .setWilayah(wilayah)
        .setAmanah(amanah)
        .build()
        SpreadsheetUtils.updateEntryById(id_telegram, UserUtils.userToArray(updatedUser), "Users", "A:K");
        // return "hallo"
        return updatedUser



    }
    
    /**
     * Memeriksa apakah pengguna sudah ada berdasarkan ID Telegram.
     * @param {number} id_telegram - ID Telegram pengguna yang akan diperiksa.
     * @returns {boolean} - True jika pengguna sudah ada, false jika tidak.
     */
     isExist(id_telegram){
        let data = SpreadsheetUtils.searchEntries({id_telegram: id_telegram}, "Users", "A:A");
        return data.length > 0;


    }

    /**
     * Mendapatkan informasi pengguna berdasarkan ID Telegram.
     * @param {number} id_telegram - ID Telegram pengguna yang akan dicari.
     * @returns {User}  - Informasi pengguna yang ditemukan.
     */

     findById(id_telegram){
        let data = SpreadsheetUtils.searchEntries({id_telegram: id_telegram}, "Users", "A:K");
        if (data[0]){
            return  UserUtils.arrayToUser(data[0]);
        }
        return null
    }
    getRawUserByNIM(nim){
        try {
            
            let data = SpreadsheetUtils.readEntryById(nim, "Raw Users","A:I",true)
            const user = new UserBuilder()
            .setNim(data[0])
            .setNamaLengkap(data[1])
            .setJenisKelamin(data[2])
            .setAngkatan(data[3])
            .setFakultas(data[4])
            .setDepartemen(data[5])
            .setWilayah(data[6])
            .setAmanah(data[7])
            .setEmail(data[8])
            .build()
            return user
        } catch (error) {
            return error.message
            
        }

        
        
    }
   
 
    
    


}
Logger.log("Loaded UserRepository.js" + (new Date() - startTime) + "ms")