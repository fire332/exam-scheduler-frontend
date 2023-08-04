import { InputIcon } from '@radix-ui/react-icons';
import type { ExamRequest, ExamRequestLike } from 'api/ExamRequest';
import OrderedDateInput from 'components/FormInput/OrderedDateInput';
import PageHeader from 'components/PageHeader';
import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../Button';
import DurationInput from '../FormInput/DurationInput';
import NumericInput from '../FormInput/NumericInput';
import TextInput from '../FormInput/TextInput';

interface Props {
  examRequest?: ExamRequest;
  onSubmit: SubmitHandler<ExamRequestLike>;
}

export default function RequestExamSlot({ examRequest, onSubmit }: Props) {
  const defaultValues = Object.assign({}, examRequest);
  defaultValues.isoDuration =
    examRequest?.duration.shiftTo('minutes').minutes.toString() ?? '60';
  // @ts-expect-error TODO: NO TIME
  defaultValues.isoDatePrefs = examRequest?.datePreferences.map((date) =>
    date.toFormat('yyyy-LL-dd'),
  ) ?? [undefined, undefined, undefined];

  const methods = useForm<ExamRequestLike>({
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
          <PageHeader to="/exam-requests">Request exam slot</PageHeader>

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

          <div className="inline-flex h-64 w-[532px] flex-col">
            <OrderedDateInput labelText="Dates" inputName="isoDatePrefs" />
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
