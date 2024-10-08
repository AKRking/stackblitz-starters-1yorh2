// File: components/TaskManager.js
'use client';

import React, { useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
            console.log('bismillah')
            console.log(response)
            setTasks(response.documents);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        console.log('hellloo');
        try {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                task: newTask,
                completed: false,
            });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleTaskCompletion = async (id, completed) => {
        try {
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
                completed: !completed,
            });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <form onSubmit={addTask} className="mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.$id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.$id, task.completed)}
                            className="mr-2"
                        />
                        <span className={task.completed ? 'line-through' : ''}>{task.task}</span>
                        <button
                            onClick={() => deleteTask(task.$id)}
                            className="ml-auto bg-red-500 text-white p-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}