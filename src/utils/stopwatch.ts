// https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b

export const formatNumberToStopwatch = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const formatStopwatchForDatabase = (timer: number) => {
  return formatNumberToStopwatch(timer).replaceAll(' ', '');
};

export const formatStopwatchFromDatabase = (stopwatchTime: string) => {
  return stopwatchTime.replaceAll(':', ' : ');
};
