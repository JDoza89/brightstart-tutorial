import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const SiteHeader = ({ blok }) => (
	<header
		className="sticky top-0 bg-white border-b border-border z-50"
		{...storyblokEditable(blok)}
	>
		<div className="px-16 h-21 py-5 flex items-center justify-between max-w-[1440px] mx-auto gap-8">
			<Link
				href="/"
				className="text-xl font-extrabold text-ink shrink-0"
			>
				{blok.logo?.filename ? (
					<Image
						src={blok.logo.filename}
						alt="BrightStart"
						width={140}
						height={40}
					/>
				) : (
					'BrightStart'
				)}
			</Link>
			<nav className="flex gap-8 items-center">
				{blok.nav_links?.map((l) => (
					<StoryblokServerComponent key={l._uid} blok={l} />
				))}
			</nav>
			<div className="flex shrink-0">
				{blok.cta?.map((c) => (
					<StoryblokServerComponent key={c._uid} blok={c} />
				))}
			</div>
		</div>
	</header>
);

export default SiteHeader;
