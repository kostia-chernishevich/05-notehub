import axios from "axios";

import type { Note, NoteTag } from "../types/note";


const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

instance.interceptors.request.use(config => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
    search?: string;
    perPage: number;
    page: number;
}

export interface FetchNotesResponse{
    notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
}
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  id: string; 
}
export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<CreateNoteResponse> => {
  const response = await instance.post<CreateNoteResponse>('/notes',payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await instance.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}