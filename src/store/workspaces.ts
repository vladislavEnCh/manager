import { create } from 'zustand';
import { workspaceService } from '../shared/services/workspace.service';

export interface WorkspacesState {
    workspacesList: any;
    isLoading: boolean;
    error: string | null;
	fetchWorkspaces: () => void
}

export const useWorkspaces = create<WorkspacesState>((set) => ({
    workspacesList: [],
    isLoading: false,
    error: null,
    fetchWorkspaces: async () => {
        set({ isLoading: true });
        try {
            const response = await workspaceService.getWorkspaces();
            set({ workspacesList: await response.data });
        } catch (e) {
            //set({ e?.data?.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));
