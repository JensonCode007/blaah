import { Form, Question, Response, FormAnalytics } from '@/types/forms';

// Mock Forms Database (stored in memory)
let mockForms: Form[] = [
  {
    id: 1,
    formName: "Customer Feedback Survey",
    formDescription: "Help us improve our services by sharing your feedback",
    createdAt: "2025-10-28T10:30:00Z",
    updatedAt: "2025-10-28T10:30:00Z",
    userQuestions: [
      { 
        id: 1, 
        questionText: "How satisfied are you with our service?", 
        questionType: "MULTIPLE_CHOICE",
        required: true,
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        order: 1
      },
      { 
        id: 2, 
        questionText: "What can we improve?", 
        questionType: "PARAGRAPH",
        required: false,
        order: 2
      },
      { 
        id: 3, 
        questionText: "Would you recommend us to others?", 
        questionType: "MULTIPLE_CHOICE",
        required: true,
        options: ["Yes", "No", "Maybe"],
        order: 3
      }
    ]
  },
  {
    id: 2,
    formName: "Event Registration Form",
    formDescription: "Register for our upcoming tech conference 2025",
    createdAt: "2025-10-29T14:15:00Z",
    updatedAt: "2025-10-29T14:15:00Z",
    userQuestions: [
      { 
        id: 4, 
        questionText: "Full Name", 
        questionType: "SHORT_ANSWER",
        required: true,
        order: 1
      },
      { 
        id: 5, 
        questionText: "Email Address", 
        questionType: "SHORT_ANSWER",
        required: true,
        order: 2
      },
      { 
        id: 6, 
        questionText: "Which sessions are you interested in?", 
        questionType: "CHECKBOXES",
        required: false,
        options: ["AI & Machine Learning", "Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity"],
        order: 3
      },
      { 
        id: 7, 
        questionText: "Dietary Restrictions", 
        questionType: "DROPDOWN",
        required: false,
        options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Other"],
        order: 4
      }
    ]
  },
  {
    id: 3,
    formName: "Employee Satisfaction Survey",
    formDescription: "Annual employee engagement and satisfaction survey",
    createdAt: "2025-10-30T09:00:00Z",
    updatedAt: "2025-10-30T09:00:00Z",
    userQuestions: [
      { 
        id: 8, 
        questionText: "Rate your overall job satisfaction", 
        questionType: "MULTIPLE_CHOICE",
        required: true,
        options: ["1 - Very Unsatisfied", "2", "3", "4", "5 - Very Satisfied"],
        order: 1
      },
      { 
        id: 9, 
        questionText: "What do you like most about working here?", 
        questionType: "PARAGRAPH",
        required: false,
        order: 2
      }
    ]
  }
];

// Mock Responses Database
let mockResponses: Response[] = [
  { id: 1, questionId: 1, responseText: "Very Satisfied", submittedAt: "2025-10-31T10:00:00Z" },
  { id: 2, questionId: 2, responseText: "The customer support could be faster", submittedAt: "2025-10-31T10:00:00Z" },
  { id: 3, questionId: 3, responseText: "Yes", submittedAt: "2025-10-31T10:00:00Z" },
  { id: 4, questionId: 1, responseText: "Satisfied", submittedAt: "2025-11-01T14:30:00Z" },
  { id: 5, questionId: 2, responseText: "Better documentation would be great", submittedAt: "2025-11-01T14:30:00Z" },
  { id: 6, questionId: 3, responseText: "Yes", submittedAt: "2025-11-01T14:30:00Z" },
];

// Counter for generating new IDs
let nextFormId = 4;
let nextQuestionId = 10;
let nextResponseId = 7;

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Functions
export const mockGetAllForms = async () => {
  await delay();
  return { data: [...mockForms] };
};

export const mockGetForm = async (id: number) => {
  await delay();
  const form = mockForms.find(f => f.id === id);
  if (!form) throw new Error('Form not found');
  return { data: form };
};

export const mockCreateForm = async (formData: Partial<Form>) => {
  await delay();
  
  const newForm: Form = {
    id: nextFormId++,
    formName: formData.formName || 'Untitled Form',
    formDescription: formData.formDescription || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userQuestions: (formData.userQuestions || []).map((q, index) => ({
      ...q,
      id: nextQuestionId++,
      order: index + 1
    })) as Question[]
  };
  
  mockForms.push(newForm);
  return { data: newForm };
};

export const mockUpdateForm = async (id: number, formData: Partial<Form>) => {
  await delay();
  
  const index = mockForms.findIndex(f => f.id === id);
  if (index === -1) throw new Error('Form not found');
  
  mockForms[index] = {
    ...mockForms[index],
    ...formData,
    id, // Preserve the ID
    updatedAt: new Date().toISOString(),
    userQuestions: (formData.userQuestions || mockForms[index].userQuestions).map((q, idx) => ({
      ...q,
      id: q.id || nextQuestionId++,
      order: idx + 1
    })) as Question[]
  };
  
  return { data: mockForms[index] };
};

export const mockDeleteForm = async (id: number) => {
  await delay();
  
  const index = mockForms.findIndex(f => f.id === id);
  if (index === -1) throw new Error('Form not found');
  
  mockForms.splice(index, 1);
  // Also delete associated responses
  mockResponses = mockResponses.filter(r => {
    const form = mockForms.find(f => f.userQuestions.some(q => q.id === r.questionId));
    return form?.id !== id;
  });
  
  return { data: { success: true } };
};

export const mockSubmitResponses = async (formId: number, responses: Partial<Response>[]) => {
  await delay();
  
  const form = mockForms.find(f => f.id === formId);
  if (!form) throw new Error('Form not found');
  
  const submittedAt = new Date().toISOString();
  const newResponses = responses.map(r => ({
    id: nextResponseId++,
    questionId: r.questionId!,
    responseText: r.responseText || '',
    submittedAt
  }));
  
  mockResponses.push(...newResponses);
  return { data: { success: true, responses: newResponses } };
};

export const mockGetResponses = async (formId: number) => {
  await delay();
  
  const form = mockForms.find(f => f.id === formId);
  if (!form) throw new Error('Form not found');
  
  const questionIds = form.userQuestions.map(q => q.id);
  const formResponses = mockResponses.filter(r => questionIds.includes(r.questionId));
  
  return { data: formResponses };
};

export const mockGetFormAnalytics = async (formId: number) => {
  await delay();
  
  const form = mockForms.find(f => f.id === formId);
  if (!form) throw new Error('Form not found');
  
  const responses = await mockGetResponses(formId);
  
  const analytics: FormAnalytics = {
    totalResponses: responses.data.length,
    questionStats: form.userQuestions.map(q => ({
      questionId: q.id,
      questionText: q.questionText,
      responses: {}
    }))
  };
  
  return { data: analytics };
};

export const mockGetFormByLink = async (shareableLink: string) => {
  await delay();
  
  const form = mockForms.find(f => f.shareableLink === shareableLink);
  if (!form) throw new Error('Form not found');
  
  return { data: form };
};