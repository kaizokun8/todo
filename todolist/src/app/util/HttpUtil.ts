import {HttpParams} from "@angular/common/http";
import {ParamMap} from "@angular/router";

export class HttpUtil {

  private static toParams(o: Object, mapper: Function, ignoreKeys: Set<string>) {

    Object.keys(o).forEach((key) => {

      let value = o[key as keyof Object];

      if (!value || ignoreKeys?.has(key)) {
        return;
      }

      if (Array.isArray(value)) {

        value.forEach((v) => {
          if (['string', 'boolean', 'number'].includes(typeof v)) {
            mapper(key, v);
          }
        });
      } else if (['string', 'boolean', 'number'].includes(typeof value)) {
        mapper(key, value);
      }
    })

  }

  /**
   * <pre>
   * transforme un objet en queryParams, les clés de l'objet sont utilisées entant que clé de paramètres,
   * les types autorisés sont string, boolean, number, array,
   * Pour un tableau les valeurs peuvent être des types string, boolean, number ou enum
   * (type de la valeur associé à la clé de l'enum = object javascript)
   * </pre>
   * */
  public static toQueryParams(o: Object, ignoreKeys: Set<string>): string {

    let query: Array<string> = [];

    this.toParams(o, (k: any, v: any) => query.push(encodeURIComponent(k) + "=" + encodeURIComponent(v)), ignoreKeys)

    return query.join("&");
  }

  public static toHttpParams(o: Object, ignoreKeys: Set<string>): HttpParams {

    let params = new HttpParams();

    this.toParams(o, (k: any, v: any) => params.set(k, v), ignoreKeys);

    return params;
  }

  public static fromParamMapToObject(paramMap: ParamMap): { [k: string]: any } {

    let params: { [k: string]: any } = {};

    paramMap.keys.forEach((key) => params[key] = paramMap.getAll(key));

    return params;
  }

}
