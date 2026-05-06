import {
	storyblokEditable,
	renderRichText,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const CaseStudy = ({ blok, story }) => {
	const html = blok.content ? renderRichText(blok.content) : '';
	return (
		<article
			{...storyblokEditable(blok)}
			className="px-16 py-16 max-w-4xl mx-auto"
		>
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
			{blok.summary && (
				<p className="text-xl text-ink/80 leading-relaxed mb-8">
					{blok.summary}
				</p>
			)}
			{html && (
				<div
					className="prose prose-lg text-ink leading-relaxed mb-10"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)}
			{blok.cta?.length > 0 && (
				<div className="flex">
					{blok.cta.map((c) => (
						<StoryblokServerComponent key={c._uid} blok={c} />
					))}
				</div>
			)}
		</article>
	);
};

export default CaseStudy;
