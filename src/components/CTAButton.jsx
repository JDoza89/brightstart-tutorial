import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { resolveLink } from '@/lib/links';

const styles = {
	primary: 'bg-black text-white hover:opacity-90',
	ghost: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
};

const CTAButton = ({ blok }) => {
	const href = resolveLink(blok.link);
	const cls = `inline-flex items-center px-6 py-3.5 rounded-xl font-semibold text-base transition-colors ${styles[blok.style] || styles.primary}`;
	const isExternal = /^https?:\/\//.test(href);

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

export default CTAButton;
