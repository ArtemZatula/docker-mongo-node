export function handleErrors(err, req, res) {
  console.error(err.stack);
  res.status(400).json({
    status: 'failure',
    message: err.message || 'An unexpected error occurred',
  });
}