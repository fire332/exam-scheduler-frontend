import { Entity, createResource } from '@rest-hooks/rest';
import { DateTime, Duration } from 'luxon';
import AuthdEndpoint from './AuthdEndpoint';

export interface ExamRequestLike {
  requestId?: string;
  courseCode: string;
  instructorId: string;
  studentCount: number;
  isoDuration: string;
  isoDatePrefs: string[];
}

export class ExamRequest extends Entity implements ExamRequestLike {
  requestId = '';
  courseCode = '';
  instructorId = '';
  studentCount = 0;
  isoDuration = '';
  isoDatePrefs: string[] = [];

  override pk() {
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
