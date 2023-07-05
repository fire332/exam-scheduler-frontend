import { Entity, createResource } from '@rest-hooks/rest';
import AuthdEndpoint from './AuthdEndpoint';

interface TimeRange {
  startTime: number;
  endTime: number;
}

export class ExamRequest extends Entity {
  requestId = '';
  courseCode = '';
  instructorId = '';
  studentCount = 0;
  examDatePreferences: TimeRange[] = [];

  pk() {
    return this.requestId;
  }
  static key = 'ExamRequest';
}

export const ExamRequestResource = createResource({
  urlPrefix: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com',
  path: '/examRequest/:id',
  schema: ExamRequest,

  Endpoint: AuthdEndpoint
});
