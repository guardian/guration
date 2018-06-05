type Return<R, F: (...args: any[]) => R> = R;
type $Return<T> = Return<*, T>;

export type { $Return };
