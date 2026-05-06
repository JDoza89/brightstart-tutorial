import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

const BannerImage = ({ blok }) => {
	if (!blok.image?.filename) return null;
	const isTall = blok.aspect === 'tall';
	return (
		<section className="px-16" {...storyblokEditable(blok)}>
			<div
				className={`relative w-full max-w-[1312px] mx-auto rounded-lg overflow-hidden ${
					isTall ? 'aspect-[3/4]' : 'aspect-[1312/480]'
				}`}
			>
				<Image
					src={blok.image.filename}
					alt={blok.alt_text || blok.image.alt || ''}
					fill
					sizes="(max-width: 1312px) 100vw, 1312px"
					className="object-cover"
					priority
				/>
			</div>
		</section>
	);
};

export default BannerImage;
