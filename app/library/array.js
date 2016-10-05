/**
 * Created by Vu Tien Dinh on 10/4/2016.
 */
module.exports = {
  group: function (arr, key) {
      if(arr == null || arr.length == 0)
          return null;
      var result = [];
      for(var i=0; i<arr.length; i++) {
          item = arr[i];
          if(typeof item[key] === 'undefined')
              continue;
          key_value = item[key];

          if(typeof result[key_value] === 'undefined')
              result[key_value] = [];
          result[key_value].push(item);
      }
      return result;
  }
};