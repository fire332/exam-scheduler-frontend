import type { Decorator } from '@storybook/react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<S, M> {
  story: S;
  methods: M;
}

type PartialStoryFn<StoryArgs> = Parameters<Decorator<StoryArgs>>[0];

export default function FormStoryWrapper<StoryArgs, FV extends FieldValues>({
  story,
  methods,
}: Props<PartialStoryFn<StoryArgs>, UseFormReturn<FV>>) {
  const Story = story;

  return (
    <FormProvider {...methods}>
      <form className="flex h-60 w-[360px] min-w-fit resize-x flex-col items-stretch justify-center overflow-auto bg-white p-8">
        <Story />
      </form>
    </FormProvider>
  );
}
