import { Entity, createResource } from '@rest-hooks/rest';
import { Duration } from 'luxon';
import AuthdEndpoint from './AuthdEndpoint';

// TODO: correct optionals?
export interface ScheduledExamLike {
  examId?: string;
  courseCode?: string;
  startDateTime?: string;
  isoDuration?: string;
  instructorId?: string;
  // locations?: string[];
  locations: { roomName: string }[]; // TODO correct?
  proctorsRequested?: string[];
  proctorsConfirmed?: string[];
}

export class ScheduledExam extends Entity implements ScheduledExamLike {
  examId = '';
  courseCode = '';
  startDateTime = '';
  isoDuration = '';
  // locations: string[] = [];
  locations: { roomName: string }[] = []; // TODO correct?
  proctorsRequested: string[] = [];
  proctorsConfirmed: string[] = [];

  override pk() {
    return this.examId;
  }

  get duration() {
    return Duration.fromISO(this.isoDuration);
  }

  static override key = 'ScheduledExam';
}

export const ScheduledExamResource = createResource({
  urlPrefix: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com',
  path: '/exams/:examId',
  searchParams: {} as
    | { date?: string; instructorId?: string; getAll?: boolean }
    | undefined,

  schema: ScheduledExam,

  Endpoint: AuthdEndpoint,
});
