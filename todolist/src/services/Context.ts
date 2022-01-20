import {HttpContextToken} from "@angular/common/http";

export const SHOULD_NOT_HANDLE_ERROR = new HttpContextToken<boolean>(() => false);

