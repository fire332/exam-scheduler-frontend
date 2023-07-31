// TODO: startTime vs startDateTime?
// TODO: how do proctors work for this? proctorsRequested = array?
// TODO: fix temp room location logic
// TODO: num students?  DB/front end potential mismatch
// TODO: refactor to use separate Date and Time inputs (better match Figma)
// TODO: rename? -> ScheduleExam.tsx?

import { CalendarIcon, InputIcon } from '@radix-ui/react-icons';
import type { ScheduledExam, ScheduledExamLike } from 'api/ScheduledExam';
import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from './Button';
import DateTimeInput from './FormInput/DateTimeInput';
import TextInput from './FormInput/TextInput';
import PageHeader from './PageHeader';

interface Props {
  scheduledExam?: ScheduledExam;
  onSubmit: SubmitHandler<ScheduledExamLike>;
}

export default function AddExamSlot({ scheduledExam, onSubmit }: Props) {
  const defaultValues = Object.assign(
    {
      // courseCode: 'CMPT276',
      startDateTime: '2023-09-07T15:30:00-0800',
      isoDuration: 'PT1H35M',
      // instructorId: '219195704583651585', // < - Default
      // instructorId: '221523240743338241', // <- Admin Andy
      instructorId: '221523781573673217', // <- Instructor Ivy
      // instructorId: undefined,
      locations: [{ roomName: 'DIS1 2020' }, { roomName: 'DIS1 2040' }],
      proctorsRequested: [
        // {
        //   proctorId: '219195704583651585',
        // },
      ],
      proctorsConfirmed: [],
    },
    scheduledExam,
  );
  // defaultValues.isoDuration =
  // scheduledExam?.duration.shiftTo('minutes').minutes.toString() ?? '60';

  // defaultValues.isoDatePrefs =
  //   examRequest?.datePreferences.map((date) => date.toFormat('yyyy-LL-dd')) ??
  //   [];

  const methods = useForm<ScheduledExamLike>({
    defaultValues,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      void methods.handleSubmit(onSubmit)(event);
    },
    [methods, onSubmit],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="inline-flex h-full w-full flex-col">
          <PageHeader>Add exam slot</PageHeader>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <TextInput
              labelText="Course Code"
              inputName="courseCode"
              labelIcon={InputIcon}
            />
            {/* <div className="inline-flex w-full"> */}
            {/* <TextInput labelText="Room" inputName="location.0" /> */}
            {/* </div> */}
          </div>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <DateTimeInput
              labelText="Date and Start Time"
              inputName="startDateTime"
              labelIcon={CalendarIcon}
            />
          </div>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            {/* <DurationInput
              labelText="Duration (minutes)"
              inputName="isoDuration"
              stepValue={15}
            />

            <TextInput labelText="Instructor ID" inputName="instructorId" /> */}

            {/* <NumericInput
              labelText="Proctors"
              inputName="numProctorsRequested"
              labelIcon={PersonIcon}
            /> */}
          </div>

          {/* <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <TextInput
              labelText="Proctors Requested"
              inputName="proctorsRequested.0"
            />
            <TextInput
              labelText="Proctors Confirmed"
              inputName="proctorsConfirmed.0"
            />
          </div> */}

          <div className="inline-flex w-full flex-row-reverse">
            <div className="inline-flex h-9 w-40">
              <Button>Add Exam</Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
