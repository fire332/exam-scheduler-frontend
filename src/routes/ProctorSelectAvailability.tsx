// TODO: correct parsing of date times?
// TODO: refactor this page entirely

import type { Proctor } from 'api/Proctor';
import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../components/Button';
import DateTimeInput from '../components/FormInput/DateTimeInput';
import PageHeader from '../components/PageHeader';

interface Props {
  initialValues: Proctor; // TODO -> API finish
  onSubmit: SubmitHandler<Proctor>;
}

export default function ProctorSelectAvailability({
  initialValues,
  onSubmit,
}: Props) {
  const methods = useForm<Proctor>({
    // TODO
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
          <PageHeader>Add non-available period</PageHeader>

          <div className="inline-flex h-24 w-full flex-row gap-x-9">
            <DateTimeInput labelText="Start" inputName="isoDatePrefs.0" />

            <DateTimeInput labelText="End" inputName="isoDatePrefs.1" />
          </div>

          <div className="inline-flex w-full flex-row-reverse">
            <div className="inline-flex h-9 w-36">
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
