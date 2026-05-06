import { storyblokEditable } from '@storyblok/react/rsc';

const FormField = ({ blok }) => {
	const id = `field-${blok.name}`;
	const baseClass =
		'w-full px-4 py-3 rounded-md border border-border bg-white text-ink placeholder:text-text-muted focus:outline-none focus:border-teal transition-colors';

	return (
		<div className="flex flex-col gap-2" {...storyblokEditable(blok)}>
			<label htmlFor={id} className="text-sm font-medium text-ink">
				{blok.label}
				{blok.required && <span className="text-teal ml-1">*</span>}
			</label>
			{blok.type === 'textarea' ? (
				<textarea
					id={id}
					name={blok.name}
					placeholder={blok.placeholder}
					required={blok.required}
					rows={5}
					className={baseClass}
				/>
			) : (
				<input
					id={id}
					name={blok.name}
					type={blok.type || 'text'}
					placeholder={blok.placeholder}
					required={blok.required}
					className={baseClass}
				/>
			)}
		</div>
	);
};

export default FormField;
