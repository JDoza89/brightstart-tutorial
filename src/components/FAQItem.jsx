import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';

const FAQItem = ({ blok }) => {
	const answerHtml = blok.answer ? renderRichText(blok.answer) : '';
	return (
		<details
			className="group bg-cream rounded-md px-7 py-6"
			{...storyblokEditable(blok)}
		>
			<summary className="flex items-center justify-between cursor-pointer list-none">
				<span className="text-lg font-semibold text-ink pr-4">
					{blok.question}
				</span>
				<span className="text-2xl font-bold text-teal transition-transform group-open:rotate-45 select-none">
					+
				</span>
			</summary>
			{answerHtml && (
				<div
					className="mt-3 text-base text-ink/75 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: answerHtml }}
				/>
			)}
		</details>
	);
};

export default FAQItem;
