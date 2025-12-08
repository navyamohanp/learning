import {makeAutoObservable} from 'mobx';

class UserStore {
  firstName = '';
  lastName = '';
  phone = '';
  city = '';
  state = '';
  age = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setFirstName(name: string) {
    this.firstName = name;
  }

  setLastName(name: string) {
    this.lastName = name;
  }

  setPhone(v: string) {
    this.phone = v;
  }

  setCity(v: string) {
    this.city = v;
  }

  setState(v: string) {
    this.state = v;
  }

  setAge(v: number) {
    this.age = v;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

export const userStore = new UserStore();
