export interface Filter {
  name: string,
  type: string,
  targetField: string,
  values: Array<string>,
  selectedValues: Array<string>
}