const Responses = async (response) => {
  try {
    return await response;
  } catch (e) {
    // eslint-disable-next-line no-return-await
    return await e.response;
  }
};

export default Responses;
