import React from 'react';
import Select from 'react-select';
import SortingOption from 'stores/models/Sorting';

interface Props {
  title?: string;
  active: string;
  onChange: (sorting: string) => void;
  isMobile: boolean;
  sortingOptions: SortingOption[];
}

const Sorting = ({ title = 'Sorting', active, onChange, isMobile, sortingOptions }: Props) => {
  if (isMobile) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Select
          name="publishers-select"
          value={sortingOptions.find((option) => option.value === active)}
          onChange={(option: SortingOption) => {
            onChange(option.value);
          }}
          options={sortingOptions}
          styles={{
            valueContainer: (base) => ({
              ...base,
              borderColor: '#dedede',
              backgroundColor: '#fff',
            }),
          }}
        />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="nav nav-pills" role="tablist" aria-orientation="vertical" style={{ flexDirection: 'column' }}>
          {sortingOptions.map((option, index) => (
            <a
              key={index + 1}
              href="#"
              className={`nav-link ${active === option.value ? 'active' : ''}`}
              role="tab"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                onChange(option.value);
              }}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
