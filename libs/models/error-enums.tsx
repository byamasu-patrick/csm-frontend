enum BaseError {
    NoError = 200,
    UnknownError = 500,
    ParameterError = 501
}

// must be in sync with ApiResponse return codes
enum AuthError {
    GenericAuthError = 1000,
    EmailNotConfirmed = 1001,
    WrongEmailOrPassword = 1002,
    UserAlreadyExists = 1003,
    TokenNotFound = 1004
}

export const ErrorEnum = { ...BaseError, ...AuthError };
export type ErrorEnum = keyof typeof ErrorEnum;