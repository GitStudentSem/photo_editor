export interface LinkDownloadI {
  href: string;
  fileName: string;
}
export const LinkDownload = ({ href, fileName }: LinkDownloadI) => {
  return (
    <a href={href} download={fileName}>
      Скачать
    </a>
  );
};

LinkDownload.displayName = "LinkDownload";
