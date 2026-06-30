import Button from "./Button";

function EmptyState({ title, description, buttonText, onClick, icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-20 text-center">
      {icon && <div className="mb-6 text-neutral-400">{icon}</div>}

      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>

      {description && (
        <p className="mt-3 max-w-md text-neutral-600">{description}</p>
      )}

      {buttonText && (
        <Button className="mt-8" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
