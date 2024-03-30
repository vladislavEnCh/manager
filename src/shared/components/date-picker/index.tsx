import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { FC, useState } from 'react';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useOutside } from '../../hooks/use-outside.hook';
import { cn } from '../../utils/cn';

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    color: red;
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: blue;
  }
`;

type IDayPicker = {
    onChange: (val: string) => void;
    value: string;
};

const DatePicker: FC<IDayPicker> = ({ onChange, value }) => {
    const [selected, setSelected] = useState<Date>();

    const { ref, isShow, setIsShow } = useOutside(false);

    dayjs.extend(LocalizedFormat);

    const handleDaySelect: SelectSingleEventHandler = (date) => {
        const ISODate = date?.toISOString();
        setSelected(date);
        if (ISODate) onChange(ISODate);
    };

    const disabledDays = [
      { from: new Date( new Date().getFullYear(), 0, 1), to: new Date(Date.now() - 86400000) }
    ];

    return (
        <div
            ref={ref}
            className='relative border px-2 py-0.5 rounded-lg hover:bg-slate-100 transition-bg transition-colors'
        >
            <button onClick={() => setIsShow(!isShow)}>
                {value ? dayjs(value).format('LL') : 'Pick Tasks deadline'}
            </button>
            {value && (
                <button
                    className='absolute -top-0.5 -right-8 opacity-30 hover:opacity-100 transition-opacity'
                    onClick={() => onChange('')}
                >
                    <CloseIcon />
                </button>
            )}

            {isShow && (
                <div
                    className={cn(
                        'absolute p-2.5 slide bg-blue z-50 bg-white shadow rounded-lg -left-20',
                     
                    )}
                >
                  <style>{css}</style>
                    <DayPicker
                        fromYear={2024}
                        toYear={2032}
                        initialFocus={isShow}
                        modifiersClassNames={{
                          selected: 'my-selected',
                          today: 'my-today'
                        }}
                        styles={{
                          caption: { color: 'red' }
                        }}
                        mode='single'
                        selected={selected}
                        //defaultMonth={selected}
                        onSelect={handleDaySelect}
                        weekStartsOn={1}
                        disabled={disabledDays}
                        //formatters={{formatCaption}}
                        //footer={footer}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
