declare function emit(val: any);
declare function emit(key: any, value: any);
declare interface main {
  counter: number;
  name: string;
  leftDrawerOpen: boolean;
  loginData: loginData
}
declare interface loginData {
  saveId: boolean;
  loginChk: boolean;
  id: string;
  pw: string;
}
