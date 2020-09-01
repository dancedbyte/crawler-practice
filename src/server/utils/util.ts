interface Result {
    success: boolean,
    errorMsg?: string,
    data: any
}

export const getResponseData = (data: any, errorMsg?: string): Result => {
    const isHasError = errorMsg ? {errorMsg} : {};

    return {
        success: !errorMsg,
        ...isHasError,
        data,
    }
};
