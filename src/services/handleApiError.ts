import { AxiosError } from "axios";

export interface IError {
  errorMessage: string;
  errorCode: number;
}

interface IErrorResponseData {
  message: string;
}

export const handleApiError = (
  error: AxiosError<IErrorResponseData>
): IError => {
  if (error.response && error.response.status) {
    const errorMessage = error.response.data?.message || "Unknown error";

    const errorCode = error.response.status;
    return { errorMessage, errorCode };
  } else {
    return { errorMessage: "Server error", errorCode: 500 };
  }
};
