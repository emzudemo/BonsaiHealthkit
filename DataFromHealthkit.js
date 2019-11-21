import AppleHealthKit from 'rn-apple-healthkit';

// export var workoutData = [];

const options = {
  permissions: {
    read: ['Walking'],
    write: []
  },
  startDate: new Date(2019, 11, 10).toISOString(),
  endDate: new Date().toISOString(),
  type: 'Walking'
};

AppleHealthKit.initHealthKit(options, (err, results) => {
  if (err) {
    console.log('error initializing Healthkit: ', err);
    return;
  }

  AppleHealthKit.getSamples(null, (err, results) => {
    console.log(results);
    // workoutData = results.value;
  });
});
