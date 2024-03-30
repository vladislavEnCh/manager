'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export function Providers({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
