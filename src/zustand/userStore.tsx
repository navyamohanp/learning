import {create} from 'zustand';

type UserState = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  age: number;

  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setPhone: (v: string) => void;
  setCity: (v: string) => void;
  setState: (v: string) => void;
  setAge: (v: number) => void;
};

export const useUserStore = create<UserState>(set => ({
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  state: '',
  age: 0,

  setFirstName: v => set({firstName: v}),
  setLastName: v => set({lastName: v}),
  setPhone: v => set({phone: v}),
  setCity: v => set({city: v}),
  setState: v => set({state: v}),
  setAge: v => set({age: v}),
}));
