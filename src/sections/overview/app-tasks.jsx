import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [newTask, setNewTask] = useState('');
  const [, setOpenAddTask] = useState(null);
  const [List, setList] = useState(list);

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };
  
  const handleCloseAddTask = () => {
    setOpenAddTask(null);
  };

  const handleAddTask = () => {
    // Add new task to the list
    // For now, we'll just add a dummy task with a unique ID
    const newTaskObject = { id: Date.now().toString(), name: newTask };
    List.push(newTaskObject);
    setNewTask('');
    handleCloseAddTask();
  };

  const handleEditTask = (editedTask) => {
    // Find the index of the task to be edited
    const taskIndex = List.findIndex((task) => task.id === editedTask.id);

    // Create a new copy of the list
    const newList = [...List];

    // Update the task in the list
    newList[taskIndex] = editedTask;

    // Set the updated list
    setList(newList);
  };

  const handleDeleteTask = (deletedTask) => {
    // Filter out the task to be deleted from the list
    const newList = List.filter((task) => task.id !== deletedTask.id);

    // Set the updated list
    setList(newList);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddTask} color="primary">
                  <Iconify icon="eva:plus-fill" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {List.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onChange={() => handleClickComplete(task.id)}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange, onEdit, onDelete}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(task);
    console.info('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete(task);
    console.info('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.name}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
