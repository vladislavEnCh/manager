import { FC } from 'react';
import Select from 'react-select';

type ISmallSelect = {
    options: any;
    setSelectedOption: (val?: any) => void;
    selectedOption: string | number;
    placeholder: string;
    color?: string;
};

const SmallSelect: FC<ISmallSelect> = ({
    options,
    setSelectedOption,
    selectedOption,
    placeholder,
    color
}) => {
    return (
        <div className='h-12'>
            <Select
                value={selectedOption}
                isClearable
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'none',
                        borderRadius: 12,
                        backgroundColor: color,
                        color: 'white',
                        minWidth: 110,
                        fontWeight: 500,
                        padding: '0px 8px',
                    }),
                    placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: 'white'
                    })
                }}
                placeholder={placeholder}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </div>
    );
};

export default SmallSelect;
