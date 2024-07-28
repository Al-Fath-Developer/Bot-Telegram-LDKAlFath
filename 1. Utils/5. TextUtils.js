
const TextUtils = {
  regex_template: /\[([^\]]*?)\]/g,

  /**
   * Mengambil hasil regex dan memvalidasi dengan template jika ada
   * @param {String} raw - Input pengguna
   * @param {String} [template] - Template opsional untuk validasi
   * @returns {Array} - Hasil ekstraksi regex
   * @throws {UserInputError} - Jika input tidak sesuai dengan template
   */
  getRegexResult(raw, template = null) {
    let match;
    const regex = TextUtils.regex_template;
    const result = [];

    while ((match = regex.exec(raw)) !== null) {
      result.push(match[1]);
    }

    if (template) {
      const templateParts = template.match(TextUtils.regex_template);
      
      if (!templateParts || result.length !== templateParts.length) {
        throw new UserInputError(`Jumlah jawaban tidak sesuai dengan template. Anda baru memasukkan ${result.length} jawaban yang seharusnya ada ${templateParts.length} jawaban. Catatan: Setiap jawaban harus berada dalam kurung siku`);
      }

      for (let i = 0; i < result.length; i++) {
        if (result[i].trim() === "") {
          throw new UserInputError(`Jawaban ke-${i + 1} tidak boleh kosong.`);
        }

        const expectedFormat = this.getExpectedFormat(templateParts[i].slice(1, -1));
        if (!this.validateFormat(result[i], expectedFormat)) {
          throw new UserInputError(`Format jawaban ke-${i + 1} tidak sesuai. Diharapkan: ${expectedFormat}`);
        }else{
          if (expectedFormat == "nomor"){
            result[i] = parseInt(result[i])
          }
        }
      }
    }

    return result;
  },

  /**
   * Mendapatkan format yang diharapkan dari contoh template
   * @param {String} example - Contoh dalam template
   * @returns {String} - Format yang diharapkan
   */
  getExpectedFormat(example) {
    if (/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/.test(example)) return "link";
    if (/^\d+$/.test(example)) return "nomor";
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(example)) return "email";
    return "teks";
  },

  /**
   * Memvalidasi format input
   * @param {String} input - Input pengguna
   * @param {String} expectedFormat - Format yang diharapkan
   * @returns {Boolean} - Hasil validasi
   */
  validateFormat(input, expectedFormat) {
    switch (expectedFormat) {
      case "link":
        return /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/.test(input);
      case "nomor":
        return /^\d+$/.test(input);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
      case "teks":
      default:
        return true;
    }
  },

  /**
   * Fungsi untuk memisahkan kata pertama menjadi satu entitas sendiri dan kata kedua dan berikutnya menjadi satu kesatuan 
   * @param {String} str 
   * @returns {Array}
   */
  pisahKataPertama(str) {
    // Memisahkan string berdasarkan spasi
    let kata = str.split(' ');
    
    // Ambil kata pertama
    let kataPertama = kata[0].trim();
    
    // Gabungkan kata-kata berikutnya
    let kataBerikutnya = kata.slice(1).join(' ').trim();
    
    return [kataPertama, kataBerikutnya];
  },

  /**
   * Fungsi untuk memisahkan kode nomor surat, contoh: SRT-002/xxx/xxx menjadi ['SRT-002', '/xxx/xxx] 
   * @param {String} str 
   * @returns {Array}
   */
  pisahKodeNomorSurat(str) {
    // Memisahkan string berdasarkan spasi
    let kode = str.split('/');
    if (kode[1] !=null){

        
        // Ambil kode pertama
    let kodePertama = kode[0].trim();
    
    // Gabungkan kode-kode berikutnya
    let kodeBerikutnya = kode.slice(1).join('/').trim();
    kodeBerikutnya = "/" + kodeBerikutnya
    
    return [kodePertama, kodeBerikutnya];
  }else{
    kode = str.split("_")
         // Ambil kode pertama
         let kodePertama = kode[0].trim();
    
         // Gabungkan kode-kode berikutnya
         let kodeBerikutnya = kode.slice(1).join('_').trim();
         kodeBerikutnya = "_" + kodeBerikutnya
    return [kodePertama, kodeBerikutnya];

  }
}
}

function testTextUtils() {
    try {
        // Dengan template yang sesuai, termasuk berbagai format link
        const result = TextUtils.getRegexResult(
          "Link1 [https://example.com] Link2 [http://test.org] Link3 [google.com] nomor [42] email [user@example.com] teks [Halo dunia]",
          "Link1 [https://translate.google.com] Link2 [http://facebook.com] Link3 [twitter.com] nomor [10] email [coba@gmail.com] teks [halo semua]"
        );
        console.log(result); 
        // ["https://example.com", "http://test.org", "google.com", "42", "user@example.com", "Halo dunia"]
      
        // Dengan format link yang tidak valid
        TextUtils.getRegexResult(
          "Link [example..com]",
          "Link [https://example.com]"
        ); // Akan melempar UserInputError
      
      } catch (error) {
        if (error instanceof UserInputError) {
          console.error("Kesalahan input pengguna:", error.message);
        } else {
          console.error("Terjadi kesalahan:", error);
        }
      }
    
}
Logger.log("Loaded TextUtils.js" + (new Date() - startTime) + "ms");