/* eslint no-useless-escape: 0 */
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

   // email kosullarini sagliyorsa true doner
   static isMail(value) {
      //WARNING
      let mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //var mailRegex = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return mailRegex.test(value)
   }
}