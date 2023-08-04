import type { Icon } from '@radix-ui/react-icons';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Link, useRouter, type MakeLinkOptions } from '@tanstack/router';
import { motion } from 'framer-motion';

interface Props extends MakeLinkOptions {
  expanded?: boolean;
  active?: boolean;
  shortText: string;
  longText: string;
  icon?: Icon;
}

const ActiveMarker = (
  <motion.div
    layout
    layoutId="navitem-activemarker"
    className="absolute inset-0 bg-primary-200"
    style={{
      borderRadius:
        '9999px' /* equivalent to tailwind rounded-full; needed for framer motion compensation */,
    }}
  />
);

const MotionLink = motion<MakeLinkOptions>(Link);

function NavItem({
  expanded,
  active,
  shortText,
  longText,
  icon = DotFilledIcon,
  ...linkOpts
}: Props) {
  const router = useRouter();
  const NavIcon = motion(icon);

  const isActive = linkOpts.to
    ? router.state.resolvedLocation.pathname.startsWith(linkOpts.to)
    : active;

  const outerClassName =
    'relative flex items-center text-surface-800 min-h-[3.5rem]' +
    ' ' +
    (expanded ? 'w-full gap-x-3 px-4 py-1' : 'flex-col gap-y-1 pb-1');

  const inner = (
    <>
      {expanded && isActive && ActiveMarker}
      <motion.div
        layout
        className={
          'relative flex items-center justify-center' +
          ' ' +
          (expanded ? 'inline-block' : 'h-8 w-14')
        }
      >
        {!expanded && isActive && ActiveMarker}
        <NavIcon layout width="24" height="24" className="z-10" />
      </motion.div>
      <motion.div
        layout="position"
        className={
          'z-10 w-full break-words font-bold' +
          ' ' +
          (expanded ? 'inline-block text-sm' : 'text-center text-xs')
        }
      >
        <motion.span layout="size">
          {expanded ? longText : shortText}
        </motion.span>
      </motion.div>
    </>
  );

  return (
    <li className="contents">
      {linkOpts.to ? (
        // @ts-expect-error idk how to fix the type but it should work
        <MotionLink layout {...linkOpts} className={outerClassName}>
          {inner}
        </MotionLink>
      ) : (
        <motion.a layout className={outerClassName}>
          {inner}
        </motion.a>
      )}
    </li>
  );
}

export default NavItem;
