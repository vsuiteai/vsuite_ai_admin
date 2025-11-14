import {
  IconsFileTypesCsvs,
  IconsFileTypesDocs,
  IconsFileTypesPdfs,
  IconsFileTypesUnknown,
  IconsFileTypesXlxs,
} from "#components";

export const useFilesController = () => {
  const getRecentlyUpdatedFiles = (files: FileMetadata[]): FileMetadata[] => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return files.filter((file) => {
      const updatedDate = new Date(file.created_at);
      return updatedDate >= sevenDaysAgo;
    });
  };

  const parse_date = (raw_date: string) => {
    const date = new Date(raw_date);

    const formatted = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formatted;
  };

  const parse_name = (
    raw_name: string,
    maxLength: number = 15,
    firstPart_characters_num: number = 7
  ) => {
    const filename = raw_name;

    if (!filename) return "";
    if (filename.length <= maxLength) return filename;

    const ext = filename.split(".").pop() ?? "";
    const nameWithoutExt = filename.slice(0, filename.length - ext.length - 1);

    const firstPart = nameWithoutExt.slice(0, firstPart_characters_num);
    const lastPart = nameWithoutExt.slice(-firstPart_characters_num);

    return `${firstPart}...${lastPart}.${ext}`;
  };

  const getIcon = (ext: string) => {
    let type = null;

    switch (ext) {
      case "csv":
        type = IconsFileTypesCsvs;
        break;
      case "pdf":
        type = IconsFileTypesPdfs;
        break;
      case "xlsx":
        type = IconsFileTypesXlxs;
        break;

      default:
        type = IconsFileTypesUnknown;
        break;
    }

    return type;
  };

  const upload_new_file = (client_uid: string) => {
    useRouter().push(`/asset-upload?uid=${client_uid}`);
  };

  return {
    getRecentlyUpdatedFiles,
    parse_date,
    parse_name,
    getIcon,
    upload_new_file,
  };
};
