interface FilterChipsProps {
  options: readonly string[];
  selected: string;
  onChange: (value: string) => void;
}

export function FilterChips({ options, selected, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter options">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
            selected === option
              ? 'bg-accent-500/20 text-accent-400 border-accent-500/50'
              : 'bg-dark-800 text-dark-300 border-dark-700 hover:border-accent-500/50'
          }`}
          style={selected !== option ? {} : undefined}
          onMouseEnter={(e) => { if (selected !== option) e.currentTarget.style.color = 'var(--text-heading)'; }}
          onMouseLeave={(e) => { if (selected !== option) e.currentTarget.style.color = ''; }}
          aria-pressed={selected === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
