export interface InputProps {
  width?: string;
  tp?: string | 'text';
  value: string | undefined;
  ph?: string;
  phc?: string;
  label?: string;
  color?: string;
  fs?: number;
  fw?: number;
  td?: string;
  heigth?: number;
  br?: number;
  border?: string;
  ff?: string;
  onChange: (value: string) => void;
  ref?: any;
  onBlur?: () => void;
  errorMessage?: string;
  mask: any;
  maskedValueDate?: boolean
}

export interface LabelProps {
  value?: string;
  color?: string;
  fs?: number;
  fw?: number;
  lh?: number;
  td?: string;
  ff?: string;
}

export interface InputContainerProps {
  width?: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}

export interface InputLabelProps {
  inputProps: InputProps
  containerProps: InputContainerProps
  labelProps: LabelProps
}