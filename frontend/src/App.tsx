import { useState } from 'react';
import TaskList from "./components/TaskList";
import Layout from "./components/Layout";
import TaskDialog from "./components/TaskDialog";
import { Task, TaskType } from "task.json";
import { blue } from "@material-ui/core/colors";
import {
  Container,
  makeStyles,
  Typography,
  fade,
} from '@material-ui/core';
import {
  ToggleButton,
  ToggleButtonGroup
} from "@material-ui/lab";
import {
  Schedule as ScheduleIcon,
  Check as CheckIcon,
  Delete as DeleteIcon
} from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  head: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  select: {
    minWidth: 120,
    marginBottom: theme.spacing(1.5)
  },
  toggleGroup: {
    marginBottom: theme.spacing(2)
  },
  toggleButton: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    "&.Mui-selected": {
      color: blue[700],
      backgroundColor: fade(blue[700], 0.12)
    },
    "&.Mui-selected:hover": {
      color: blue[700],
      backgroundColor: fade(blue[700], 0.18)
    }
  },
  icon: {
    marginRight: theme.spacing(0.5)
  }
}));

function App() {
  const classes = useStyles();
  const [taskDialog, setTaskDialog] = useState(false);
  const [taskType, setTaskType] = useState<TaskType>("todo");
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleTaskType = (_event: React.MouseEvent<HTMLElement>, newType: TaskType | null) => {
    if (newType)
      setTaskType(newType);
  };
  const handleDialogClose = () => {
    setTaskDialog(false);
    setCurrentTask(null);
  };

  return (
    <Layout>
      <TaskDialog
        open={taskDialog}
        onClose={handleDialogClose}
        task={currentTask}
        taskType={taskType}
      />

      <Container>
        <Typography className={classes.head} variant="h5">
          Tasks
        </Typography>

        <ToggleButtonGroup
          value={taskType}
          onChange={handleTaskType}
          exclusive
          className={classes.toggleGroup}
        >
          <ToggleButton value="todo" className={classes.toggleButton}>
            <ScheduleIcon className={classes.icon} />
            todo
          </ToggleButton>
          <ToggleButton value="done" className={classes.toggleButton}>
            <CheckIcon className={classes.icon} />
            done
          </ToggleButton>
          <ToggleButton value="removed" className={classes.toggleButton}>
            <DeleteIcon className={classes.icon} />
            removed
          </ToggleButton>
        </ToggleButtonGroup>

        <TaskList
          taskType={taskType}
          onAdd={() => setTaskDialog(true)}
          onEdit={task => {
            setCurrentTask(task);
            setTaskDialog(true);
          }}
        />
      </Container>
    </Layout>
  );
}

export default App;
