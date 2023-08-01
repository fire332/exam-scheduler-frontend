import { Entity, createResource } from '@rest-hooks/rest';
import { DateTime, Duration } from 'luxon';
import AuthdEndpoint from './AuthdEndpoint';

export class ExamRequest extends Entity {
  requestId = '';
  courseCode = '';
  instructorId = '';
  studentCount = 0;
  isoDuration = '';
  isoDatePrefs: string[] = [];

  pk() {
    return this.requestId;
  }

  get duration() {
    return Duration.fromISO(this.isoDuration);
  }

  get datePreferences() {
    return this.isoDatePrefs.map((isoStr) =>
      DateTime.fromISO(isoStr, { setZone: true }),
    );
  }

  static override key = 'ExamRequest';
}

export const ExamRequestResource = createResource({
  urlPrefix: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com',
  path: '/examRequest/:id',
  schema: ExamRequest,

  Endpoint: AuthdEndpoint,
});
