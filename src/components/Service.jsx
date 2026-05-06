import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const Service = ({ blok, story }) => (
	<article {...storyblokEditable(blok)} className="px-16 py-16 max-w-4xl mx-auto">
		<Link
			href="/"
			className="text-sm text-text-muted hover:text-teal mb-6 inline-block"
		>
			← Back to home
		</Link>
		{blok.eyebrow && (
			<p className="text-xs font-semibold tracking-[0.2em] text-teal mb-3 uppercase">
				{blok.eyebrow}
			</p>
		)}
		<h1 className="text-5xl font-extrabold text-ink leading-tight mb-6">
			{blok.title || story?.name}
		</h1>
		{blok.image?.filename && (
			<div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
				<Image
					src={blok.image.filename}
					alt={blok.image.alt || blok.title || ''}
					fill
					sizes="(max-width: 768px) 100vw, 1024px"
					className="object-cover"
					priority
				/>
			</div>
		)}
		{blok.description && (
			<p className="text-lg text-ink/70 leading-relaxed">{blok.description}</p>
		)}
	</article>
);

export default Service;
