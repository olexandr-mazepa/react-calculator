
const errors = {
  missing_required_query_param: {
    message: 'A required query parameter was not specified for this request.'
  },
  invalid_query_param_value: {
    message: 'An invalid value was specified for one of the query parameters in the request URI.'
  },
  invalid_input_data: {
    message: 'The data in the request could not be parsed.'
  },
  invalid_input_value: {
    message: 'Input value is not valid.'
  },
  resource_not_found: {
    message: 'The specified resource does not exist.'
  },
  internal_server_error: {
    message: 'The server encountered an internal error. Please retry the request.'
  }
};

function getErrorMessage(code) {

  return (errors[code] && errors[code].message) ? errors[code].message : '';
}

module.exports = () => (req, res, next) => {
  /**
 * Not found resource
 *
 * @param resource
 * @returns {*}
 */
  res.notFound = function(resource) {

    return res.status(404).send({
      error: {
        code: 'resource_not_found',
        message: getErrorMessage('resource_not_found'),
        field: resource
      }

    });

  };

  /**
   * Internal server error
   *
   * @param error
   * @returns {*}
   */
  res.serverError = function(error) {

    req.app.logger.error(error);

    return res.status(500).send({
      error: {
        code: 'internal_server_error',
        message: getErrorMessage('internal_server_error')
      }
    });

  };

  res.invalidRequest = function(errorMessage) {

    return res.status(400).send({
      error: {
        code: 'invalid_request',
        message: errorMessage
      }
    });

  };
  next();
};
