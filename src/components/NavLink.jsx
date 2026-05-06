import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { resolveLink } from '@/lib/links';

const NavLink = ({ blok }) => {
	const href = resolveLink(blok.link);
	const isExternal = /^https?:\/\//.test(href);
	const cls = 'text-base hover:text-teal transition-colors';
	return isExternal ? (
		<a href={href} className={cls} {...storyblokEditable(blok)}>
			{blok.label}
		</a>
	) : (
		<Link href={href} className={cls} {...storyblokEditable(blok)}>
			{blok.label}
		</Link>
	);
};

export default NavLink;
