'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Loader } from 'shadcn/ui';

const FormsDashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/forms');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setForms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleCreate = () => {
    // Logic to create a form
  };

  const handleEdit = (formId) => {
    // Logic to edit a form
  };

  const handleDelete = (formId) => {
    // Logic to delete a form
  };

  const handleViewAnalytics = (formId) => {
    // Logic to view analytics for a form
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((form) => (
        <Card key={form.id} className="p-4">
          <h2 className="font-bold">{form.title}</h2>
          <p>{form.description}</p>
          <div className="flex space-x-2 mt-4">
            <Button onClick={() => handleEdit(form.id)}>Edit</Button>
            <Button onClick={() => handleDelete(form.id)}>Delete</Button>
            <Button onClick={() => handleViewAnalytics(form.id)}>View Analytics</Button>
          </div>
        </Card>
      ))}
      <Button onClick={handleCreate} className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
        Create New Form
      </Button>
    </div>
  );
};

export default FormsDashboard;
