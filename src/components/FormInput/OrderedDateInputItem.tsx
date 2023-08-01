import { DragHandleDots2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Reorder, useDragControls } from 'framer-motion';
import { useCallback, type DOMAttributes } from 'react';
import Date, { type DateInfo } from '../Date';

type OnPointerDown = Exclude<
  DOMAttributes<HTMLDivElement>['onPointerDown'],
  undefined
>;

interface Props {
  value?: DateInfo;
  dragHandlePointerDown?: OnPointerDown;
}

export default function OrderedDate({ value }: Props) {
  const controls = useDragControls();

  const dragHandlePointerDown = useCallback<OnPointerDown>(
    (evt) => {
      controls.start(evt);
    },
    [controls],
  );

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      className="flex h-12 w-full min-w-fit items-stretch justify-between rounded bg-gray-50 shadow [&>*]:flex [&>*]:items-center [&>*]:justify-center"
    >
      <div onPointerDown={dragHandlePointerDown} className="w-12">
        <DragHandleDots2Icon height="20" width="20" />
      </div>
      <div className="flex-grow">
        <Date showIcon value={value} />
      </div>
      <button className="group w-12">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-surface-100 group-hover:text-surface-800">
          <Pencil1Icon height="20" width="20" />
        </div>
      </button>
    </Reorder.Item>
  );
}
