import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const Post = ({ blok, story }) => {
	const html = blok.content ? renderRichText(blok.content) : '';
	const dateLabel = blok.published_at
		? new Date(blok.published_at).toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})
		: '';

	return (
		<article {...storyblokEditable(blok)} className="px-16 py-16 max-w-3xl mx-auto">
			<Link
				href="/blog"
				className="text-sm text-text-muted hover:text-teal mb-6 inline-block"
			>
				← Back to blog
			</Link>
			{blok.category && (
				<p className="text-xs font-semibold tracking-[0.2em] text-teal mb-3 uppercase">
					{blok.category}
				</p>
			)}
			<h1 className="text-5xl font-extrabold text-ink leading-tight mb-4">
				{story?.name}
			</h1>
			{(blok.author || dateLabel) && (
				<p className="text-sm text-text-muted mb-8">
					{[blok.author, dateLabel].filter(Boolean).join('  ·  ')}
				</p>
			)}
			{blok.featured_image?.filename && (
				<div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-10">
					<Image
						src={blok.featured_image.filename}
						alt={blok.featured_image.alt || story?.name || ''}
						fill
						sizes="(max-width: 768px) 100vw, 768px"
						className="object-cover"
						priority
					/>
				</div>
			)}
			{blok.excerpt && (
				<p className="text-xl text-ink/80 leading-relaxed mb-8">
					{blok.excerpt}
				</p>
			)}
			{html && (
				<div
					className="prose prose-lg text-ink leading-relaxed"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)}
		</article>
	);
};

export default Post;
