// TODO: startTime vs startDateTime?
// TODO: how do proctors work for this? proctorsRequested = array?
// TODO: fix temp room location logic
// TODO: num students?  DB/front end potential mismatch
// TODO: refactor to use separate Date and Time inputs (better match Figma)

import { CalendarIcon, InputIcon, PersonIcon } from '@radix-ui/react-icons';
import type { Exam } from 'api/Exam';
import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from './Button';
import DateTimeInput from './FormInput/DateTimeInput';
import DurationInput from './FormInput/DurationInput';
import NumericInput from './FormInput/NumericInput';
import TextInput from './FormInput/TextInput';
import PageHeader from './PageHeader';

// TODO -> missing API?
interface Props {
  initialValues: Exam;
  onSubmit: SubmitHandler<Exam>;
}

export default function AddExamSlot({ initialValues, onSubmit }: Props) {
  const methods = useForm<Exam>({
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
            {/* <div className="inline-flex w-full"> */}
            <TextInput labelText="Room" inputName="location.0" />
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

          {/* <div className="inline-flex h-24 w-full flex-col"></div> */}

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
