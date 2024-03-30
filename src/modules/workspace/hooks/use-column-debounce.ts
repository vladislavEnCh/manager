import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { IUpdateColumnDto } from '../../../shared/services/dto/update.dto';
import { useUpdateColumns } from './use-update-column';

export function useColumnDebounce({
    watch,
    columnId
}: {
    watch: UseFormWatch<any>;
    columnId: number;
}) {
    const { updateColumn } = useUpdateColumns();

    const debounceUpdateColumn = useCallback(
        debounce((state: any) => {
            updateColumn(state);
        }, 1000),
        []
    );

    useEffect(() => {
        const { unsubscribe } = watch((formData) => {
			debounceUpdateColumn({
				name: formData.name,
				columnId
			})
		});
        return () => {
            unsubscribe();
        };
    }, [watch(),debounceUpdateColumn ]);
}
