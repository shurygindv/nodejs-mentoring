import { HttpStatusCode } from "../http/http-status-code";

const Status = <TEnum, TResponse>(status: TEnum, data: TResponse) => {
    
}

const Success = <TResponse>(ok: boolean, data: TResponse, statusCode: HttpStatusCode) => {

}

const StatusWithValidationErrors = <TEnum> (en: TEnum, errors: Record<string, string>) => {
    
}

export {
    Status,
    Success,
    StatusWithValidationErrors
};