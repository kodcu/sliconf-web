export default class Validator {

   // girilen len değerinden küçük veya eşit uzunlukta olması halinde true döner
   static maxLen(len, value) {
      return value.length <= len
   }

   // girilen len değerinden büyük veya eşit uzunlukta olması halinde true döner
   static minLen(len, value) {
      return value.length >= len
   }

   // minLen(len,value) ve maxLen(len,value) değerleri aynı anda kontrol etmek için birleştirilmiş metod
   static minMaxLen(minLen, maxLen, value) {
      return Validator.minLen(minLen, value) && Validator.maxLen(maxLen, value)
   }
}