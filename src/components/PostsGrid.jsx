import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }) => {
	if (!post?.content) return null;
	const c = post.content;
	return (
		<Link
			href={`/${post.full_slug}`}
			className="bg-white border border-border rounded-lg p-6 pb-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
		>
			{c.featured_image?.filename && (
				<div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
					<Image
						src={c.featured_image.filename}
						alt={c.featured_image.alt || post.name}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover"
					/>
				</div>
			)}
			{c.category && (
				<p className="text-xs font-semibold tracking-[0.15em] text-teal uppercase">
					{c.category}
				</p>
			)}
			<h3 className="text-xl font-bold text-ink leading-snug">{post.name}</h3>
			{c.excerpt && (
				<p className="text-sm text-text-muted leading-relaxed">{c.excerpt}</p>
			)}
		</Link>
	);
};

const PostsGrid = ({ blok }) => (
	<section className="px-16 pb-24" {...storyblokEditable(blok)}>
		<div className="max-w-7xl mx-auto">
			{blok.title && (
				<h2 className="text-3xl font-bold text-ink mb-8">{blok.title}</h2>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{blok.posts?.map((post) =>
					typeof post === 'object' && post.uuid ? (
						<PostCard key={post.uuid} post={post} />
					) : null,
				)}
			</div>
		</div>
	</section>
);

export default PostsGrid;
