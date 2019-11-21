import AppleHealthKit from 'rn-apple-healthkit';

export var stepCount = '';
export var wantedSteps = '';
export var success = 'false';

const options = {
  permissions: {
    read: ['Steps'],
    write: []
  }
};

AppleHealthKit.initHealthKit(options, (err, results) => {
  if (err) {
    console.log('error initializing Healthkit: ', err);
    return;
  }

  AppleHealthKit.getStepCount(null, (err, results) => {
    // console.log(results);
    stepCount = results.value;
  });
});

export function CompareSteps(stepCount, wantedSteps) {
  if (stepCount < wantedSteps) {
    return 'Kein Erfolg!';
  }
  return 'Du warst erfolgreich!';
}
