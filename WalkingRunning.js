import AppleHealthKit from 'rn-apple-healthkit';

export var distanceCount = '';
export var wantedDistance = '';
export var success = 'false';

const d = new Date(2019, 10, 19);

const permissions = {
  permissions: {
    read: ['DistanceWalkingRunning'],
    write: []
  }
  // date: d.toISOString()
  //   startDate: new Date(2019, 11, 10).toISOString(),
  //   endDate: new Date().toISOString()
};

const options = {
  date: d.toISOString(),
  unit: 'mile'
};

AppleHealthKit.initHealthKit(permissions, (err, results) => {
  if (err) {
    console.log('error initializing Healthkit: ', err);
    return;
  }

  AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
    console.log(results);
    console.log(d);
    distanceCount = results.value;
  });
});

export function CompareDistance(distanceCount, wantedDistance) {
  if (distanceCount < wantedDistance) {
    return 'Kein Erfolg!';
  }
  return 'Du warst erfolgreich!';
}
