import React, { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

interface AddTodoProps {
  onAdd: (text: string, date: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && date) {
      onAdd(text, moment(date).format('YYYY-MM-DD HH:mm'));
      setText('');
      setDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 border-b">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 border rounded w-1/3"
        placeholder="Add a new task"
      />
      <div className="relative ml-2 w-1/3">
        <Datetime
          onChange={(date) => setDate(date ? date.toString() : '')}
          inputProps={{ placeholder: 'Select date and time' }}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm"
        />
      </div>
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded w-1/6">Add</button>
    </form>
  );
};

export default AddTodo;