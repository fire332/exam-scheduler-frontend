import { DragHandleDots2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Reorder, useDragControls } from 'framer-motion';
import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactEventHandler,
} from 'react';
import { useCallback, useRef, type DOMAttributes } from 'react';
import Date, { type DateInfo } from '../Date';

type OnPointerDown = Exclude<
  DOMAttributes<HTMLDivElement>['onPointerDown'],
  undefined
>;

interface Props {
  value?: DateInfo;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ReactEventHandler<HTMLElement>;
}

export default function OrderedDate({ value, onChange, onBlur }: Props) {
  const controls = useDragControls();
  const inputRef = useRef<HTMLInputElement>(null);

  const dragHandlePointerDown = useCallback<OnPointerDown>(
    (evt) => {
      controls.start(evt);
    },
    [controls],
  );

  const triggerEdit = useCallback(() => {
    inputRef.current?.showPicker();
  }, []);

  return (
    <Reorder.Item
      value={value}
      tabIndex={0}
      dragListener={false}
      dragControls={controls}
      onBlur={onBlur}
      onKeyUp={useCallback<KeyboardEventHandler<HTMLLIElement>>(
        (evt) => {
          if (evt.key === 'Enter') triggerEdit();
        },
        [triggerEdit],
      )}
      className="relative flex h-12 w-full min-w-[16rem] items-stretch justify-between rounded bg-gray-50 shadow [&>*]:flex [&>*]:items-center [&>*]:justify-center"
    >
      <input
        type="date"
        ref={inputRef}
        className="invisible absolute inset-0"
        onChange={onChange}
      />
      <div
        onPointerDown={dragHandlePointerDown}
        onPointerUp={onBlur}
        className="w-12 touch-none"
      >
        <DragHandleDots2Icon height="20" width="20" />
      </div>
      <div className="flex-grow">
        <Date showIcon value={value} />
      </div>
      <button
        type="button"
        className="group w-12"
        onClick={triggerEdit}
        tabIndex={-1}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-surface-100 group-hover:text-surface-800">
          <Pencil1Icon height="20" width="20" />
        </div>
      </button>
    </Reorder.Item>
  );
}
