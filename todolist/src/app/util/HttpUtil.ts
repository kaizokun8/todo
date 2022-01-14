export class HttpUtil {

  public static fromClassToQueryParams(o: Object) {

    let query: Array<string> = [];

    Object.keys(o).forEach((key) => {

      let value = o[key as keyof Object];

      if (!value) {
        return;
      }

      if (Array.isArray(value)) {

        value.forEach((v) => query.push(encodeURIComponent(key) + "=" + encodeURIComponent(v)));

      } else if (typeof value === 'object') {

        query.push(this.fromClassToQueryParams(value));

      } else if (['string', 'boolean', 'number'].includes(typeof value)) {

        query.push(encodeURIComponent(key) + "=" + encodeURIComponent(value + ""))
      }
    })
    return query.join("&");
  }
}
