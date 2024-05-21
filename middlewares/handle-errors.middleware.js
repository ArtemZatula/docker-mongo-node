export function handleErrors(err, req, res, next) {
  console.error(err.stack);
  res.status(400).json({
    status: 'failure',
    message: err.message || 'An unexpected error occurred',
  });
}