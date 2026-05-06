import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const ContactForm = ({ blok }) => (
	<form
		className="px-16 py-16 max-w-3xl mx-auto"
		name="contact"
		method="POST"
		data-netlify="true"
		{...storyblokEditable(blok)}
	>
		<input type="hidden" name="form-name" value="contact" />
		{blok.title && (
			<h2 className="text-3xl font-bold text-ink mb-8">{blok.title}</h2>
		)}
		<div className="flex flex-col gap-4">
			{blok.fields?.map((f) => (
				<StoryblokServerComponent key={f._uid} blok={f} />
			))}
			<button
				type="submit"
				className="self-start bg-black text-white px-6 py-3.5 rounded-xl font-semibold mt-4 hover:opacity-90 transition-opacity"
			>
				{blok.submit_label || 'Send'}
			</button>
		</div>
	</form>
);

export default ContactForm;
