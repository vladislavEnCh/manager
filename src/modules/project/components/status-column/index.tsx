import { IStatusTask } from "../../../../shared/types/status-task.types";

type IColumn = {
  name: string;
  id: number;
  workspaceId: number;
  statusTasks: IStatusTask[];
};

const StatusColumn = () => {
  return (
	<div>StatusColumn</div>
  )
}

export default StatusColumn