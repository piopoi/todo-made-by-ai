import React, { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, date: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, date, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState<string | null>(date);
  const [editedText, setEditedText] = useState<string>(text);

  const handleUpdate = () => {
    if (editedDate && editedText) {
      onUpdate(id, moment(editedDate).format('YYYY-MM-DD HH:mm'));
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="ml-2 border p-1"
          />
        ) : (
          <span className={`ml-2 ${completed ? 'line-through' : ''}`}>{text}</span>
        )}
        {isEditing ? (
          <div className="relative ml-2">
            <Datetime
              onChange={(date) => setEditedDate(date ? date.toString() : '')}
              inputProps={{ placeholder: 'Select date and time' }}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
            />
          </div>
        ) : (
          <span className="ml-2 text-gray-500 text-sm">{moment(date).format('YYYY-MM-DD HH:mm')}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="ml-2 p-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 p-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="ml-2 p-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;