const error = (err: Error) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
};

export default {
  error
};
