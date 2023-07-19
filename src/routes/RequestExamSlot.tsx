import { CalendarIcon, InputIcon } from '@radix-ui/react-icons';
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
import PageHeader from '../components/PageHeader';

interface Props {
  initialValues: ExamRequest;
  onSubmit: SubmitHandler<ExamRequest>;
}

export default function RequestExamSlot({ initialValues, onSubmit }: Props) {
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
          <PageHeader>Request exam slot</PageHeader>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <TextInput
              labelText="Course Code"
              inputName="courseCode"
              labelIcon={InputIcon}
            />

            <DurationInput
              labelText="Duration (minutes)"
              inputName="isoDuration"
              stepValue={15}
            />
          </div>

          <div className="inline-flex h-24 w-full">
            <NumericInput labelText="Students" inputName="studentCount" />
          </div>

          <div className="inline-flex h-64 w-full flex-col">
            <div className="inline-flex w-full">
              <DateInput
                labelText="Date Preference 1"
                inputName="isoDatePrefs.0"
                labelIcon={CalendarIcon}
              />
            </div>
            <div className="inline-flex w-full">
              <DateInput
                labelText="Date Preference 2"
                inputName="isoDatePrefs.1"
                labelIcon={CalendarIcon}
              />
            </div>
            <div className="inline-flex w-full">
              <DateInput
                labelText="Date Preference 3"
                inputName="isoDatePrefs.2"
                labelIcon={CalendarIcon}
              />
            </div>
          </div>

          <div className="inline-flex w-full flex-row-reverse">
            <div className="inline-flex h-9 w-36">
              <Button>Request Exam</Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
