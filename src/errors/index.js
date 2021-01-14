module.exports = {
  USER_NOT_FOUND: {
    errors: {
      user: {
        name: 'Not found',
        message: 'User not found on database',
      }
    },
    code: 404,
  },
  BAD_REQUEST_FORMAT: {
    errors: {
      request: {
        name: 'Bad request',
        message: 'The request must be this format: { data: { title, content } }',
      }
    },
    code: 400,
  }
};
