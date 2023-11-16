/* eslint-disable prettier/prettier */
const ResponseHelper = {
  successResponse: (data, message) => {
    return {
      success: true,
      data: data,
      message: message,
    };
  },
  errorResponse: (errorMessage, message) => {
    return {
      success: false,
      error: errorMessage,
      message: message,
    };
  },
};

export default ResponseHelper;
