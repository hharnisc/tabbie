const analytics = (state = {}, action) => {
  console.log('action', action);
  switch (action.type) {
    // track certain events here with google analytics
    default:
      return state;
  }
};

export default analytics;
