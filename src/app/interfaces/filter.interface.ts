export interface Filter {
  name: string,
  title: string,
  type: string,
  targetField: string,
  values: Array<string>,
  valuesTitles: { [key: string]: string },
  selectedValues: Array<string>
}