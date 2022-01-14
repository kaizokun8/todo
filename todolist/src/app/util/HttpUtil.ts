import {ParamMap} from "@angular/router";

export class HttpUtil {

  public static fromParamMaptoHttpParams(paramMap: ParamMap): { [k: string]: any } {

    let params: { [k: string]: any } = {};

    paramMap.keys.forEach((key) => params[key] = paramMap.getAll(key));

    return params;
  }
}
