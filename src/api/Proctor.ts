import { Entity, createResource } from '@rest-hooks/rest';
import AuthdEndpoint from './AuthdEndpoint';
import type { Exam } from './Exam';

let startAndEndTime: { start: string; end: string };

export class Proctor extends Entity {
  proctorId = '';

  availableTimes: (typeof startAndEndTime)[] = [];
  examsPending: Exam[] = []; // TODO: correct?
  examsConfirmed: Exam[] = [];

  pk() {
    return this.proctorId; // TODO: correct?
  }

  // get datePreferences() {
  //   return this.examsPending.map((isoStr) => DateTime.fromISO(isoStr, {}));
  // }

  static override key = 'Proctor';
}

export const ProctorResource = createResource({
  urlPrefix: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com',
  path: '/proctor/:id', // TODO correct?
  schema: Proctor,

  Endpoint: AuthdEndpoint,
});
