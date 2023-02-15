const constants = () => {
  const appStatus = {
    BAD_REQUEST: 400,
    OK: 200,
    NOT_FOUND: 404,
    CREATED: 201,
    SERVER_ERROR: 500,
  };

  return {
    appStatus,
  };
};

module.exports = constants;
