// TODO: startTime vs startDateTime?
// TODO: how do proctors work for this? proctorsRequested = array?
// TODO: fix temp room location logic

import { CalendarIcon, InputIcon, PersonIcon } from '@radix-ui/react-icons';
// import type { Exam } from 'api/Exam';
import type { ExamRequest } from 'api/ExamRequest';

import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../components/Button';
import DateInput from '../components/FormInput/DateInput';
import DurationInput from '../components/FormInput/DurationInput';
import NumericInput from '../components/FormInput/NumericInput';
import TextInput from '../components/FormInput/TextInput';
import TimeInput from '../components/FormInput/TimeInput';
import PageHeader from '../components/PageHeader';

// TODO -> missing API?
interface Props {
  initialValues: ExamRequest;
  onSubmit: SubmitHandler<ExamRequest>;
}

export default function AddExamSlot({ initialValues, onSubmit }: Props) {
  const methods = useForm<ExamRequest>({
    defaultValues: { ...initialValues },
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
          </div>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <DateInput
              labelText="Date"
              inputName="startDateTime"
              labelIcon={CalendarIcon}
            />

            <TimeInput labelText="Start Time" inputName="startTime" />
          </div>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <DurationInput
              labelText="Duration (minutes)"
              inputName="isoDuration"
              stepValue={15}
            />

            <NumericInput
              labelText="Proctors"
              inputName="numProctorsRequested"
              labelIcon={PersonIcon}
            />
          </div>

          <div className="inline-flex h-24 w-full flex-col">
            <div className="inline-flex w-full">
              <TextInput labelText="Room" inputName="location.0" />
            </div>
          </div>

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
