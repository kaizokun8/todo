import {HttpContextToken} from "@angular/common/http";

export const SHOULD_NOT_HANDLE_ERROR = new HttpContextToken<boolean>(() => false);
export const SHOULD_NOT_HANDLE_OAUTH2_SECURITY = new HttpContextToken<boolean>(() => false);
