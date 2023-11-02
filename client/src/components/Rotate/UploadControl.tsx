import s from "./style.module.css";

interface IUploadControl {
  children: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept: string;
}

const UploadControl = ({
  children,
  onChange,
  disabled,
  accept,
}: IUploadControl) => {
  return (
    <button className={s.file_button}>
      <label className={s.input_file}>
        <input
          className={s.file_label}
          accept={accept}
          disabled={disabled}
          type='file'
          onChange={onChange}
        />
        {children}
      </label>
    </button>
  );
};
export { UploadControl };
