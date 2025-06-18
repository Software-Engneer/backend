// @desc    Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: 'Something went wrong!'
  });
}; 