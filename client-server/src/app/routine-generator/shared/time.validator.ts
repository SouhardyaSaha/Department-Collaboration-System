import { AbstractControl } from '@angular/forms';
import { values } from 'sequelize/types/lib/operators';

export function TimeValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');
  const Time1 = startTime.value,
    Time2 = endTime.value;
  console.log(Time1, Time2);
  if (Time1 == null || Time2 == null) {
    return null;
  }
  let period = Time1.split(' ');
  let values1 = 0,
    values2 = 0;
  if (period[1] == 'PM') {
    period = period[0].split(':');
    if (period[0] != '12') values1 = Number(period[0]) + 12;
    else values1 = Number(period[0]);
  } else {
    period = period[0].split(':');
    values1 = Number(period[0]);
  }
  period = Time2.split(' ');
  if (period[1] == 'PM') {
    period = period[0].split(':');
    if (period[0] != '12') values2 = Number(period[0]) + 12;
    else values2 = Number(period[0]);
  } else {
    period = period[0].split(':');
    values2 = Number(period[0]);
  }

  // console.log(values1,values2);
  if (
    values1 < 8 ||
    values1 > 17 ||
    values2 < 8 ||
    values2 > 17 ||
    values1 >= values2
  ) {
    return { match: true };
  } else {
    return null;
  }
}
