import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const ContactInfo = ({ blok }) => (
	<aside
		className="px-16 pb-16 max-w-md mx-auto flex flex-col gap-6"
		{...storyblokEditable(blok)}
	>
		{blok.info_blocks?.map((b) => (
			<StoryblokServerComponent key={b._uid} blok={b} />
		))}
		{blok.email_title && (
			<div className="bg-navy text-white rounded-lg p-7 flex flex-col gap-3 mt-2">
				<h4 className="text-xl font-bold">{blok.email_title}</h4>
				{blok.email_description && (
					<p className="text-sm opacity-80 leading-relaxed">
						{blok.email_description}
					</p>
				)}
				{blok.email_address && (
					<a
						href={`mailto:${blok.email_address}`}
						className="text-sm font-semibold underline hover:opacity-80"
					>
						{blok.email_address}
					</a>
				)}
			</div>
		)}
	</aside>
);

export default ContactInfo;
