import type { Icon } from '@radix-ui/react-icons';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

interface Props {
  expanded?: boolean;
  active?: boolean;
  shortText: string;
  longText: string;
  icon?: Icon;
}

function NavItem({
  expanded,
  active,
  shortText,
  longText,
  icon = DotFilledIcon,
}: Props) {
  const NavIcon = motion(icon);

  const activeMarker = active && (
    <motion.div
      layout
      layoutId="navitem-activemarker"
      className="absolute inset-0 -z-10 bg-primary-200"
      style={{
        borderRadius:
          '9999px' /* equivalent to tailwind rounded-full; needed for framer motion compensation */,
      }}
    />
  );

  return (
    <motion.li
      layout
      className={
        'relative flex h-14 list-none items-center text-surface-800' +
        ' ' +
        (expanded ? 'w-full gap-x-3 px-4 py-1' : 'flex-col gap-y-1')
      }
    >
      {expanded && activeMarker}
      <motion.div
        layout
        className={
          'relative flex items-center justify-center' +
          ' ' +
          (expanded ? 'inline-block' : 'h-8 w-14')
        }
      >
        {!expanded && activeMarker}
        <NavIcon layout width="24" height="24" />
      </motion.div>
      <motion.div
        layout
        className={
          'font-bold' + ' ' + (expanded ? 'inline-block text-sm' : 'text-xs')
        }
      >
        {expanded ? longText : shortText}
      </motion.div>
    </motion.li>
  );
}

export default NavItem;
