export interface IContent {}

export interface IResponse {
    result: 'success' | 'fail',
    content: IContent,
}

export interface ISuccessContent {
    [props: string]: string,
};

export interface IFailContent extends IContent {
    errCode: number,
};

export interface ISuccessResponse extends IResponse {
    result: 'success',
    content: ISuccessContent,
};

export interface IFailResponse extends IResponse {
    result: 'fail',
    content: IFailContent,
};
