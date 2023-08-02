// TODO: startTime vs startDateTime?
// TODO: how do proctors work for this? proctorsRequested = array?
// TODO: fix temp room location logic
// TODO: num students?  DB/front end potential mismatch
// TODO: refactor to use separate Date and Time inputs (better match Figma)
// TODO: rename? -> ScheduleExam.tsx?

import {
  CalendarIcon,
  ChevronLeftIcon,
  InputIcon,
} from '@radix-ui/react-icons';
import { Link } from '@tanstack/router';
import type { ScheduledExam, ScheduledExamLike } from 'api/ScheduledExam';
import { DateTime } from 'luxon';
import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from './Button';
import ComboChipInput from './FormInput/ComboChipInput';
import DateTimeInput from './FormInput/DateTimeInput';
import DurationInput from './FormInput/DurationInput';
import TextInput from './FormInput/TextInput';

interface Props {
  scheduledExam?: ScheduledExam;
  onSubmit: SubmitHandler<ScheduledExamLike>;
}

export default function AddExamSlot({ scheduledExam, onSubmit }: Props) {
  const defaultValues: ScheduledExamLike = Object.assign(
    {
      // instructorId: '219195704583651585', // < - Default
      // instructorId: '221523240743338241', // <- Admin Andy
      instructorId: '221523781573673217', // <- Instructor Ivy
      proctorsRequested: [],
      proctorsConfirmed: [],
      locations: [],
    },
    scheduledExam,
  );
  defaultValues.isoDuration =
    scheduledExam?.duration.shiftTo('minutes').minutes.toString() ?? '60';

  defaultValues.startDateTime = scheduledExam
    ? DateTime.fromISO(scheduledExam.startDateTime).toISO()!.slice(0, 16)
    : undefined;

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
          <header className="inline-flex h-20 w-full flex-row items-center text-xl font-bold">
            <div>
              <Link
                className="inline-flex w-8 items-center justify-center"
                to="/scheduled-exams"
              >
                <ChevronLeftIcon width="24" height="24" />
              </Link>
            </div>
            <div className="inline-flex">Add exam slot</div>
          </header>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <TextInput
              labelText="Course Code"
              inputName="courseCode"
              labelIcon={InputIcon}
            />

            <DateTimeInput
              labelText="Date and Start Time"
              inputName="startDateTime"
              labelIcon={CalendarIcon}
            />
          </div>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <DurationInput
              labelText="Duration (minutes)"
              inputName="isoDuration"
              stepValue={15}
            />

            {/* <NumericInput
              labelText="Proctors"
              inputName="numProctorsRequested"
              labelIcon={PersonIcon}
            /> */}
          </div>

          <div className="inline-flex h-auto w-full flex-row gap-x-9">
            <ComboChipInput labelText="Room" inputName="locations" />
          </div>

          <div className="inline-flex w-full">
            <div className="inline-flex h-9 w-40">
              <Button>Add Exam</Button>
            </div>
          </div>

          <div className="inline-flex w-full">
            <div className="inline-flex h-9 w-40">
              <Link />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
