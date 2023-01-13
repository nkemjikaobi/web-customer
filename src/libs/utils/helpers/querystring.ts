/**
 * QueryString library
 */
class QueryString {
  /**
   * @description stringify object into a queryString
   * @param queryObj
   * @returns {string}
   */
  stringify(queryObj: any) {
    let str = "";

    // eslint-disable-next-line no-unused-vars
    for (const i in queryObj) {
      if (!Array.isArray(queryObj[i])) {
        str = str + `${i}=${queryObj[i]}&`;
      } else {
        //take care of foo:[] type situations
        const ObjArr = queryObj[i];
        let ObjString = "";
        for (let j = 0; j < ObjArr.length; j++) {
          ObjString = ObjString + `${i}=${ObjArr[j]}&`;
        }

        str = str + `${ObjString}`;
      }
    }

    //ending '&'
    str = str.replace(/\&$/, "");

    return str;
  }

  /**
   * @description parse query string into an object
   * @param str {String}
   */
  parse(str: string) {
    let check: any;
    const result: any = {};

    if (str) {
      //do regex operations on string to convert it into a two dimensional array
      const output = str
        .replace(/^\?/gi, "")
        .split("&")
        .map((item) => {
          return item.split("=");
        });

      output.forEach(function (item) {
        const key: string = item[0];
        const value: string = item[1];

        if (check !== key && typeof result[key] === "undefined") {
          result[key] = value;
          check = key;
        } else {
          //take care of foo=1&foo=3 or foo=1&bar=2&foo=3 type situations
          //instant type conversion to array here only if it hasn't been converted to an array already
          if (!Array.isArray(result[key])) {
            const placeholder = result[key]; //save reference to string value to be used for type casting
            result[key] = [placeholder];
          }

          result[key].push(value);
        }
      });
    }

    return result;
  }
}

export default new QueryString();
