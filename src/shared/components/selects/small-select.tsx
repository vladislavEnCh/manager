import { FC, FocusEventHandler } from 'react';
import Select from 'react-select';

type ISmallSelect = {
    options: any;
    setSelectedOption: (val?: any) => void;
    selectedOption: string | number;
    placeholder: string;
    color?: string;
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
    menuIsOpen?: boolean;
};

const SmallSelect: FC<ISmallSelect> = ({
    options,
    setSelectedOption,
    selectedOption,
    placeholder,
    color = 'transparent',
    onBlur,
    menuIsOpen
}) => {
    return (
        <div className=''>
            <Select
                value={selectedOption}
                isClearable
                menuIsOpen={menuIsOpen}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'none',
                        borderRadius: 12,
                        outline: 'none',
                        backgroundColor: color,
                        color: 'white',
                        minWidth: 110,
                        fontWeight: 500,
                        padding: 0,
                        margin: 0,
                        fontSize: 13,
                        //boxShadow: 'none',
                        border: '0 !important',
                        // This line disable the blue border
                        boxShadow: '0 !important',
                        '&:hover': {
                            border: '0 !important'
                         }
                    }),
                    dropdownIndicator: base => ({
                        ...base,
                        color: 'white'
                      }),
                    placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: 'white'
                    })
                }}
                placeholder={placeholder}
                components={{  IndicatorSeparator: () => null }}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                onBlur={onBlur}
            />
        </div>
    );
};

export default SmallSelect;
