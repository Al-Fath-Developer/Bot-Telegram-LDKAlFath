class UserBuilder {
    constructor() {
        this.id_telegram = 0;
        this.nama_lengkap = "Fulan";
        this.nama_panggilan = null;
        this.nim = null;
        this.jenis_kelamin = null;
        this.email = null;
        this.angkatan = null;
        this.fakultas = null;
        this.departemen = null;
        this.wilayah = null;
        this.amanah = "Tamu";
    }

    /**
     * Set the Telegram ID.
     * @param {string} idTelegram - The Telegram ID.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setIdTelegram(idTelegram) {
        this.id_telegram = idTelegram;
        return this;
    }

    /**
     * Set the full name.
     * @param {string} namaLengkap - The full name.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setNamaLengkap(namaLengkap) {
        this.nama_lengkap = namaLengkap;
        return this;
    }

    /**
     * Set the nickname.
     * @param {string} namaPanggilan - The nickname.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setNamaPanggilan(namaPanggilan) {
        this.nama_panggilan = namaPanggilan;
        return this;
    }

    /**
     * Set the student ID number (NIM).
     * @param {string} nim - The student ID number.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setNim(nim) {
        this.nim = nim;
        return this;
    }

    /**
     * Set the gender.
     * @param {string} jenisKelamin - The gender.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setJenisKelamin(jenisKelamin) {
        this.jenis_kelamin = jenisKelamin;
        return this;
    }

    /**
     * Set the email address.
     * @param {string} email - The email address.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setEmail(email) {
        this.email = email;
        return this;
    }

    /**
     * Set the year of admission.
     * @param {string} angkatan - The year of admission.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setAngkatan(angkatan) {
        this.angkatan = angkatan;
        return this;
    }

    /**
     * Set the faculty.
     * @param {string} fakultas - The faculty.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setFakultas(fakultas) {
        this.fakultas = fakultas;
        return this;
    }

    /**
     * Set the department.
     * @param {string} departemen - The department.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setDepartemen(departemen) {
        this.departemen = departemen;
        return this;
    }

    /**
     * Set the region.
     * @param {string} wilayah - The region.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setWilayah(wilayah) {
        this.wilayah = wilayah;
        return this;
    }

    /**
     * Set the role or responsibility.
     * @param {string} amanah - The role or responsibility.
     * @returns {UserBuilder} The current instance of UserBuilder.
     */
    setAmanah(amanah) {
        this.amanah = amanah;
        return this;
    }
    build(){
        return new User(
            {
                id_telegram: this.id_telegram,
                nama_lengkap: this.nama_lengkap,
                nama_panggilan: this.nama_panggilan,
                nim: this.nim,
                jenis_kelamin: this.jenis_kelamin,
                email: this.email,
                angkatan: this.angkatan,
                fakultas: this.fakultas,
                departemen: this.departemen,
                wilayah: this.wilayah,
                amanah: this.amanah, 
            }
        )
    }
}
