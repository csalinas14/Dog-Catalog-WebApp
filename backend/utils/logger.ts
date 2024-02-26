const error = (err: Error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
};

export default {
  error
};
