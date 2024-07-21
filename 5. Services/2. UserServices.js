/**
 * Objek untuk mengelola data pengguna.
 */
const userRepository = new UserRepository() 
class  UserServices  {

    /**
     * Menambah user baru meelakui registrasi.
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
        // Membuat object user dari class user
        // Menambah user baru ke notifikasi LMS
        (new AYServices()).addNewUser(id_telegram, nim)
       // menyimpan user baru
        return userRepository.createNewUser({id_telegram, nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah})
    }

    /**
     * Memeriksa apakah pengguna sudah ada berdasarkan ID Telegram.
     * @param {number} id_telegram - ID Telegram pengguna yang akan diperiksa.
     * @returns {boolean} - True jika pengguna sudah ada, false jika tidak.
     */
    checkUserExist(id_telegram) {
        return userRepository.isExist(id_telegram);
    }

    /**
     * Mendapatkan informasi pengguna berdasarkan ID Telegram.
     * @param {number} id_telegram - ID Telegram pengguna yang akan dicari.
     * @returns {User}  - Informasi pengguna yang ditemukan.
     */
    getUserInfoById(id_telegram) {
       return userRepository.findById(id_telegram)
    }
    
    /**
     * Memperbarui data pengguna berdasarkan ID Telegram.
     * @param {number} id_telegram - The Telegram ID of the User.
     * @param {Object} userData - The user data.
     * @param {string} userData.nama_lengkap - The full name of the User.
     * @param {string} userData.nama_panggilan - The nickname of the User.
     * @param {string} userData.nim - The student ID of the User.
     * @param {string} userData.jenis_kelamin - The gender of the User.
     * @param {string} userData.email - The email of the User.
     * @param {string} userData.angkatan - angkatan user
     * @param {string} userData.fakultas - fakultas kuliah user
     * @param {string} userData.departemen - departemen atau bidang kader
     * @param {string} userData.wilayah - berisi pusat / fakultas
     * @param {string} userData.amanah - berisi amanah dari kader
     * @returns {User} A new User instance.

     */
    updateDataUserById(id_telegram,{ nama_lengkap, nama_panggilan, nim, jenis_kelamin, email, angkatan, fakultas, departemen, wilayah, amanah}) {
        const oldDataUser = userRepository.findById(id_telegram)
        if(oldDataUser){
            const newDataUser = {
                id_telegram: id_telegram,
                nama_lengkap: nama_lengkap == null?oldDataUser.nama_lengkap: nama_lengkap,
                nama_panggilan: nama_panggilan == null?oldDataUser.nama_panggilan: nama_panggilan,
                nim: nim == null?oldDataUser.nim: nim,
                jenis_kelamin: jenis_kelamin == null?oldDataUser.jenis_kelamin: jenis_kelamin,
                email: email == null?oldDataUser.email: email,
                angkatan: angkatan == null?oldDataUser.angkatan: angkatan,
                fakultas: fakultas == null?oldDataUser.fakultas: fakultas,
                departemen: departemen == null?oldDataUser.departemen: departemen,
                wilayah: wilayah == null?oldDataUser.wilayah: wilayah,
                amanah: amanah == null?oldDataUser.amanah: amanah,

            }
            return userRepository.updateUser(newDataUser)
        }
        return "data nya ga ketemu?" + id_telegram
        
    }
    
    
};

/**
 * Objek untuk merepresentasikan pengguna.
 * @typedef {Object} User
 * @property {string} id_telegram - ID Telegram pengguna.
 * @property {string} nama_lengkap - Nama lengkap pengguna.
 * @property {string} nama_panggilan - Nama panggilan pengguna.
 * @property {string} nim - NIM pengguna.
 * @property {string} jenis_kelamin - Jenis kelamin pengguna.
 * @property {string} email - Email pengguna.
 *   @property {string} angkatan - angkatan user
     * @property {string} fakultas - fakultas kuliah user
     * @property {string} departemen - departemen atau bidang kader
     * @property {string} wilayah - berisi pusat / fakultas
     * @property {string} amanah - berisi amanah dari kader
 */
