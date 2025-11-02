import axios from 'axios';
import { Form, Response, FormAnalytics } from '@/types/forms';
import {
  mockGetAllForms,
  mockGetForm,
  mockCreateForm,
  mockUpdateForm,
  mockDeleteForm,
  mockSubmitResponses,
  mockGetResponses,
  mockGetFormAnalytics,
  mockGetFormByLink
} from '@/lib/mockData/forms';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Enable offline mode when no API URL is set
const OFFLINE_MODE = !API_BASE_URL || API_BASE_URL === '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Helper function to handle API calls with fallback to mock data
const apiCallWithFallback = async <T,>(
  apiCall: () => Promise<any>,
  mockCall: () => Promise<any>
): Promise<{ data: T }> => {
  if (OFFLINE_MODE) {
    console.log('🔌 Offline mode: Using mock data');
    return mockCall();
  }
  
  try {
    return await apiCall();
  } catch (error) {
    console.warn('⚠️ API call failed, falling back to mock data:', error);
    return mockCall();
  }
};

// Form APIs
export const getAllForms = async () => {
  return apiCallWithFallback<Form[]>(
    () => api.get<Form[]>('/forms'),
    () => mockGetAllForms()
  );
};

export const getForm = async (id: number) => {
  return apiCallWithFallback<Form>(
    () => api.get<Form>(`/forms/${id}`),
    () => mockGetForm(id)
  );
};

export const createForm = async (form: Partial<Form>) => {
  return apiCallWithFallback<Form>(
    () => api.post<Form>('/forms', form),
    () => mockCreateForm(form)
  );
};

export const updateForm = async (id: number, form: Partial<Form>) => {
  return apiCallWithFallback<Form>(
    () => api.put<Form>(`/forms/${id}`, form),
    () => mockUpdateForm(id, form)
  );
};

export const deleteForm = async (id: number) => {
  return apiCallWithFallback<any>(
    () => api.delete(`/forms/${id}`),
    () => mockDeleteForm(id)
  );
};

export const getFormByLink = async (shareableLink: string) => {
  return apiCallWithFallback<Form>(
    () => api.get<Form>(`/forms/share/${shareableLink}`),
    () => mockGetFormByLink(shareableLink)
  );
};

// Response APIs
export const submitResponses = async (formId: number, responses: Partial<Response>[]) => {
  return apiCallWithFallback<any>(
    () => api.post(`/forms/${formId}/responses`, responses),
    () => mockSubmitResponses(formId, responses)
  );
};

export const getResponses = async (formId: number) => {
  return apiCallWithFallback<Response[]>(
    () => api.get<Response[]>(`/forms/${formId}/responses`),
    () => mockGetResponses(formId)
  );
};

export const getFormAnalytics = async (formId: number) => {
  return apiCallWithFallback<FormAnalytics>(
    () => api.get<FormAnalytics>(`/forms/${formId}/analytics`),
    () => mockGetFormAnalytics(formId)
  );
};

export default api;