import { DotFilledIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { motion } from 'framer-motion';
import type { ComponentProps, ComponentType } from 'react';

interface Props {
  expanded?: boolean;
  active?: boolean;
  shortText: string;
  longText: string;
  icon?: ComponentType<
    ComponentProps<
      React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    >
  >;
}

function NavItem({
  expanded,
  active,
  shortText,
  longText,
  icon = DotFilledIcon,
}: Props) {
  const NavIcon = motion(icon);

  return (
    <motion.li
      layout
      className={
        'flex h-14 list-none items-center rounded-full' +
        ' ' +
        (expanded
          ? `w-full gap-x-3 px-4 py-1 ${active ? 'bg-primary-200' : ''}`
          : 'w-[6rem] flex-col gap-y-1')
      }
    >
      <motion.div
        layout
        className={
          'flex items-center justify-center rounded-full' +
          ' ' +
          (expanded
            ? 'inline-block'
            : `h-8 w-14 ${active ? 'bg-primary-200' : ''}`)
        }
      >
        <NavIcon
          layout
          width="24"
          height="24"
          color="color(display-p3 0.11 0.137 0.192)"
        />
      </motion.div>
      <motion.div
        layout
        className={
          'font-bold text-surface-800' +
          ' ' +
          (expanded ? 'inline-block text-sm' : 'text-xs')
        }
      >
        {expanded ? longText : shortText}
      </motion.div>
    </motion.li>
  );
}

export default NavItem;
