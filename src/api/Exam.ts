import { Entity, createResource } from '@rest-hooks/rest';
import { Duration } from 'luxon';
import AuthdEndpoint from './AuthdEndpoint';

export class Exam extends Entity {
  examId = '';
  courseCode = '';
  startDateTime = '';
  isoDuration = '';
  instructorId = '';
  location: string[] = [];
  proctorsRequested: string[] = [];
  proctorsConfirmed: string[] = [];

  pk() {
    return this.examId; // TODO: correct?
  }

  get duration() {
    return Duration.fromISO(this.isoDuration);
  }

  static override key = 'Exam';
}

export const ExamResource = createResource({
  urlPrefix: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com',
  path: '/exams/:id',
  schema: Exam,

  Endpoint: AuthdEndpoint,
});
