const IDLING = 0;
const DRYING = 1;
const MOVING = 2;
const PAUSED = 3;
const DRYER_STARTED = 4;
const UNKNOWN = 5;

const getStateName = (state) => {
  if (Math.abs(state) > UNKNOWN) return 'ERROR';
  return ['IDLING', 'DRYING', 'MOVING', 'PAUSED', 'DRYER ON', 'OFFLINE'][state];
};

const getDCMotorState = (state) => {
  if (state === IDLING) return 0;
  if (state === DRYING) return 1;
  if (state === PAUSED) return 2;
  if (state === MOVING) return 3;
  return 4;
};

const getDryerState = (state) => {
  if (state === IDLING) return 0;
  if (state === DRYER_STARTED) return 1;
  return 2;
};

export {
  IDLING,
  DRYING,
  MOVING,
  PAUSED,
  DRYER_STARTED,
  UNKNOWN,
  getStateName,
  getDCMotorState,
  getDryerState,
};